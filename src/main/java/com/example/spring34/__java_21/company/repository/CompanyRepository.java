package com.example.spring34.__java_21.company.repository;

import com.example.spring34.__java_21.company.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByIdAndUserId(Long companyId, Long userId);
    void deleteByIdAndUserId(Long companyId, Long userId);
}
