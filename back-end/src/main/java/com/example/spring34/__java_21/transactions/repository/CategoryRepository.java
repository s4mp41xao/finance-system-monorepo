package com.example.spring34.__java_21.transactions.repository;

import com.example.spring34.__java_21.transactions.model.Category;
import com.example.spring34.__java_21.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryNameIgnoreCaseAndUser(String categoryName, User user);
    Optional<Category> findByCategoryNameIgnoreCaseAndUser(String categoryName, User user);
    List<Category> findAllByUser(User user);
    Optional<Category> findByCategoryIdAndUser(Long categoryId, User user);
}
