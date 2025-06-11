package com.example.spring34.__java_21.transactions.DTO;

import com.example.spring34.__java_21.transactions.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long categoryId;
    private String categoryName;
    private TransactionType transactionType;
}
