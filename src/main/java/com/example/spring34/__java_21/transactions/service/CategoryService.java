package com.example.spring34.__java_21.transactions.service;

import com.example.spring34.__java_21.transactions.DTO.CategoryDTO;
import com.example.spring34.__java_21.transactions.mapper.CategoryMapper;
import com.example.spring34.__java_21.transactions.model.Category;
import com.example.spring34.__java_21.transactions.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryDTO> findAll() {
        return repository.findAll().stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO findById(Long id) {
        return repository.findById(id)
                .map(CategoryMapper::toDTO)
                .orElse(null);
    }

    public CategoryDTO save(CategoryDTO dto) {
        Category entity = CategoryMapper.toEntity(dto);
        Category saved = repository.save(entity);
        return CategoryMapper.toDTO(saved);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}