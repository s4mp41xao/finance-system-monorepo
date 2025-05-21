package com.example.spring34.__java_21.company.service;

import com.example.spring34.__java_21.company.dto.request.CompanyRequest;
import com.example.spring34.__java_21.company.dto.response.CompanyResponse;
import com.example.spring34.__java_21.company.model.CompanyModel;
import com.example.spring34.__java_21.company.repository.CompanyRepository;
import com.example.spring34.__java_21.user.model.User;
import com.example.spring34.__java_21.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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

        // Checks if there is already a company with the same CNPJ associated with the same user.
        boolean companyExists = companyRepository.existsByCnpjAndUserId(request.cnpj(), user.getId());

        if (companyExists) {
            throw new IllegalArgumentException("Você já possui uma empresa registrada com esse CNPJ.");
        }

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


    public List<CompanyResponse> getCompaniesByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return companyRepository.findByUser(user)
                .stream()
                .map(CompanyResponse::fromEntity)
                .toList();
    }



    /**
     * Deletes a company by its ID if it belongs to the authenticated user.
     *
     * @param companyId the ID of the company to delete.
     * @param username  the email of the authenticated user (retrieved from token).
     */
    @Transactional
    public void deleteCompany(Long companyId, String username) {
        // Find the user by email (username); throw exception if not found
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Delete the company only if it belongs to the authenticated user
        companyRepository.deleteByIdAndUserId(companyId, user.getId());
    }
}