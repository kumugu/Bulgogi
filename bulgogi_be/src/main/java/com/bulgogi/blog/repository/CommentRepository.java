package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.model.Post;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 게시글별 댓글 목록 조회 (페이징)
    Page<Comment> findByPostId(Long postId, Pageable pageable);

    // 사용자 작성 댓글 목록 조회 (페이징 처리)
    Page<Comment> findByUserId(Long id, Pageable pageable);

    // 게시글별 댓글 수 카운트
    long countByPost(Post post);

    // 게시글에 작성된 가장 최근 댓글 목록 조회
    Page<Comment> findByPostOrderByCreatedAtDesc(Post post, Pageable pageable);

    // 특정 게시글의 특정 사용자 댓글 조회
    List<Comment> findByPostAndUser(Post post, User user);

}
