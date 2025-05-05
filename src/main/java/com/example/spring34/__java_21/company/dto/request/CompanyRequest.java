package com.example.spring34.__java_21.company.dto.request;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CNPJ;

public record CompanyRequest(
        @NotBlank String name,
        @NotBlank @CNPJ String cnpj
) { }
