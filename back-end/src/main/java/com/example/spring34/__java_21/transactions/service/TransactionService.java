package com.example.spring34.__java_21.transactions.service;

import com.example.spring34.__java_21.bankAccount.repository.BankAccountRepository;
import com.example.spring34.__java_21.transactions.DTO.TransactionDTO;
import com.example.spring34.__java_21.transactions.mapper.TransactionMapper;
import com.example.spring34.__java_21.transactions.model.Transaction;
import com.example.spring34.__java_21.transactions.model.Category;
import com.example.spring34.__java_21.transactions.repository.TransactionRepository;
import com.example.spring34.__java_21.transactions.repository.CategoryRepository;
import com.example.spring34.__java_21.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public List<TransactionDTO> findAll() {
        return repository.findAll().stream()
                .map(TransactionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO findById(Long id) {
        return repository.findById(id)
                .map(TransactionMapper::toDTO)
                .orElse(null);
    }

    public TransactionDTO save(TransactionDTO dto) {
        Transaction entity = TransactionMapper.toEntity(dto);
        User user = getCurrentUser();
        // Permitir criar categoria inline ou usar existente
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseGet(() -> {
                    // Se não existir, cria uma nova categoria com os dados do DTO
                    if (dto.getCategoryName() != null && dto.getType() != null) {
                        boolean exists = categoryRepository
                            .existsByCategoryNameIgnoreCaseAndUser(dto.getCategoryName(), user);
                        if (exists) {
                            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category name already exists");
                        }
                        Category newCategory = new Category();
                        newCategory.setCategoryName(dto.getCategoryName());
                        newCategory.setTransactionType(dto.getType());
                        newCategory.setUser(user);
                        return categoryRepository.save(newCategory);
                    } else {
                        throw new IllegalArgumentException("Category information is required to create a new category");
                    }
                });
            entity.setCategory(category);
        } else if (dto.getCategoryName() != null && dto.getType() != null) {
            boolean exists = categoryRepository
                .existsByCategoryNameIgnoreCaseAndUser(dto.getCategoryName(), user);
            if (exists) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Category name already exists");
            }
            Category newCategory = new Category();
            newCategory.setCategoryName(dto.getCategoryName());
            newCategory.setTransactionType(dto.getType());
            newCategory.setUser(user);
            Category savedCategory = categoryRepository.save(newCategory);
            entity.setCategory(savedCategory);
        } else {
            throw new IllegalArgumentException("CategoryId or CategoryName/Type is required");
        }
        Transaction saved = repository.save(entity);
        return TransactionMapper.toDTO(saved);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<TransactionDTO> findAllByCompanyId(Long companyId) {
        // Busca todas as contas bancárias da empresa
        List<Long> bankAccountIds = bankAccountRepository.findByCompanyId(companyId)
                .stream()
                .map(account -> account.getId())
                .collect(Collectors.toList());
        // Busca todas as transações dessas contas
        return repository.findAllByBankAccountIdIn(bankAccountIds)
                .stream()
                .map(TransactionMapper::toDTO)
                .collect(Collectors.toList());
    }
}