package com.example.spring34.__java_21.transactions.service;

import com.example.spring34.__java_21.transactions.DTO.TransactionDTO;
import com.example.spring34.__java_21.transactions.mapper.TransactionMapper;
import com.example.spring34.__java_21.transactions.model.Transaction;
import com.example.spring34.__java_21.transactions.model.Category;
import com.example.spring34.__java_21.transactions.repository.TransactionRepository;
import com.example.spring34.__java_21.transactions.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
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
        // Permitir criar categoria inline ou usar existente
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseGet(() -> {
                    // Se não existir, cria uma nova categoria com os dados do DTO
                    if (dto.getCategoryName() != null && dto.getType() != null) {
                        Category newCategory = new Category();
                        newCategory.setCategoryName(dto.getCategoryName());
                        newCategory.setTransactionType(dto.getType());
                        return categoryRepository.save(newCategory);
                    } else {
                        throw new IllegalArgumentException("Category information is required to create a new category");
                    }
                });
            entity.setCategory(category);
        } else if (dto.getCategoryName() != null && dto.getType() != null) {
            Category newCategory = new Category();
            newCategory.setCategoryName(dto.getCategoryName());
            newCategory.setTransactionType(dto.getType());
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
}