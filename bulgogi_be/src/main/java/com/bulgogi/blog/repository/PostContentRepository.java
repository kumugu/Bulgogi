package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.PostContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostContentRepository extends JpaRepository<PostContent, Long> {

    // 게시글 ID로 게시글 내용 조회
    Optional<PostContent> findByPostId(Long postId);

    // 게시글로 게시글 내용 조회
    Optional<PostContent> findByPost(Post post);
}
