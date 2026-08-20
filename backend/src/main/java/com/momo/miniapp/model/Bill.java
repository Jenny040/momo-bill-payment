package com.momo.miniapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String billName;      // e.g. "Electricity", "Water", "School Fees"

    private BigDecimal amount;

    private LocalDate dueDate;

    private boolean autoTopUp;

    private boolean paid;
}
