package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Party {

    @JsonProperty("partyIdType")
    private String partyIdType; // MSISDN

    @JsonProperty("partyId")
    private String partyId; // user phone number

    @JsonProperty("subAddress")
    private String subAddress; // default: "default"
}