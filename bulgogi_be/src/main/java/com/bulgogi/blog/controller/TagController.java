package com.bulgogi.blog.controller;

import com.bulgogi.blog.dto.TagRequestDTO;
import com.bulgogi.blog.dto.TagResponseDTO;
import com.bulgogi.blog.service.PostService;
import com.bulgogi.blog.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;
    private final PostService postService;

    public TagController(TagService tagService, PostService postService) {
        this.tagService = tagService;
        this.postService = postService;
    }

    /**
     * 태그 추가: 게시글에 태그를 추가할 수 있도록 처리.
     * 태그 조회: 태그를 조회할 수 있도록 처리.
     * 태그 삭제: 게시글에서 태그를 삭제할 수 있도록 처리.
     *
     * 16:24 2025-03-10
     * 추가 작업 계획
     * - 태그 추가: User와 Tag관계 설정
     * - 태그 삭제: 인증로직 생각해보기(현재는 jwt토큰으로 가능)
     */

    // 태그 추가
    @PostMapping
    public ResponseEntity<TagResponseDTO> createTag(@RequestBody TagRequestDTO tagRequestDTO) {
        return ResponseEntity.ok(tagService.createTag(tagRequestDTO));
    }

    // 태그 조회
    @GetMapping("/{tagId}")
    public ResponseEntity<TagResponseDTO> getTagById(@PathVariable Long tagId) {
        return ResponseEntity.ok(tagService.getTagById(tagId));
    }

    // 태그 삭제
    @DeleteMapping("/{tagId}")
    public ResponseEntity<TagResponseDTO> deleteTagById(@PathVariable Long tagId) {
        tagService.deleteTagById(tagId);
        return ResponseEntity.noContent().build();
    }

}
