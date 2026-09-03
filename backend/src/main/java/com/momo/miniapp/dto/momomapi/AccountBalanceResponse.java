package com.momo.miniapp.dto.momomapi;

import lombok.Data;

@Data
public class AccountBalanceResponse {
    private String availableBalance;
    private String currency;
}