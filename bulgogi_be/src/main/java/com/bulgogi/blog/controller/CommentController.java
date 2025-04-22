package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.service.CommentService;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.model.User;
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

@RestController
@RequestMapping("/api/blog/comments")
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;

    @Autowired
    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    /**
     * 댓글 작성
     */
    @PostMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<CommentResponseDTO>> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        CommentResponseDTO commentResponseDTO = commentService.createComment(postId, requestDTO, currentUser);
        return new ResponseEntity<>(
                ApiResponse.success("댓글이 성공적으로 작성되었습니다.", commentResponseDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 댓글 수정
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<ApiResponse<CommentResponseDTO>> updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody CommentRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        CommentResponseDTO commentResponseDTO = commentService.updateComment(commentId, requestDTO, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("댓글이 성공적으로 수정되었습니다.", commentResponseDTO)
        );
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal User currentUser) {

        commentService.deleteComment(commentId, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("댓글이 성공적으로 삭제되었습니다.", null)
        );
    }

    /**
     * 게시글별 댓글 목록 조회
     */
    @GetMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<Page<CommentResponseDTO>>> getCommentsByPostId(
            @PathVariable Long postId,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable) {

        Page<CommentResponseDTO> comments = commentService.getCommentsByPostId(postId, pageable);
        return ResponseEntity.ok(
                ApiResponse.success(comments)
        );
    }

    /**
     * 사용자별 댓글 목록 조회
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Page<CommentResponseDTO>>> getCommentsByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        UserResponseDTO user = userService.getUserInfoById(userId);
        Page<CommentResponseDTO> comments = commentService.getCommentsByUser(user, pageable);

        return ResponseEntity.ok(
                ApiResponse.success(comments)
        );
    }

    /**
     * 댓글 상세 조회
     */
    @GetMapping("/{commentId}")
    public ResponseEntity<ApiResponse<CommentResponseDTO>> getCommentById(
            @PathVariable Long commentId) {

        CommentResponseDTO commentResponseDTO = commentService.getCommentById(commentId);
        return ResponseEntity.ok(
                ApiResponse.success(commentResponseDTO)
        );
    }
}