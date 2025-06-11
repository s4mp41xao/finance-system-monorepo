package com.example.spring34.__java_21.transactions.DTO;

import com.example.spring34.__java_21.transactions.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Long transactionId;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
    private TransactionType type;
    private LocalDateTime creationDate;
    private Long categoryId;
    private String categoryName;
//    private CategoryDTO category; // novo campo para criação inline
    private Long bankAccountId;
}