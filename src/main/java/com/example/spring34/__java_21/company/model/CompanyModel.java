package com.example.spring34.__java_21.company.model;

import com.example.spring34.__java_21.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CompanyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
    @SequenceGenerator(name = "company_seq", allocationSize = 1)
    private Long id; // Primary key with sequence-based generation

    @Column(nullable = false)
    private String name; // Company name (cannot be null)

    @Column(nullable = false)
    private String cnpj; // Company CNPJ (is unique only by user)

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate; // Timestamp of when the company was created

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who owns this company

    /**
     * Automatically sets the creation date before the entity is persisted.
     */
    @PrePersist
    protected void onCreate() {
        creationDate = LocalDateTime.now();
    }
}
