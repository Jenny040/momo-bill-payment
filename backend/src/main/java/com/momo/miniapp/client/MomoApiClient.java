package com.momo.miniapp.client;

import com.momo.miniapp.config.MomoApiProperties;
import com.momo.miniapp.dto.momomapi.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class MomoApiClient {

    private final MomoApiProperties props;
    private final RestTemplate restTemplate;

    private volatile String cachedAccessToken;
    private volatile long tokenExpiryTimestamp = 0;

    public String getAccessToken() {
        long now = System.currentTimeMillis();
        if (cachedAccessToken != null && now < tokenExpiryTimestamp) {
            return cachedAccessToken;
        }

        synchronized (this) {
            if (cachedAccessToken != null && now < tokenExpiryTimestamp) {
                return cachedAccessToken;
            }

            try {
                String credentials = props.getApiUser() + ":" + props.getApiKey();
                String encoded = Base64.getEncoder().encodeToString(credentials.getBytes());

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Basic " + encoded);
                headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<Void> entity = new HttpEntity<>(headers);

                ResponseEntity<AccessTokenResponse> response = restTemplate.exchange(
                        props.getBaseUrl() + "/accesstokengeneration",
                        HttpMethod.POST,
                        entity,
                        AccessTokenResponse.class);

                AccessTokenResponse tokenResponse = response.getBody();
                if (tokenResponse == null || tokenResponse.getAccessToken() == null) {
                    throw new RuntimeException("Empty access token response from MoMo API");
                }

                this.cachedAccessToken = tokenResponse.getAccessToken();
                this.tokenExpiryTimestamp = now + TimeUnit.SECONDS.toMillis(tokenResponse.getExpiresIn()) - 30_000;

                log.info("MoMo access token obtained and cached.");
                return cachedAccessToken;

            } catch (HttpClientErrorException e) {
                log.error("Failed to obtain MoMo access token: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new RuntimeException("MoMo authentication failed", e);
            }
        }
    }

    public RequestToPayResponse initiatePayment(String amount, String currency, String externalId, String phoneNumber) {
        String token = getAccessToken();

        RequestToPayRequest request = new RequestToPayRequest(
                Double.valueOf(amount),
                currency,
                externalId,
                new Party("MSISDN", phoneNumber, "default"),
                "Payment for bill via MoMo",
                "Bill Payment - " + externalId
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Reference-Id", externalId);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<RequestToPayRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<RequestToPayResponse> response = restTemplate.exchange(
                    props.getBaseUrl() + "/collection/v1_0/requesttopay",
                    HttpMethod.POST,
                    entity,
                    RequestToPayResponse.class);

            RequestToPayResponse body = response.getBody();
            if (body != null && body.isSuccess()) {
                log.info("MoMo requesttopay succeeded. paymentId={}, referenceId={}", body.getPaymentId(), body.getReferenceId());
            } else {
                log.warn("MoMo requesttopay returned non-success: {}", body);
            }
            return body;

        } catch (HttpClientErrorException e) {
            log.error("MoMo requesttopay failed: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("MoMo payment initiation failed", e);
        }
    }

    public TransactionStatusResponse getTransactionStatus(String paymentId) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<TransactionStatusResponse> response = restTemplate.exchange(
                    props.getBaseUrl() + "/collection/v1_0/requests/" + paymentId,
                    HttpMethod.GET,
                    entity,
                    TransactionStatusResponse.class);

            TransactionStatusResponse body = response.getBody();
            if (body != null && body.isSuccessful()) {
                log.info("MoMo transaction SUCCESSFUL. gatewayTxId={}, amount={}",
                        body.getGatewayTransactionId(), body.getAmount().getAmount());
            }
            return body;

        } catch (HttpClientErrorException e) {
            log.error("MoMo status check failed for paymentId {}: {}", paymentId, e.getResponseBodyAsString());
            return null;
        }
    }

    public boolean payBillAndConfirm(String amount, String currency, String externalId, String phoneNumber) {
        RequestToPayResponse initiated = initiatePayment(amount, currency, externalId, phoneNumber);
        if (initiated == null || !initiated.isSuccess()) {
            return false;
        }

        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }

        TransactionStatusResponse status = getTransactionStatus(initiated.getPaymentId());
        return status != null && status.isSuccessful();
    }
}