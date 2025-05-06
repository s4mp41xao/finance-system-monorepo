package com.example.spring34.__java_21.company.service;

import com.example.spring34.__java_21.company.dto.request.CompanyRequest;
import com.example.spring34.__java_21.company.dto.response.CompanyResponse;
import com.example.spring34.__java_21.company.model.CompanyModel;
import com.example.spring34.__java_21.company.repository.CompanyRepository;
import com.example.spring34.__java_21.domain.user.User;
import com.example.spring34.__java_21.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    /**
     * Creates a new company associated with the authenticated user.
     *
     * @param request  the company creation request containing name and CNPJ.
     * @param username the email of the authenticated user (retrieved from token).
     * @return a CompanyResponse with details of the created company.
     */
    public CompanyResponse createCompany(CompanyRequest request, String username) {
        // Find the user by email (username); throw exception if not found
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Map the request to a Company entity
        CompanyModel companyModel = new CompanyModel();
        companyModel.setName(request.name());
        companyModel.setCnpj(request.cnpj());
        companyModel.setUser(user); // Set the owner of the company

        // Save the company to the database
        CompanyModel savedCompanyModel = companyRepository.save(companyModel);

        // Build and return the response DTO
        return new CompanyResponse(
                savedCompanyModel.getId(),
                savedCompanyModel.getName(),
                savedCompanyModel.getCnpj(),
                savedCompanyModel.getCreationDate(),
                user.getId());
    }

    /**
     * Deletes a company by its ID if it belongs to the authenticated user.
     *
     * @param companyId the ID of the company to delete.
     * @param username  the email of the authenticated user (retrieved from token).
     */
    public void deleteCompany(Long companyId, String username) {
        // Find the user by email (username); throw exception if not found
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Delete the company only if it belongs to the authenticated user
        companyRepository.deleteByIdAndUserId(companyId, user.getId());
    }
}