package com.momo.miniapp.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BillDTO {
    private Long id;
    private String userId;
    private String billType;
    private String provider;
    private String accountNumber;
    private Double amount;
    private LocalDate dueDate;
    private Boolean isPaid;
    private Boolean isRecurring;
    private Integer recurrenceInterval;
    private String description;
    private String category;
    private String status; // PAID, PENDING, OVERDUE
}
