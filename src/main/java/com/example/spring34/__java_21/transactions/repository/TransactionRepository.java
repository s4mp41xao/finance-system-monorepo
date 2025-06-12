package com.example.spring34.__java_21.transactions.repository;

import com.example.spring34.__java_21.transactions.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByBankAccountIdIn(List<Long> bankAccountIds);
}
