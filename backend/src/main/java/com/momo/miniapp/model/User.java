package com.momo.miniapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
import java.time.Instant;
=======
import java.util.ArrayList;
import java.util.List;
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @Column(nullable = false, unique = true)
    private String phoneNumber; // includes country code, e.g. +233... (Ghana), +256... (Uganda)

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Country country;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Language preferredLanguage = Language.EN;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
=======
    // ❌ DELETE THIS LINE: private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String fullName;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Country country;

    @Enumerated(EnumType.STRING)
    private Language preferredLanguage;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bill> bills = new ArrayList<>();
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
}