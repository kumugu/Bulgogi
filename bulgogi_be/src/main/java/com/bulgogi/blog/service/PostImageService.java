package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.PostImageDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.blog.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostImageService {

    // 게시글에 이미지 추가
    List<PostImageDTO> addImagesToPost(Long postId, PostImageRequestDTO imageRequestDTO);

    // 게시글의 이미지 목록 조회
    List<PostImageDTO> getImagesByPostId(Long postId);

    // Post 객체로 이미지 목록 조회
    List<PostImageDTO> getImagesByPost(Post post);

    // 이미지 URL로 이미지 조회
    Optional<PostImageDTO> getImageByUrl(String imageUrl);

    // 게시글의 이미지 수 조회
    long countImagesByPost(Post post);

    // 이미지 삭제
    void deleteImage(Long imageId);

    // 게시글의 모든 이미지 삭제
    void deleteAllImagesByPostId(Long postId);

    // 게시글의 모든 이미지 삭제 (Post 객체 사용)
    void deleteAllImagesByPost(Post post);

    // 특정 이미지 URL 존재 여부 확인
    boolean existsByImageUrl(String imageUrl);
}