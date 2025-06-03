package com.example.spring34.__java_21.bankAccount.mapper;

import com.example.spring34.__java_21.bankAccount.DTO.BankAccountDTO;
import com.example.spring34.__java_21.bankAccount.model.BankAccount;
import com.example.spring34.__java_21.company.model.CompanyModel;
import org.springframework.stereotype.Component;

@Component
public class BankAccountMapper {

    public static BankAccountDTO toDTO(BankAccount account) {
        return new BankAccountDTO(
                account.getId(),
                account.getBankName(),
                account.getAgency(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getInitialBalance(),
                account.getCurrentBalance(),
                account.getCreationDate(),
                account.getCompany().getId()
        );
    }

    public static BankAccount toEntity(BankAccountDTO dto, CompanyModel company) {
        BankAccount account = new BankAccount();
        account.setId(dto.getId());
        account.setBankName(dto.getBankName());
        account.setAgency(dto.getAgency());
        account.setAccountNumber(dto.getAccountNumber());
        account.setAccountType(dto.getAccountType());
        account.setInitialBalance(dto.getInitialBalance());
        account.setCurrentBalance(dto.getCurrentBalance());
        account.setCreationDate(dto.getCreationDate());
        account.setCompany(company);
        return account;
    }
}
