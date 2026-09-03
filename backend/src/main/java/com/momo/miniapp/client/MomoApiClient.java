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

    // ============================================================
    // 1. TOKEN MANAGEMENT
    // ============================================================

    /**
     * Get a valid access token. Uses cached token if still valid.
     * If expired or not present, generates a new one.
     *
     * @return valid access token
     */
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

    // ============================================================
    // 2. REQUEST TO PAY
    // ============================================================

    /**
     * Initiate a Request To Pay transaction.
     *
     * @param amount      Amount to be debited from payer
     * @param currency    ISO4217 Currency (e.g., "ZAR")
     * @param externalId  Unique reference ID for this transaction (UUID)
     * @param phoneNumber Payer's MSISDN (without +)
     * @param payerMessage Message to show to payer
     * @param payeeNote   Note for payee
     * @return Reference ID of the transaction
     */
    public String requestToPay(String amount, String currency, String externalId,
                               String phoneNumber, String payerMessage, String payeeNote) {
        String token = getAccessToken();
        String cleanPhone = phoneNumber.replace("+", "");

        RequestToPayRequest request = RequestToPayRequest.builder()
                .amount(amount)
                .currency(currency)
                .externalId(externalId)
                .payer(new Party("MSISDN", cleanPhone, null))
                .payerMessage(payerMessage != null ? payerMessage : "Bill Payment")
                .payeeNote(payeeNote != null ? payeeNote : "Payment for bill")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Reference-Id", externalId);
        headers.set("X-Target-Environment", props.getTargetEnvironment());
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<RequestToPayRequest> entity = new HttpEntity<>(request, headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/requesttopay";
            log.info("Calling MoMo requesttopay URL: {}", url);
            log.info("Request: amount={}, currency={}, phone={}, externalId={}",
                    amount, currency, cleanPhone, externalId);

            ResponseEntity<Void> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Void.class);

            if (response.getStatusCode() == HttpStatus.ACCEPTED) {
                log.info("MoMo requesttopay initiated successfully. Reference ID: {}", externalId);
                return externalId;
            }
            throw new RuntimeException("MoMo requesttopay failed with status: " + response.getStatusCode());

        } catch (HttpClientErrorException e) {
            log.error("MoMo requesttopay failed: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("MoMo payment initiation failed: " + e.getResponseBodyAsString(), e);
        }
    }

    // ============================================================
    // 3. REQUEST TO PAY TRANSACTION STATUS
    // ============================================================

    /**
     * Get the status of a Request To Pay transaction.
     *
     * @param referenceId The X-Reference-Id used in the RequestToPay
     * @return TransactionStatusResponse with status, amount, payer info, etc.
     */
    public TransactionStatusResponse getTransactionStatus(String referenceId) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Target-Environment", props.getTargetEnvironment());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/requesttopay/" + referenceId;
            log.info("Calling MoMo transaction status URL: {}", url);

            ResponseEntity<TransactionStatusResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    TransactionStatusResponse.class);

            TransactionStatusResponse body = response.getBody();
            log.info("Transaction status response: {}", body != null ? body.getStatus() : "null");
            return body;

        } catch (HttpClientErrorException e) {
            log.error("MoMo status check failed for referenceId {}: {} - {}",
                    referenceId, e.getStatusCode(), e.getResponseBodyAsString());
            return null;
        }
    }

    // ============================================================
    // 4. ACCOUNT BALANCE
    // ============================================================

    /**
     * Get the merchant's account balance.
     *
     * @return AccountBalanceResponse with available balance and currency
     */
    public AccountBalanceResponse getAccountBalance() {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Target-Environment", props.getTargetEnvironment());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/account/balance";
            log.info("Calling MoMo account balance URL: {}", url);

            ResponseEntity<AccountBalanceResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    AccountBalanceResponse.class);

            AccountBalanceResponse body = response.getBody();
            log.info("Account balance: {} {}",
                    body != null ? body.getAvailableBalance() : "N/A",
                    body != null ? body.getCurrency() : "");
            return body;

        } catch (HttpClientErrorException e) {
            log.error("Failed to get account balance: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Failed to get account balance", e);
        }
    }

    // ============================================================
    // 5. BASIC USER INFO
    // ============================================================

    /**
     * Get basic personal information of an account holder.
     *
     * @param msisdn Account holder's MSISDN (phone number)
     * @return BasicUserInfoResponse with given_name, family_name, birthdate, etc.
     */
    public BasicUserInfoResponse getBasicUserInfo(String msisdn) {
        String token = getAccessToken();
        String cleanMsisdn = msisdn.replace("+", "");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Target-Environment", props.getTargetEnvironment());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            String url = props.getBaseUrl() + "/collection/v1_0/accountholder/MSISDN/" + cleanMsisdn + "/basicuserinfo";
            log.info("Calling MoMo basic user info URL: {}", url);

            ResponseEntity<BasicUserInfoResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    BasicUserInfoResponse.class);

            BasicUserInfoResponse body = response.getBody();
            log.info("User info retrieved for MSISDN: {}", cleanMsisdn);
            return body;

        } catch (HttpClientErrorException e) {
            log.error("Failed to get user info for {}: {} - {}", msisdn, e.getStatusCode(), e.getResponseBodyAsString());
            return null;
        }
    }

    // ============================================================
    // 6. VALIDATE ACCOUNT HOLDER
    // ============================================================

    /**
     * Check if an account holder (MSISDN) is active on MoMo.
     *
     * @param msisdn Account holder's MSISDN (phone number)
     * @return true if active, false if not active or not found
     */
    public boolean validateAccountHolder(String msisdn) {
        String token = getAccessToken();
        String cleanMsisdn = msisdn.replace("+", "");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Ocp-Apim-Subscription-Key", props.getSubscriptionKey());
        headers.set("X-Target-Environment", props.getTargetEnvironment());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            String url = props.getBaseUrl() + "/disbursement/v1_0/accountholder/msisdn/" + cleanMsisdn + "/active";
            log.info("Calling MoMo validate account holder URL: {}", url);

            ResponseEntity<AccountHolderStatusResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    AccountHolderStatusResponse.class);

            AccountHolderStatusResponse body = response.getBody();
            boolean isActive = body != null && body.isActive();
            log.info("Account holder {} is {}active", cleanMsisdn, isActive ? "" : "not ");
            return isActive;

        } catch (HttpClientErrorException e) {
            log.error("Failed to validate account holder {}: {} - {}", msisdn, e.getStatusCode(), e.getResponseBodyAsString());
            return false;
        }
    }

    // ============================================================
    // 7. PAY BILL AND CONFIRM (Combined Flow)
    // ============================================================

    /**
     * Complete payment flow: Initiate RequestToPay, wait, then check status.
     *
     * @param amount      Amount to be debited
     * @param currency    ISO4217 Currency
     * @param externalId  Unique reference ID
     * @param phoneNumber Payer's MSISDN
     * @return true if payment was successful, false otherwise
     */
    public boolean payBillAndConfirm(String amount, String currency, String externalId, String phoneNumber) {
        try {
            // Step 1: Initiate payment
            String referenceId = requestToPay(amount, currency, externalId, phoneNumber,
                    "Bill Payment", "Payment for bill");

            // Step 2: Wait for processing
            log.info("Waiting 5 seconds for transaction to process...");
            TimeUnit.SECONDS.sleep(5);

            // Step 3: Check status
            TransactionStatusResponse status = getTransactionStatus(referenceId);
            if (status != null && "SUCCESSFUL".equals(status.getStatus())) {
                log.info("Payment confirmed successfully!");
                return true;
            } else {
                String statusMsg = status != null ? status.getStatus() : "null";
                log.error("Transaction status: {}", statusMsg);
                return false;
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Payment interrupted: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            log.error("Payment failed: {}", e.getMessage());
            return false;
        }
    }

    // ============================================================
    // 8. PAYMENT WITH RETRY (Advanced)
    // ============================================================

    /**
     * Complete payment flow with retry logic.
     *
     * @param amount      Amount to be debited
     * @param currency    ISO4217 Currency
     * @param externalId  Unique reference ID
     * @param phoneNumber Payer's MSISDN
     * @param maxRetries  Maximum number of status checks
     * @param waitSeconds Seconds to wait between checks
     * @return true if payment was successful, false otherwise
     */
    public boolean payBillAndConfirmWithRetry(String amount, String currency, String externalId,
                                              String phoneNumber, int maxRetries, int waitSeconds) {
        try {
            // Step 1: Initiate payment
            String referenceId = requestToPay(amount, currency, externalId, phoneNumber,
                    "Bill Payment", "Payment for bill");

            // Step 2: Retry status check
            for (int attempt = 1; attempt <= maxRetries; attempt++) {
                log.info("Status check attempt {}/{}", attempt, maxRetries);
                TimeUnit.SECONDS.sleep(waitSeconds);

                TransactionStatusResponse status = getTransactionStatus(referenceId);
                if (status != null) {
                    if ("SUCCESSFUL".equals(status.getStatus())) {
                        log.info("Payment confirmed successfully on attempt {}!", attempt);
                        return true;
                    } else if ("FAILED".equals(status.getStatus()) || "REJECTED".equals(status.getStatus())) {
                        log.error("Payment failed with status: {}", status.getStatus());
                        return false;
                    }
                    // "PENDING" - continue retrying
                }
            }

            log.warn("Payment still pending after {} attempts", maxRetries);
            return false;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Payment interrupted: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            log.error("Payment failed: {}", e.getMessage());
            return false;
        }
    }
}