package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.PostContentDTO;
import com.bulgogi.blog.model.Post;

import java.util.Optional;

public interface PostContentService {

    // 게시글 내용 저장
    PostContentDTO savePostContent(PostContentDTO postContentDTO, Long postId);

    // 게시글 ID로 내용 조회
    Optional<PostContentDTO> getPostContentByPostId(Long postId);

    // 게시글 객체로 내용 조회
    Optional<PostContentDTO> getPostContentByPost(Post post);

    // 게시글 내용 업데이트
    PostContentDTO updatePostContent(Long postId, String newContent);

    // 게시글 내용 삭제
    void deletePostContent(Long postId);
}
