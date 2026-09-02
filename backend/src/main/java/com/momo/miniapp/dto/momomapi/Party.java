package com.momo.miniapp.dto.momomapi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Party {
    private String partyIdType;
    private String partyId;
    private String description;
}