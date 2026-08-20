package com.momo.billpayment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String phoneNumber; // MoMo-linked phone number, used as the primary identifier

    @Column(nullable = false)
    private String fullName;

    /**
     * Preferred language code, e.g. "en", "zu", "xh", "af", "st", "nso",
     * "tn", "ts", "ve", "ss", "nr" (the 11 official South African languages).
     */
    @Column(nullable = false)
    private String preferredLanguage = "en";

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
