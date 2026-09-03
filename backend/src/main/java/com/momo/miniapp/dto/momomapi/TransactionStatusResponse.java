package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TransactionStatusResponse {
    private String amount;
    private String currency;

    @JsonProperty("financialTransactionId")
    private String financialTransactionId;

    @JsonProperty("externalId")
    private String externalId;

    private Party payer;
    private String payerMessage;
    private String payeeNote;
    private String status;
    private ErrorReason reason;

    public boolean isSuccessful() {
        return "SUCCESSFUL".equals(status);
    }

    @Data
    public static class ErrorReason {
        private String code;
        private String message;
    }
}