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
                headers.set("X-Target-Environment", props.getTargetEnvironment());
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<Void> entity = new HttpEntity<>(headers);

                String url = props.getBaseUrl() + "/collection/token/";
                log.info("Calling MoMo token URL: {}", url);

                ResponseEntity<AccessTokenResponse> response = restTemplate.exchange(
                        url,
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

        // Ensure phone number is in correct format (without +)
        String cleanPhone = phoneNumber.replace("+", "");

        RequestToPayRequest request = new RequestToPayRequest(
                amount,
                currency,
                externalId,
                new Party("MSISDN", cleanPhone, "default"),
                "Payment for bill via MoMo",
                "Bill Payment - " + externalId
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Reference-Id", externalId);
        headers.set("X-Target-Environment", props.getTargetEnvironment());
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<RequestToPayRequest> entity = new HttpEntity<>(request, headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/requestpay";
            log.info("Calling MoMo requestpay URL: {}", url);
            log.info("Request body: amount={}, currency={}, phone={}, externalId={}", amount, currency, cleanPhone, externalId);

            ResponseEntity<RequestToPayResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    RequestToPayResponse.class);

            RequestToPayResponse body = response.getBody();
            if (body != null && body.isSuccess()) {
                log.info("MoMo requestpay succeeded. paymentId={}, referenceId={}", body.getPaymentId(), body.getReferenceId());
            } else {
                log.warn("MoMo requestpay returned non-success: {}", body);
            }
            return body;

        } catch (HttpClientErrorException e) {
            log.error("MoMo requestpay failed: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("MoMo payment initiation failed", e);
        }
    }

    public TransactionStatusResponse getTransactionStatus(String paymentId) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Target-Environment", props.getTargetEnvironment());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/requesttopay/" + paymentId;
            log.info("Calling MoMo status URL: {}", url);

            ResponseEntity<TransactionStatusResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    TransactionStatusResponse.class);

            TransactionStatusResponse body = response.getBody();
            if (body != null && body.isSuccessful()) {
                log.info("MoMo transaction SUCCESSFUL. gatewayTxId={}, amount={}",
                        body.getGatewayTransactionId(), body.getAmount() != null ? body.getAmount().getAmount() : "N/A");
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
            log.error("Payment initiation failed or returned null");
            return false;
        }

        try {
            log.info("Waiting 5 seconds for transaction to process...");
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }

        TransactionStatusResponse status = getTransactionStatus(initiated.getPaymentId());
        if (status != null && status.isSuccessful()) {
            log.info("Payment confirmed successfully!");
            return true;
        } else {
            log.error("Transaction status check failed or returned unsuccessful");
            return false;
        }
    }
}