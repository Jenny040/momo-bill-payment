package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestToPayRequest {

    @JsonProperty("amount")
    private Double amount;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("externalId")
    private String externalId;

    @JsonProperty("party")
    private Party party;

    @JsonProperty("payerMessage")
    private String payerMessage;

    @JsonProperty("note")
    private String note;
}