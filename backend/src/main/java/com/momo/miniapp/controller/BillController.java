package com.momo.miniapp.controller;

import com.momo.miniapp.dto.BillDTO;
import com.momo.miniapp.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @GetMapping
    public ResponseEntity<List<BillDTO.Response>> getBills(@RequestParam Long userId) {
        return ResponseEntity.ok(billService.getBillsForUser(userId));
    }

    @PostMapping
    public ResponseEntity<BillDTO.Response> createBill(@Valid @RequestBody BillDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(billService.createBill(request));
    }

    @PatchMapping("/{id}/pay")
    public ResponseEntity<BillDTO.Response> payBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.markAsPaid(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
        return ResponseEntity.noContent().build();
    }
}