package com.momo.miniapp.repository;

import com.momo.miniapp.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserId(String userId);
    List<Bill> findByUserIdAndPaidFalse(String userId);
}
