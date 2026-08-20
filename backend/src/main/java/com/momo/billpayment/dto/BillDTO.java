package com.momo.billpayment.dto;

import com.momo.billpayment.model.Bill;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BillDTO {

    // --- Request payload for creating/updating a bill ---
    public record Request(
            @NotNull Long userId,
            @NotBlank String provider,
            @NotNull Bill.BillCategory category,
            @NotNull BigDecimal amountDue,
            @NotNull LocalDate dueDate
    ) {}

    // --- Response payload returned to the frontend ---
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
                    bill.getId(),
                    bill.getProvider(),
                    bill.getCategory(),
                    bill.getAmountDue(),
                    bill.getDueDate(),
                    bill.getStatus()
            );
        }
    }
}
