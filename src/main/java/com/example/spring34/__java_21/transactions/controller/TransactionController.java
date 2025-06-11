package com.example.spring34.__java_21.transactions.controller;

import com.example.spring34.__java_21.transactions.DTO.TransactionDTO;
import com.example.spring34.__java_21.transactions.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public List<TransactionDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/get/{id}")
    public TransactionDTO getById(@PathVariable("id") Long id) {
        return service.findById(id);
    }

    @PostMapping("/create")
    public TransactionDTO create(@RequestBody TransactionDTO dto) {
        return service.save(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }
}