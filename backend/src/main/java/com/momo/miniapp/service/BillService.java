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
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

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

    @Transactional
    public BillDTO.Response markAsPaid(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found: " + billId));

        if (bill.getStatus() == Bill.BillStatus.PAID) {
            throw new RuntimeException("Bill is already paid");
        }

        String phoneNumber = bill.getUser().getPhoneNumber();
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            throw new RuntimeException("User phone number is required for MoMo payment");
        }

        try {
            String referenceId = UUID.randomUUID().toString();
            String amount = bill.getAmountDue().toString();
            String currency = "ZAR";
            String payerMsisdn = phoneNumber;

            log.info("========================================");
            log.info("Starting MoMo payment for bill ID: {}", billId);
            log.info("Amount: {} {}", amount, currency);
            log.info("Phone Number: {}", payerMsisdn);
            log.info("Reference ID: {}", referenceId);
            log.info("========================================");

            // Use the MomoApiClient with retry
            boolean paymentSuccess = momoApiClient.payBillAndConfirmWithRetry(
                    amount,
                    currency,
                    referenceId,
                    payerMsisdn,
                    10,   // max retries
                    5     // seconds between checks
            );

            if (paymentSuccess) {
                bill.setStatus(Bill.BillStatus.PAID);
                bill.setPaidAt(Instant.now());
                Bill saved = billRepository.save(bill);

                log.info("✅ Bill {} marked as PAID successfully!", billId);

                notificationService.sendPaymentSuccessNotification(
                        bill.getUser(),
                        bill.getProvider(),
                        bill.getAmountDue().toString()
                );

                return BillDTO.Response.fromEntity(saved);
            } else {
                log.error("❌ Payment could not be confirmed for bill {}", billId);
                throw new RuntimeException("Payment could not be confirmed");
            }

        } catch (Exception e) {
            log.error("❌ MoMo payment failed for bill {}: {}", billId, e.getMessage());
            throw new RuntimeException("MoMo payment could not be confirmed for bill " + billId, e);
        }
    }

    public void deleteBill(Long billId) {
        if (!billRepository.existsById(billId)) {
            throw new ResourceNotFoundException("Bill not found: " + billId);
        }
        billRepository.deleteById(billId);
    }
}