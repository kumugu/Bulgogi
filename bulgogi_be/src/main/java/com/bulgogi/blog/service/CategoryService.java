package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.CategoryRequestDTO;
import com.bulgogi.blog.dto.CategoryResponseDTO;
import com.bulgogi.blog.mapper.CategoryMapper;
import com.bulgogi.blog.model.Category;
import com.bulgogi.blog.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    /**
     * 카테고리 작성: 새로운 카테고리를 작성할 수 있도록 처리.
     * 카테고리 단건 조회: 카테고리를 조회할 수 있도록 처리.
     * 카테고리 전체 조회: 카테고리를 전체 조회할 수 있도록 처리.
     * 카테고리 수정: 기존 카테고리를 수정할 수 있도록 처리.
     * 카테고리 삭제: 카테고리를 삭제할 수 있도록 처리.
     */

    // 카테고리 작성
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryMapper.toCategory(categoryRequestDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toCategoryResponseDTO(category);
    }

    // 카테고리 단건 조회
    public CategoryResponseDTO getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
        return categoryMapper.toCategoryResponseDTO(category);
    }

    // 카테고리 전체 조회
    public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toCategoryResponseDTO)
                .collect(Collectors.toList());
    }

    // 카테고리 수정
    public CategoryResponseDTO updateCategory(Long categoryId, CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        category.setName(categoryRequestDTO.getName());

        category = categoryRepository.save(category);
        return categoryMapper.toCategoryResponseDTO(category);
    }

    // 카테고리 삭제
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

}
