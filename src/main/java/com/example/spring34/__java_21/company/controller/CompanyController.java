package com.example.spring34.__java_21.company.controller;

import com.example.spring34.__java_21.company.dto.request.CompanyRequest;
import com.example.spring34.__java_21.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/companies")
@PreAuthorize("hasAuthority('ROLE_USER')") // Ensures that only authenticated users with ROLE_USER can access these endpoints
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService; // Service layer for handling company-related operations

    /**
     * Endpoint to create a new company.
     *
     * @param request The company data sent in the request body.
     * @param authentication The current authenticated user (used to get the username).
     * @return The created company data as a response.
     */
    @PostMapping
    public ResponseEntity<?> createCompany(
            @RequestBody CompanyRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(
                companyService.createCompany(request, authentication.getName()));
    }

    /**
     * Endpoint to delete a company by its ID.
     *
     * @param id The ID of the company to delete.
     * @param authentication The current authenticated user (used to verify ownership).
     * @return 204 No Content when the deletion is successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable Long id,
            Authentication authentication) {
        companyService.deleteCompany(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
