package com.momo.miniapp.service;

import com.momo.miniapp.dto.BillDTO;
import com.momo.miniapp.model.Bill;
import com.momo.miniapp.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;

    public List<Bill> getBillsForUser(String userId) {
        return billRepository.findByUserId(userId);
    }

    public List<Bill> getUpcomingUnpaidBills(String userId) {
        return billRepository.findByUserIdAndPaidFalse(userId);
    }

    public Bill createBill(BillDTO dto) {
        Bill bill = new Bill();
        bill.setUserId(dto.getUserId());
        bill.setBillName(dto.getBillName());
        bill.setAmount(dto.getAmount());
        bill.setDueDate(dto.getDueDate());
        bill.setAutoTopUp(dto.isAutoTopUp());
        bill.setPaid(false);
        return billRepository.save(bill);
    }

    public Bill markPaid(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new IllegalArgumentException("Bill not found: " + billId));
        bill.setPaid(true);
        return billRepository.save(bill);
    }
}
