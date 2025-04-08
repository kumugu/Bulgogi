package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.PostCreateRequestDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.PostUpdateRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface PostService {

    
     // 새 게시글 생성
    PostResponseDTO createPost(PostCreateRequestDTO requestDTO, User currentUser);

    
     // 게시글 수정
    PostResponseDTO updatePost(Long postId, PostUpdateRequestDTO requestDTO, User currentUser);

    
     // 게시글 삭제
    void deletePost(Long postId, User currentUser);

    
     // 게시글 상세 조회
    PostResponseDTO getPostById(Long postId);

    
     // 게시글 내용만 조회
    String getPostContent(Long postId);

    
     // 필터 옵션에 따른 게시글 목록 조회
    Page<PostResponseDTO> getPosts(Long topicId, Long folderCategoryId, Set<Long> tagIds, Long authorId, String sortBy, Pageable pageable);

    
     // 게시글 발행 상태 변경
    PostResponseDTO updatePublishStatus(Long postId, boolean published, User currentUser);

    
     // 게시글 조회수 증가
    void incrementViewCount(Long postId);

    
     // 게시글 현재 조회수 조회
    Long getViewCount(Long postId);

    
     // 특정 사용자의 게시글 목록 조회
    Page<PostResponseDTO> getUserPosts(UserResponseDTO user, Pageable pageable);

    
     // 게시글에 이미지 추가
    PostResponseDTO addImagesToPost(Long postId, PostImageRequestDTO requestDTO, User currentUser);
}