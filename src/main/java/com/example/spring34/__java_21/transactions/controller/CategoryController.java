package com.example.spring34.__java_21.transactions.controller;

import com.example.spring34.__java_21.transactions.DTO.CategoryDTO;
import com.example.spring34.__java_21.transactions.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/get/{id}")
    public CategoryDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/create")
    public CategoryDTO create(@RequestBody CategoryDTO dto) {
        return service.save(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}