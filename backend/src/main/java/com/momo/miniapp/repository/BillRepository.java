package com.momo.miniapp.repository;

import com.momo.miniapp.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserId(Long userId);
    List<Bill> findByUserIdAndStatus(Long userId, Bill.BillStatus status);
    List<Bill> findByDueDateBetweenAndStatusNot(LocalDate start, LocalDate end, Bill.BillStatus status);
}