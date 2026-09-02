package com.momo.miniapp.dto.momomapi;

import lombok.Data;

@Data
public class TransactionStatusResponse {
    private String status;
    private Amount amount;
    private String gatewayTransactionId;
    private String externalId;

    public boolean isSuccessful() {
        return "SUCCESSFUL".equals(status);
    }

    @Data
    public static class Amount {
        private String amount;
        private String currency;
    }
}