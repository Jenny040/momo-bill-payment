package com.momo.miniapp.service;

import com.momo.miniapp.model.Bill;
import com.momo.miniapp.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReminderScheduler {

    private final BillRepository billRepository;

    @Scheduled(cron = "0 0 8 * * *")
    public void flagBillsDueSoon() {
        LocalDate today = LocalDate.now();
        LocalDate threeDaysOut = today.plusDays(3);

        List<Bill> upcoming = billRepository.findByDueDateBetweenAndStatusNot(
                today, threeDaysOut, Bill.BillStatus.PAID
        );

        for (Bill bill : upcoming) {
            if (bill.getDueDate().isBefore(today)) {
                bill.setStatus(Bill.BillStatus.OVERDUE);
            } else {
                bill.setStatus(Bill.BillStatus.DUE_SOON);
            }
            billRepository.save(bill);
        }
    }
}