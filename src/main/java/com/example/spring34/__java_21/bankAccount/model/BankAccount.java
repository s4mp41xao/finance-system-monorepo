package com.example.spring34.__java_21.bankAccount.model;

import com.example.spring34.__java_21.company.model.CompanyModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_account")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String agency;

    @Column(nullable = false)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal initialBalance;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal currentBalance;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyModel company;

    @PrePersist
    protected void onCreate() {
        creationDate = LocalDateTime.now();
    }
}
