package com.momo.miniapp.dto.momomapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BasicUserInfoResponse {
    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;

    private String birthdate;
    private String locale;
    private String gender;
    private String status;
}