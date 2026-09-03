package com.momo.miniapp.scheduler;
import com.momo.miniapp.model.Bill;
import com.momo.miniapp.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;
@Component
@RequiredArgsConstructor
@Slf4j
public class ReminderScheduler {
    private final BillRepository billRepository;
    @Scheduled(cron = "0 0 8 * * *")
    public void checkOverdueBills() {
        log.info("🔍 Checking for overdue bills...");
        try {
            List<Bill> overdueBills = billRepository.findByDueDateBeforeAndIsPaidFalse(LocalDate.now());
            if (!overdueBills.isEmpty()) {
                log.warn("⚠️ Found {} overdue bills!", overdueBills.size());
                for (Bill bill : overdueBills) {
                    log.warn("   - {}: R{} (due: {})", bill.getProvider(), bill.getAmount(), bill.getDueDate());
                }
            } else {
                log.info("✅ No overdue bills found.");
            }
        } catch (Exception e) { log.error("Error checking overdue bills: {}", e.getMessage()); }
    }
    @Scheduled(cron = "0 0 8 * * *")
    public void checkUpcomingBills() {
        log.info("🔍 Checking for upcoming bills...");
        try {
            List<Bill> upcomingBills = billRepository.findByDueDateBeforeAndIsPaidFalse(LocalDate.now().plusDays(3));
            if (!upcomingBills.isEmpty()) {
                log.info("⏰ Found {} bills due in the next 3 days", upcomingBills.size());
                for (Bill bill : upcomingBills) {
                    log.info("   - {}: R{} (due: {})", bill.getProvider(), bill.getAmount(), bill.getDueDate());
                }
            }
        } catch (Exception e) { log.error("Error checking upcoming bills: {}", e.getMessage()); }
    }
}
