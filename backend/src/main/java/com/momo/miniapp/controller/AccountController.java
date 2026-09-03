package com.momo.miniapp.controller;

import com.momo.miniapp.client.MomoApiClient;
import com.momo.miniapp.dto.momomapi.AccountBalanceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final MomoApiClient momoApiClient;

    /**
     * Get merchant account balance
     * GET /api/v1/account/balance
     */
    @GetMapping("/balance")
    public ResponseEntity<AccountBalanceResponse> getAccountBalance() {
        AccountBalanceResponse balance = momoApiClient.getAccountBalance();
        return ResponseEntity.ok(balance);
    }
}