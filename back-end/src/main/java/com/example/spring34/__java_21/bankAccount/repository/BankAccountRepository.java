package com.example.spring34.__java_21.bankAccount.repository;

import com.example.spring34.__java_21.bankAccount.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    // search all accounts by companies
    List<BankAccount> findByCompanyId(Long companyId);
}
