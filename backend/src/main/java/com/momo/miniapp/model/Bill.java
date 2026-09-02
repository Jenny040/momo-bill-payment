package com.momo.miniapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String provider; // e.g. "ECG" (Ghana), "Umeme" (Uganda), "Eskom" (South Africa)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillCategory category;

    @Column(nullable = false)
    private BigDecimal amountDue;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillStatus status = BillStatus.UPCOMING;

    @Column
    private Instant paidAt;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public enum BillCategory { ELECTRICITY, WATER, SCHOOL_FEES, OTHER }
    public enum BillStatus { UPCOMING, DUE_SOON, OVERDUE, PAID }
}