package com.example.spring34.__java_21.transactions.repository;

import com.example.spring34.__java_21.transactions.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
