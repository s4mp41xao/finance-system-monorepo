package com.example.spring34.__java_21.transactions.mapper;

import com.example.spring34.__java_21.transactions.DTO.TransactionDTO;
import com.example.spring34.__java_21.transactions.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {
    public static TransactionDTO toDTO(Transaction transaction) {
        if (transaction == null) return null;
        TransactionDTO dto = new TransactionDTO();
        dto.setTransactionId(transaction.getTransactionId());
        dto.setAmount(transaction.getAmount());
        dto.setDate(transaction.getDate());
        dto.setDescription(transaction.getDescription());
        dto.setType(transaction.getType());
        dto.setCreationDate(transaction.getCreationDate());

        if (transaction.getCategory() != null) {
            dto.setCategoryId(transaction.getCategory().getCategoryId());
            dto.setCategoryName(transaction.getCategory().getCategoryName());
            // Nenhuma referência ao campo category (CategoryDTO)
        }

        dto.setBankAccountId(transaction.getBankAccountId());
        return dto;
    }

    public static Transaction toEntity(TransactionDTO dto) {
        if (dto == null) return null;
        Transaction transaction = new Transaction();
        transaction.setTransactionId(dto.getTransactionId());
        transaction.setAmount(dto.getAmount());
        transaction.setDate(dto.getDate());
        transaction.setDescription(dto.getDescription());
        transaction.setType(dto.getType());
        transaction.setCreationDate(dto.getCreationDate());
        // Não setar category aqui, pois será feito no service
        transaction.setBankAccountId(dto.getBankAccountId());
        return transaction;
    }


}