package com.example.spring34.__java_21.company.dto.response;

import com.example.spring34.__java_21.company.model.CompanyModel;

import java.time.LocalDateTime;

public record CompanyResponse(
        Long id,
        String name,
        String cnpj,
        LocalDateTime creationDate,
        Long userId
) {
    public static CompanyResponse fromEntity(CompanyModel company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getCnpj(),
                company.getCreationDate(),
                company.getUser().getId()
        );
    }

}
