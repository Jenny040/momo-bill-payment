package com.momo.miniapp.dto.momomapi;

import lombok.Data;

@Data
public class RequestToPayResponse {
    private String paymentId;
    private String referenceId;
    private boolean success;

    public boolean isSuccess() {
        return success;
    }
}