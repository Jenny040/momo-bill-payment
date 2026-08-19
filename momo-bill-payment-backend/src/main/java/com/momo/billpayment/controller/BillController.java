package com.momo.billpayment.controller;

import com.momo.billpayment.dto.BillDTO;
import com.momo.billpayment.service.BillService;
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

    // GET /api/v1/bills?userId=1
    @GetMapping
    public ResponseEntity<List<BillDTO.Response>> getBills(@RequestParam Long userId) {
        return ResponseEntity.ok(billService.getBillsForUser(userId));
    }

    // POST /api/v1/bills
    @PostMapping
    public ResponseEntity<BillDTO.Response> createBill(@Valid @RequestBody BillDTO.Request request) {
        BillDTO.Response created = billService.createBill(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PATCH /api/v1/bills/{id}/pay  -> triggers MoMo payment flow (stubbed for now)
    @PatchMapping("/{id}/pay")
    public ResponseEntity<BillDTO.Response> payBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.markAsPaid(id));
    }

    // DELETE /api/v1/bills/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
        return ResponseEntity.noContent().build();
    }
}
