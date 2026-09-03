package com.momo.miniapp.repository;
import com.momo.miniapp.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserId(String userId);
    List<Bill> findByUserIdAndIsPaid(String userId, Boolean isPaid);
    List<Bill> findByUserIdAndIsPaidFalseAndDueDateBefore(String userId, LocalDate date);
    List<Bill> findByDueDateBeforeAndIsPaidFalse(LocalDate date);
    List<Bill> findByUserIdAndIsRecurringTrue(String userId);
}
