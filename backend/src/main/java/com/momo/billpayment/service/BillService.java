package com.momo.billpayment.service;

import com.momo.billpayment.dto.BillDTO;
import com.momo.billpayment.exception.ResourceNotFoundException;
import com.momo.billpayment.model.Bill;
import com.momo.billpayment.model.User;
import com.momo.billpayment.repository.BillRepository;
import com.momo.billpayment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final UserRepository userRepository;

    public List<BillDTO.Response> getBillsForUser(Long userId) {
        return billRepository.findByUserId(userId).stream()
                .map(BillDTO.Response::fromEntity)
                .toList();
    }

    public BillDTO.Response createBill(BillDTO.Request request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.userId()));

        Bill bill = new Bill();
        bill.setUser(user);
        bill.setProvider(request.provider());
        bill.setCategory(request.category());
        bill.setAmountDue(request.amountDue());
        bill.setDueDate(request.dueDate());
        bill.setStatus(Bill.BillStatus.UPCOMING);

        return BillDTO.Response.fromEntity(billRepository.save(bill));
    }

    public BillDTO.Response markAsPaid(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found: " + billId));

        // In production this is where the MoMo payment API call would be triggered
        // before the status is flipped to PAID.
        bill.setStatus(Bill.BillStatus.PAID);
        bill.setPaidAt(Instant.now());

        return BillDTO.Response.fromEntity(billRepository.save(bill));
    }

    public void deleteBill(Long billId) {
        if (!billRepository.existsById(billId)) {
            throw new ResourceNotFoundException("Bill not found: " + billId);
        }
        billRepository.deleteById(billId);
    }
}
