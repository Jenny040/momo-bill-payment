package com.momo.miniapp.controller;

import com.momo.miniapp.dto.BillDTO;
import com.momo.miniapp.model.Bill;
import com.momo.miniapp.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @GetMapping("/{userId}")
    public List<Bill> getBills(@PathVariable String userId) {
        return billService.getBillsForUser(userId);
    }

    @GetMapping("/{userId}/unpaid")
    public List<Bill> getUnpaidBills(@PathVariable String userId) {
        return billService.getUpcomingUnpaidBills(userId);
    }

    @PostMapping
    public Bill createBill(@Valid @RequestBody BillDTO dto) {
        return billService.createBill(dto);
    }

    @PatchMapping("/{billId}/pay")
    public Bill payBill(@PathVariable Long billId) {
        return billService.markPaid(billId);
    }
}
