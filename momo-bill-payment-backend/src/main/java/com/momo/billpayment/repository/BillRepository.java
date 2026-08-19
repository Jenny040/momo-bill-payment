package com.momo.billpayment.repository;

import com.momo.billpayment.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findByUserId(Long userId);

    List<Bill> findByUserIdAndStatus(Long userId, Bill.BillStatus status);

    // Used by the reminder job to find bills due soon so alerts can be sent
    List<Bill> findByDueDateBetweenAndStatusNot(LocalDate start, LocalDate end, Bill.BillStatus status);
}
