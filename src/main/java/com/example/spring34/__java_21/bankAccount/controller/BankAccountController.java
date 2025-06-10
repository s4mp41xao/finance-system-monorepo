package com.example.spring34.__java_21.bankAccount.controller;

import com.example.spring34.__java_21.bankAccount.DTO.BankAccountDTO;
import com.example.spring34.__java_21.bankAccount.service.BankAccountService;
import com.example.spring34.__java_21.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bank-accounts")
@RequiredArgsConstructor
public class BankAccountController {

    private final BankAccountService bankAccountService;

    // cria uma conta bancária vinculada a uma empresa
    @PostMapping("/company/{companyId}")
    public ResponseEntity<BankAccountDTO> createBankAccount(@PathVariable("companyId") Long companyId, @RequestBody BankAccountDTO bankAccountDTO) {

        BankAccountDTO createdAccount = bankAccountService.createBankAccount(bankAccountDTO, companyId);
        return ResponseEntity.ok(createdAccount);
    }

    // lista todas as contas bancárias de uma empresa
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<BankAccountDTO>> getAccountsByCompany(@PathVariable("companyId") Long companyId) {
        List<BankAccountDTO> accounts = bankAccountService.getAccountsByCompany(companyId);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/company/user")
    public List<BankAccountDTO> getAllBankAccountsByUser(@AuthenticationPrincipal User user) {
        return bankAccountService.getAllBankAccountsByUser(user);
    }

    // deleta uma conta bancária por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBankAccount(@PathVariable("id") Long id) {
        bankAccountService.deleteBankAccount(id);
        return ResponseEntity.noContent().build();
    }
}
