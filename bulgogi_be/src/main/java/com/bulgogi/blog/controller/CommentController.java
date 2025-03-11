package com.bulgogi.blog.controller;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.service.CommentService;
import com.bulgogi.blog.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    /**
     * 댓글 작성: 게시글에 댓글을 작성할 수 있도록 처리.
     * 댓글 단건 조회: 게시글의 댓글을 조회할 수 있도록 처리.
     * 댓글 전체 조회: 게시글의 댓글을 전체 조회할 수 있도록 처리.
     * 댓글 수정: 댓글을 수정할 수 있도록 처리.
     * 댓글 삭제: 댓글을 삭제할 수 있도록 처리.
     */

    // 댓글 작성
    @PostMapping("/{postId}")
    public ResponseEntity<CommentResponseDTO> createComment(
            @PathVariable Long postId,
            @RequestBody CommentRequestDTO commentRequestDTO) {

            commentRequestDTO.setPostId(postId);
        return ResponseEntity.ok(commentService.createComment(commentRequestDTO));
    }

    // 댓글 단건 조회
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponseDTO> getCommentById(@PathVariable Long commentId) {
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    // 댓글 전체 조회
    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponseDTO> updateComment(@PathVariable Long commentId, @RequestBody CommentRequestDTO commentRequestDTO) {
        return ResponseEntity.ok(commentService.updateComment(commentId, commentRequestDTO));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommentResponseDTO> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
