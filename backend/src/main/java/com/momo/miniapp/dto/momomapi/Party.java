package com.momo.miniapp.dto.momomapi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Party {
    private String partyIdType;  // MSISDN, EMAIL, ALIAS, PARTY_CODE
    private String partyId;      // The actual ID (phone number, email, etc.)
    private String description;
}