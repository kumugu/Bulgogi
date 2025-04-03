package com.bulgogi.blog.service;

import com.bulgogi.blog.model.Post;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface PostService {

    /**
     * 새 게시글 생성
     */
    Post createPost(String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds, List<String> imageUrls, User currentUser);

    /**
     * 게시글 수정
     */
    Post updatePost(Long postId, String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds, User currentUser);

    /**
     * 게시글 삭제
     */
    void deletePost(Long postId, User currentUser);

    /**
     * 게시글 상세 조회
     */
    Post getPostById(Long postId);

    /**
     * 게시글 내용만 조회
     */
    String getPostContent(Long postId);

    /**
     * 필터 옵션에 따른 게시글 목록 조회
     */
    Page<Post> getPosts(Long topicId, Long folderCategoryId, Set<Long> tagIds, Long authorId, String sortBy, Pageable pageable);

    /**
     * 게시글 발행 상태 변경
     */
    Post updatePublishStatus(Long postId, boolean published, User currentUser);

    /**
     * 게시글 조회수 증가
     */
    void incrementViewCount(Long postId);

    /**
     * 게시글 현재 조회수 조회
     */
    Long getViewCount(Long postId);

    /**
     * 특정 사용자의 게시글 목록 조회
     */
    Page<Post> getUserPosts(User user, Pageable pageable);

    /**
     * 게시글에 이미지 추가
     */
    Post addImagesToPost(Long postId, List<String> imageUrls, boolean replace, User currentUser);
}