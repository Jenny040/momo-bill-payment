package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestToPayResponse {

    @JsonProperty("paymentId")
    private String paymentId;

    @JsonProperty("status")
    private String status;

    @JsonProperty("referenceId")
    private String referenceId;

    @JsonProperty("reason")
    private String reason;

    public boolean isSuccess() {
        return "SUCCESSFUL".equalsIgnoreCase(status) || "PENDING".equalsIgnoreCase(status);
    }
}