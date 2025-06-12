package com.example.spring34.__java_21.transactions.service;

import com.example.spring34.__java_21.transactions.DTO.CategoryDTO;
import com.example.spring34.__java_21.transactions.mapper.CategoryMapper;
import com.example.spring34.__java_21.transactions.model.Category;
import com.example.spring34.__java_21.transactions.repository.CategoryRepository;
import com.example.spring34.__java_21.user.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public List<CategoryDTO> findAll() {
        User user = getCurrentUser();
        return repository.findAllByUser(user).stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO findById(Long id) {
        User user = getCurrentUser();
        return repository.findByCategoryIdAndUser(id, user)
                .map(CategoryMapper::toDTO)
                .orElse(null);
    }

    public CategoryDTO save(CategoryDTO dto) {
        User user = getCurrentUser();
        if (repository.existsByCategoryNameIgnoreCaseAndUser(dto.getCategoryName(), user)) {
            throw new IllegalArgumentException("Category name already exists for this user");
        }
        Category entity = CategoryMapper.toEntity(dto);
        entity.setUser(user);
        Category saved = repository.save(entity);
        return CategoryMapper.toDTO(saved);
    }

    public void delete(Long id) {
        User user = getCurrentUser();
        repository.findByCategoryIdAndUser(id, user).ifPresent(repository::delete);
    }
}