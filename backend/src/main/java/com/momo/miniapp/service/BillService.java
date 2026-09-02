package com.momo.miniapp.service;

import com.momo.miniapp.client.MomoApiClient;
import com.momo.miniapp.dto.BillDTO;
import com.momo.miniapp.exception.ResourceNotFoundException;
import com.momo.miniapp.model.Bill;
import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.BillRepository;
import com.momo.miniapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillService {

    private final BillRepository billRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final MomoApiClient momoApiClient;

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
                .orElseThrow(() -> new ResourceNotFoundException("ill not found: " + billId));

        String phoneNumber = bill.getUser().getPhoneNumber();
        String externalId = "BILL-" + billId + "-" + System.currentTimeMillis();

        boolean paymentConfirmed;
        try {
            paymentConfirmed = momoApiClient.payBillAndConfirm(
                    bill.getAmountDue().toString(),
                    "ZAR",
                    externalId,
                    phoneNumber
            );
        } catch (Exception e) {
            log.error("MoMo payment failed for bill {}: {}", billId, e.getMessage(), e);
            paymentConfirmed = false;
        }

        if (!paymentConfirmed) {
            throw new IllegalStateException("MoMo payment could not be confirmed for bill " + billId);
        }

        bill.setStatus(Bill.BillStatus.PAID);
        bill.setPaidAt(Instant.now());
        Bill saved = billRepository.save(bill);

        notificationService.sendPaymentSuccessNotification(
                bill.getUser(), bill.getProvider(), bill.getAmountDue().toString()
        );

        return BillDTO.Response.fromEntity(saved);
    }

    public void deleteBill(Long billId) {
        if (!billRepository.existsById(billId)) {
            throw new ResourceNotFoundException("Bill not found: " + billId);
        }
        billRepository.deleteById(billId);
    }
}