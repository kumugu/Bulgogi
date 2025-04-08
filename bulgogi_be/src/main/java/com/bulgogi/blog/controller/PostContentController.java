package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.PostContentDTO;
import com.bulgogi.blog.service.PostContentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog/posts/{postId}/post-content")
public class PostContentController {

    private final PostContentService postContentService;

    @Autowired
    public PostContentController(PostContentService postContentService) {
        this.postContentService = postContentService;
    }

    /**
     * 게시글 내용 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PostContentDTO>> getPostContent(
            @PathVariable Long postId) {

        return postContentService.getPostContentByPostId(postId)
                .map(content -> ResponseEntity.ok(ApiResponse.success(content)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 게시글 내용 저장/업데이트
     */
    @PutMapping
    public ResponseEntity<ApiResponse<PostContentDTO>> updatePostContent(
            @PathVariable Long postId,
            @RequestBody String content) {

        PostContentDTO postContentDTO = postContentService.updatePostContent(postId, content);
        return ResponseEntity.ok(
                ApiResponse.success("게시글 내용이 성공적으로 업데이트되었습니다.", postContentDTO)
        );
    }

    /**
     * 새 게시글 내용 저장
     */
    @PostMapping
    public ResponseEntity<ApiResponse<PostContentDTO>> savePostContent(
            @PathVariable Long postId,
            @Valid @RequestBody PostContentDTO postContentDTO) {

        PostContentDTO savedContent = postContentService.savePostContent(postContentDTO, postId);
        return new ResponseEntity<>(
                ApiResponse.success("게시글 내용이 성공적으로 저장되었습니다.", savedContent),
                HttpStatus.CREATED
        );
    }

    /**
     * 게시글 내용 삭제
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deletePostContent(
            @PathVariable Long postId) {

        postContentService.deletePostContent(postId);
        return ResponseEntity.ok(
                ApiResponse.success("게시글 내용이 성공적으로 삭제되었습니다.", null)
        );
    }
}