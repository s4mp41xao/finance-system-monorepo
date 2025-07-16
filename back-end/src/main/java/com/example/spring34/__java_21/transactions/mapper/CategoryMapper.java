package com.example.spring34.__java_21.transactions.mapper;

import com.example.spring34.__java_21.transactions.DTO.CategoryDTO;
import com.example.spring34.__java_21.transactions.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public static CategoryDTO toDTO(Category category) {
        if (category == null) return null;
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setTransactionType(category.getTransactionType());
        return dto;
    }

    public static Category toEntity(CategoryDTO dto) {
        if (dto == null) return null;
        Category category = new Category();
        category.setCategoryId(dto.getCategoryId());
        category.setCategoryName(dto.getCategoryName());
        category.setTransactionType(dto.getTransactionType());
        return category;
    }
}
