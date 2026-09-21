package com.momo.miniapp.dto.momomapi;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestToPayRequest {
    private String amount;
    private String currency;
    private String externalId;
    private Party payer;
    private String payerMessage;
    private String payeeNote;
}