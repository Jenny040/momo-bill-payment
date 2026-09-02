package com.momo.miniapp.dto;

import com.momo.miniapp.model.Bill;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BillDTO {

    public record Request(
            @NotNull Long userId,
            @NotBlank String provider,
            @NotNull Bill.BillCategory category,
            @NotNull BigDecimal amountDue,
            @NotNull LocalDate dueDate
    ) {}

    public record Response(
            Long id,
            String provider,
            Bill.BillCategory category,
            BigDecimal amountDue,
            LocalDate dueDate,
            Bill.BillStatus status
    ) {
        public static Response fromEntity(Bill bill) {
            return new Response(
                    bill.getId(), bill.getProvider(), bill.getCategory(),
                    bill.getAmountDue(), bill.getDueDate(), bill.getStatus()
            );
        }
    }
}