package com.example.spring34.__java_21.bankAccount.DTO;

import com.example.spring34.__java_21.bankAccount.model.AccountType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankAccountDTO {
    private Long id;
    private String bankName;
    private String agency;
    private String accountNumber;
    private AccountType accountType;
    private BigDecimal initialBalance;
    private BigDecimal currentBalance;
    private LocalDateTime creationDate;
    private Long companyId;
    private String companyName;
}