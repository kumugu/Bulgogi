package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Comment;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 특정 게시글의 댓글 목록 조회 (페이징 적용)
    Page<Comment> findByPostId(Long postId, Pageable pageable);

    // 특정 사용자가 작성한 댓글 목록 조회 (페이징 적용)
    Page<Comment> findByUser(User user, Pageable pageable);

    // 특정 게시글의 댓글 수 조회
    long countByPostId(Long postId);

    // 특정 사용자의 특정 댓글 조회 (소유권 확인 등에 사용)
    Optional<Comment> findByIdAndUser(Long commentId, User user);

    // 특정 게시글에 최근 작성된 댓글 N개 조회
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.createdAt DESC")
    List<Comment> findRecentCommentsByPostId(@Param("postId") Long postId, Pageable pageable);

    // 특정 게시글의 모든 댓글 삭제 (게시글 삭제 시 함께 사용)
    void deleteByPostId(Long postId);
}