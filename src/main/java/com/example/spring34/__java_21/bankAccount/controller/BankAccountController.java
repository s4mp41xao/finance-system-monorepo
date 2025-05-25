package com.example.spring34.__java_21.bankAccount.controller;

import com.example.spring34.__java_21.bankAccount.model.BankAccount;
import com.example.spring34.__java_21.bankAccount.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bank-accounts")
@RequiredArgsConstructor
public class BankAccountController {

    private final BankAccountService bankAccountService;

    // cria uma conta bancária vinculada a uma empresa
    @PostMapping("/company/{companyId}")
    public ResponseEntity<BankAccount> createBankAccount(@PathVariable Long companyId, @RequestBody BankAccount bankAccount) {

        BankAccount createdAccount = bankAccountService.createBankAccount(bankAccount, companyId);
        return ResponseEntity.ok(createdAccount);
    }

    // lista todas as contas bancárias de uma empresa
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<BankAccount>> getAccountsByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(bankAccountService.getAccountsByCompany(companyId));
    }

    // deleta uma conta bancária por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBankAccount(@PathVariable Long id) {
        bankAccountService.deleteBankAccount(id);
        return ResponseEntity.noContent().build();
    }

}
