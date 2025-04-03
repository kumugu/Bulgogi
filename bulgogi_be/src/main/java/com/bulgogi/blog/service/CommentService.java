package com.bulgogi.blog.service;

import com.bulgogi.blog.model.Comment;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    /**
     * 댓글 작성
     */
    Comment createComment(Long postId, String content, User currentUser);

    /**
     * 댓글 수정
     */
    Comment updateComment(Long commentId, String content, User currentUser);

    /**
     * 댓글 삭제
     */
    void deleteComment(Long commentId, User currentUser);

    /**
     * 게시글 댓글 목록 조회
     */
    Page<Comment> getCommentsByPostId(Long postId, Pageable pageable);

    /**
     * 사용자 댓글 목록 조회
     */
    Page<Comment> getCommentsByUser(User user, Pageable pageable);

    /**
     * 댓글 상세 조회
     */
    Comment getCommentById(Long commentId);
}
