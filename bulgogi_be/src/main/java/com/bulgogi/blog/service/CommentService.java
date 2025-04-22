package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    // 댓글 작성
    CommentResponseDTO createComment(Long postId, CommentRequestDTO requestDTO, User currentUser);

    // 댓글 수정
    CommentResponseDTO updateComment(Long commentId, CommentRequestDTO requestDTO, User currentUser);

    // 댓글 삭제
    void deleteComment(Long commentId, User currentUser);

    // 게시글 댓글 목록 조회
    Page<CommentResponseDTO> getCommentsByPostId(Long postId, Pageable pageable);

    // 사용자 댓글 목록 조회
    Page<CommentResponseDTO> getCommentsByUser(UserResponseDTO user, Pageable pageable);

    // 댓글 상세 조회
    CommentResponseDTO getCommentById(Long commentId);
}
