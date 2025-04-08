package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.PostCreateRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.PostUpdateRequestDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.blog.service.PostService;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.model.User;
import com.bulgogi.user.security.CustomUserDetails;
import com.bulgogi.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/blog/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    /**
     * 게시글 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<PostResponseDTO>> createPost(
            @Valid @RequestBody PostCreateRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User currentUser = customUserDetails.getUser();

        PostResponseDTO postResponseDTO = postService.createPost(requestDTO, currentUser);
        return new ResponseEntity<>(
                ApiResponse.success("게시글이 성공적으로 생성되었습니다.", postResponseDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 게시글 수정
     */
    @PutMapping("/{postId}")
    public ResponseEntity<ApiResponse<PostResponseDTO>> updatePost(
            @PathVariable Long postId,
            @Valid @RequestBody PostUpdateRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        PostResponseDTO postResponseDTO = postService.updatePost(postId, requestDTO, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("게시글이 성공적으로 수정되었습니다.", postResponseDTO)
        );
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal User currentUser) {

        postService.deletePost(postId, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("게시글이 성공적으로 삭제되었습니다.", null)
        );
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/{postId}")
    public ResponseEntity<ApiResponse<PostResponseDTO>> getPostById(
            @PathVariable Long postId) {

        PostResponseDTO postResponseDTO = postService.getPostById(postId);
        return ResponseEntity.ok(
                ApiResponse.success(postResponseDTO)
        );
    }

    /**
     * 게시글 내용만 조회
     */
    @GetMapping("/{postId}/content")
    public ResponseEntity<ApiResponse<String>> getPostContent(
            @PathVariable Long postId) {

        String content = postService.getPostContent(postId);
        return ResponseEntity.ok(
                ApiResponse.success(content)
        );
    }

    /**
     * 게시글 목록 조회 (필터링 및 페이징)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<PostResponseDTO>>> getPosts(
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) Long folderCategoryId,
            @RequestParam(required = false) Set<Long> tagIds,
            @RequestParam(required = false) Long authorId,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<PostResponseDTO> posts = postService.getPosts(
                topicId, folderCategoryId, tagIds, authorId, sortBy, pageable);

        return ResponseEntity.ok(
                ApiResponse.success(posts)
        );
    }

    /**
     * 게시글 발행 상태 변경
     */
    @PutMapping("/{postId}/publish")
    public ResponseEntity<ApiResponse<PostResponseDTO>> updatePublishStatus(
            @PathVariable Long postId,
            @RequestParam boolean published,
            @AuthenticationPrincipal User currentUser) {

        PostResponseDTO postResponseDTO = postService.updatePublishStatus(postId, published, currentUser);
        String message = published ? "게시글이 발행되었습니다." : "게시글이 비공개로 설정되었습니다.";

        return ResponseEntity.ok(
                ApiResponse.success(message, postResponseDTO)
        );
    }

    /**
     * 게시글 조회수 조회
     */
    @GetMapping("/{postId}/views")
    public ResponseEntity<ApiResponse<Long>> getViewCount(
            @PathVariable Long postId) {

        Long viewCount = postService.getViewCount(postId);
        return ResponseEntity.ok(
                ApiResponse.success(viewCount)
        );
    }

    /**
     * 사용자별 게시글 목록 조회
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Page<PostResponseDTO>>> getUserPosts(
            @PathVariable Long userId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        UserResponseDTO user = userService.getUserInfoById(userId);
        Page<PostResponseDTO> posts = postService.getUserPosts(user, pageable);

        return ResponseEntity.ok(
                ApiResponse.success(posts)
        );
    }

    /**
     * 게시글에 이미지 추가
     */
    @PostMapping("/{postId}/images")
    public ResponseEntity<ApiResponse<PostResponseDTO>> addImagesToPost(
            @PathVariable Long postId,
            @Valid @RequestBody PostImageRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        PostResponseDTO postResponseDTO = postService.addImagesToPost(postId, requestDTO, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("이미지가 게시글에 추가되었습니다.", postResponseDTO)
        );
    }
}