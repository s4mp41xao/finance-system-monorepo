package com.example.spring34.__java_21.bankAccount.service;

import com.example.spring34.__java_21.bankAccount.DTO.BankAccountDTO;
import com.example.spring34.__java_21.bankAccount.mapper.BankAccountMapper;
import com.example.spring34.__java_21.bankAccount.model.BankAccount;
import com.example.spring34.__java_21.bankAccount.repository.BankAccountRepository;
import com.example.spring34.__java_21.company.model.CompanyModel;
import com.example.spring34.__java_21.company.repository.CompanyRepository;
import com.example.spring34.__java_21.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final CompanyRepository companyRepository;
    private final BankAccountMapper bankAccountMapper;

    // cria uma nova conta bancaria associada a uma empresa
    public BankAccountDTO createBankAccount(BankAccountDTO dto, Long companyId) {
        CompanyModel company = companyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa com ID " + companyId + " não encontrada."));

        // procura o id dessa empresa, e salva a conta bancária a empresa registrada
        BankAccount account = BankAccountMapper.toEntity(dto, company);
        BankAccount saved = bankAccountRepository.save(account);
        return BankAccountMapper.toDTO(saved);
    }

    // list all bank account of some company
    public List<BankAccountDTO> getAccountsByCompany(Long companyId){
        return bankAccountRepository.findByCompanyId(companyId)
                .stream()
                .map(BankAccountMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<BankAccountDTO> getAllBankAccountsByUser(User user){
        List<CompanyModel> companies = companyRepository.findByUserId(user.getId());

        return companies.stream()
                .flatMap(company -> bankAccountRepository.findByCompanyId(company.getId()).stream())
                .map(BankAccountMapper::toDTO)
                .collect(Collectors.toList());
    }

    // remove bank account by Id
    public void deleteBankAccount(Long id) {
        if (!bankAccountRepository.existsById(id)) {
            throw new EntityNotFoundException("Conta bancária com o ID " + id + " não encontrada");
        }
        // remove a conta bancária pelo id se o ID da conta bancária existir
        bankAccountRepository.deleteById(id);
    }
}
