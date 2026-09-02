package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransactionStatusResponse {

    @JsonProperty("status")
    private String status;

    @JsonProperty("statusCode")
    private String statusCode;

    @JsonProperty("statusMessage")
    private String statusMessage;

    @JsonProperty("amount")
    private Amount amount;

    @JsonProperty("gatewayTransactionId")
    private String gatewayTransactionId;

    @JsonProperty("referenceId")
    private String referenceId;

    public boolean isSuccessful() {
        return "SUCCESSFUL".equalsIgnoreCase(status) || "COMPLETED".equalsIgnoreCase(status);
    }

    @Data
    @NoArgsConstructor
    public static class Amount {

        @JsonProperty("amount")
        private Double amount;

        @JsonProperty("currency")
        private String currency;
    }
}