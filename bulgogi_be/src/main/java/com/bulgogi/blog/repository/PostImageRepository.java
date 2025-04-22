package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Long> {

    // 게시글별 이미지 목록 조회
    List<PostImage> findByPost(Post post);

    // 이미지 URL로 조회
    Optional<PostImage> findByImageUrl(String imageUrl);

    // 게시글별 이미지 수 카운트
    long countByPost(Post post);

    // 게시글 ID로 이미지 목록 조회
    List<PostImage> findByPostId(Long postId);

    // 게시글의 이미지 삭제
    void deleteByPost(Post post);
}
