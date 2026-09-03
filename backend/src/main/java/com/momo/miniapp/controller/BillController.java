package com.momo.miniapp.controller;

import com.momo.miniapp.dto.BillDTO;
import com.momo.miniapp.model.Bill;
import com.momo.miniapp.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/bills")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    @GetMapping
    public ResponseEntity<List<BillDTO>> getBills(@RequestParam String userId) {
        List<Bill> bills = billService.getUserBills(userId);
        List<BillDTO> dtos = bills.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<BillDTO> createBill(@RequestBody Bill bill) {
        Bill saved = billService.createBill(bill);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @PostMapping("/{billId}/pay")
    public ResponseEntity<BillDTO> payBill(@PathVariable Long billId) {
        Bill paid = billService.payBill(billId);
        return ResponseEntity.ok(convertToDTO(paid));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<BillDTO>> getOverdueBills(@RequestParam String userId) {
        List<Bill> bills = billService.getOverdueBills(userId);
        List<BillDTO> dtos = bills.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private BillDTO convertToDTO(Bill bill) {
        BillDTO dto = new BillDTO();
        dto.setId(bill.getId());
        dto.setUserId(bill.getUserId());
        dto.setBillType(bill.getBillType());
        dto.setProvider(bill.getProvider());
        dto.setAccountNumber(bill.getAccountNumber());
        dto.setAmount(bill.getAmount());
        dto.setDueDate(bill.getDueDate());
        dto.setIsPaid(bill.getIsPaid());
        dto.setIsRecurring(bill.getIsRecurring());
        dto.setRecurrenceInterval(bill.getRecurrenceInterval());
        dto.setCategory(bill.getCategory());
        dto.setDescription(bill.getDescription());
        dto.setStatus(bill.getIsPaid() ? "PAID" : 
                     bill.getDueDate().isBefore(java.time.LocalDate.now()) ? "OVERDUE" : "PENDING");
        return dto;
    }
}
