package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.TagCreateRequestDTO;
import com.bulgogi.blog.dto.TagDTO;
import com.bulgogi.blog.service.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/blog/tags")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    /**
     * 태그 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<TagDTO>> createTag(
            @Valid @RequestBody TagCreateRequestDTO requestDTO) {

        TagDTO tagDTO = tagService.createTag(requestDTO);
        return new ResponseEntity<>(
                ApiResponse.success("태그가 성공적으로 생성되었습니다.", tagDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 태그명 자동완성 제안
     */
    @GetMapping("/suggestions")
    public ResponseEntity<ApiResponse<List<TagDTO>>> getSuggestions(
            @RequestParam String query) {

        List<TagDTO> suggestions = tagService.getSuggestions(query);
        return ResponseEntity.ok(
                ApiResponse.success(suggestions)
        );
    }

    /**
     * 태그 목록 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<TagDTO>>> getAllTags(
            @PageableDefault(size = 50, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        Page<TagDTO> tags = tagService.getAllTags(pageable);
        return ResponseEntity.ok(
                ApiResponse.success(tags)
        );
    }

    /**
     * 인기 태그 조회
     */
    @GetMapping("/popular")
    public ResponseEntity<ApiResponse<List<TagDTO>>> getPopularTags(
            @RequestParam(defaultValue = "10") int limit) {

        List<TagDTO> popularTags = tagService.getPopularTags(limit);
        return ResponseEntity.ok(
                ApiResponse.success(popularTags)
        );
    }

    /**
     * 태그명으로 태그 조회
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<TagDTO>> getTagByName(
            @PathVariable String name) {

        TagDTO tagDTO = tagService.getTagByName(name);
        return ResponseEntity.ok(
                ApiResponse.success(tagDTO)
        );
    }

    /**
     * 태그 ID로 태그 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TagDTO>> getTagById(
            @PathVariable Long id) {

        TagDTO tagDTO = tagService.getTagById(id);
        return ResponseEntity.ok(
                ApiResponse.success(tagDTO)
        );
    }

    /**
     * 여러 태그명으로 태그 조회 또는 생성
     */
    @PostMapping("/batch")
    public ResponseEntity<ApiResponse<Set<TagDTO>>> getOrCreateTagsByNames(
            @RequestBody Set<String> tagNames) {

        Set<TagDTO> tags = tagService.getOrCreateTagsByNames(tagNames);
        return ResponseEntity.ok(
                ApiResponse.success("태그가 성공적으로 처리되었습니다.", tags)
        );
    }
}