package com.example.spring34.__java_21.company.dto.response;

import java.time.LocalDateTime;

public record CompanyResponse(
        Long id,
        String name,
        String cnpj,
        LocalDateTime creationDate,
        Long userId
) { }
