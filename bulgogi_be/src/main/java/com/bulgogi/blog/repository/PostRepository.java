package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Post;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 특정 사용자가 작성한 게시글 목록 (페이징 적용)
    Page<Post> findByUser(User user, Pageable pageable);

    // 카테고리별 게시글 조회 (페이징 적용)
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);

    // 태그별 게시글 조회 (페이징 적용)
    @Query("SELECT DISTINCT p FROM Post p JOIN p.tags t WHERE t.id = :tagId")
    Page<Post> findByTagId(@Param("tagId") Long tagId, Pageable pageable);

    // 제목 또는 내용에 특정 키워드가 포함된 게시글 검색 (페이징 적용)
    Page<Post> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);

    // 특정 사용자의 특정 게시글 조회 (소유권 확인 등에 사용)
    Optional<Post> findByIdAndUser(Long id, User user);

    // 조회수 기준 인기 게시글 조회
    Page<Post> findAllByOrderByViewsDesc(Pageable pageable);

    // 최신 게시글 조회
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // 조회수 증가 쿼리
    @Modifying
    @Query("UPDATE Post p SET p.views = p.views + 1 WHERE p.id = :postId")
    void incrementViews(@Param("posId") Long postId);

    // 특정 카테고리와 태그를 모두 만족하는 게시글 조회
    @Query("SELECT p FROM Post p JOIN p.tags t WHERE p.category.id = :categoryId AND t.id = :tagID")
    Page<Post> findByCategoryIdAndTagId(@Param("categoryId") Long categoryId, @Param("tagId") Long tagId, Pageable pageable);
}
