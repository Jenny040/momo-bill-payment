package com.momo.miniapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BillDTO {

    @NotBlank
    private String userId;

    @NotBlank
    private String billName;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private LocalDate dueDate;

    private boolean autoTopUp;
}
