package com.example.spring34.__java_21.bankAccount.service;

import com.example.spring34.__java_21.bankAccount.model.BankAccount;
import com.example.spring34.__java_21.bankAccount.repository.BankAccountRepository;
import com.example.spring34.__java_21.company.model.CompanyModel;
import com.example.spring34.__java_21.company.repository.CompanyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final CompanyRepository companyRepository;


    // cria uma nova conta bancaria associada a uma empresa
    public BankAccount createBankAccount(BankAccount bankAccount, Long companyId) {
        CompanyModel company = companyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa com ID" + companyId + "não encontrada."));

        // seta a nova conta bancária à empresa do usúario
        bankAccount.setCompany(company);
        // procura o id dessa empresa, e salva aconta bancária a empresa registrada
        return bankAccountRepository.save(bankAccount);
    }


    // list all bank account of some company
    public List<BankAccount> getAccountsByCompany(Long companyId){
        return bankAccountRepository.findByCompanyId(companyId);
    }

    // remove bank account by Id
    public void deleteBankAccount(Long id) {
        if (!bankAccountRepository.existsById(id)) {
            throw new EntityNotFoundException("Conta bancária com o ID" + id + "não encontrada");
        }
        // remove a conta bancária pelo id se o ID da conta bancária existir
        bankAccountRepository.deleteById(id);
    }

}
