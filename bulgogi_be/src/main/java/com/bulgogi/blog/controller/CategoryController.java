package com.bulgogi.blog.controller;

import com.bulgogi.blog.dto.CategoryRequestDTO;
import com.bulgogi.blog.dto.CategoryResponseDTO;
import com.bulgogi.blog.service.CategoryService;
import com.bulgogi.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final PostService postService;

    @Autowired
    public CategoryController(CategoryService categoryService, PostService postService) {
        this.categoryService = categoryService;
        this.postService = postService;
    }

    /**
     * 카테고리 작성: 새로운 카테고리를 작성할 수 있도록 처리.
     * 카테고리 조회: 카테고리를 조회할 수 있도록 처리.
     * 카테고리 전체 조회: 카테고리를 전체 조회할 수 있도록 처리.
     * 카테고리 수정: 기존 카테고리를 수정할 수 있도록 처리.
     * 카테고리 삭제: 카테고리를 삭제할 수 있도록 처리.
     *
     * 16:24 2025-03-10
     * 추가 작업 계획
     * - 카테고리 작성: User와 Category관계 설정(개인의 블로그 홈에서 카테고리 생성 및 보유)
     * - 카테고리 삭제: 인증로직 생각해보기(현재는 jwt토큰으로 가능)
     *
     */

    // 카테고리 작성
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.ok(categoryService.createCategory(categoryRequestDTO));
    }

    // 카테고리 단건 조회
    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }

    // 카테고리 전체 조회
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // 카테고리 수정
    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, categoryRequestDTO));
    }

    // 카테고리 삭제
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
}
