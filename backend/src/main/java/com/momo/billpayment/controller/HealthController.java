package com.momo.billpayment.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    // Quick sanity-check endpoint for the demo: GET /api/v1/health
    @GetMapping("/api/v1/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", "momo-bill-payment-backend");
    }
}
