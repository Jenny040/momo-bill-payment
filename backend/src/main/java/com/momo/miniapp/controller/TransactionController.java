package com.momo.miniapp.controller;

import com.momo.miniapp.client.MomoApiClient;
import com.momo.miniapp.dto.momomapi.TransactionStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final MomoApiClient momoApiClient;

    /**
     * Get transaction status for a RequestToPay transaction
     * GET /api/v1/transactions/{referenceId}/status
     */
    @GetMapping("/{referenceId}/status")
    public ResponseEntity<TransactionStatusResponse> getTransactionStatus(@PathVariable String referenceId) {
        TransactionStatusResponse status = momoApiClient.getTransactionStatus(referenceId);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(status);
    }
}