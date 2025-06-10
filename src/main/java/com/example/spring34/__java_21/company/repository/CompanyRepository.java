package com.example.spring34.__java_21.company.repository;

import com.example.spring34.__java_21.company.model.CompanyModel;
import com.example.spring34.__java_21.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on the CompanyModel entity.
 * Extends JpaRepository to inherit basic operations and defines custom methods
 * for handling ownership-based data access.
 */
public interface CompanyRepository extends JpaRepository<CompanyModel, Long> {

    /**
     * Finds a company by its ID and the associated user's ID.
     * This ensures that only the owner of the company can access it.
     *
     * @param companyId the ID of the company
     * @param userId    the ID of the user (owner)
     * @return an Optional containing the company if found, empty otherwise
     */
    Optional<CompanyModel> findByIdAndUserId(Long companyId, Long userId);

    /**
     * Deletes a company by its ID and the associated user's ID.
     * This enforces that only the owner can delete their company.
     *
     * @param companyId the ID of the company
     * @param userId    the ID of the user (owner)
     */
    void deleteByIdAndUserId(Long companyId, Long userId);

    List<CompanyModel> findByUser(User user);

    boolean existsByCnpjAndUserId(String cnpj, Long userId);

    List<CompanyModel> findByUserId(Long userId);
}
