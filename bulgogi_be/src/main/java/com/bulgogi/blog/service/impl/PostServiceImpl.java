package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.exception.ResourceNotFoundException;
import com.bulgogi.blog.model.*;
import com.bulgogi.blog.repository.*;
import com.bulgogi.blog.service.PostService;
import com.bulgogi.user.exception.UnauthorizedException;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.View;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostContentRepository postContentRepository;
    private final TopicRepository topicRepository;
    private final FolderCategoryRepository folderCategoryRepository;
    private final TagRepository tagRepository;
    private final PostImageRepository postImageRepository;
    private final PostViewCountRepository postViewCountRepository;
    private final View view;

    public PostServiceImpl(
            PostRepository postRepository,
            PostContentRepository postContentRepository,
            TopicRepository topicRepository,
            FolderCategoryRepository folderCategoryRepository,
            TagRepository tagRepository,
            PostImageRepository postImageRepository,
            PostViewCountRepository postViewCountRepository, View view) {
        this.postRepository = postRepository;
        this.postContentRepository = postContentRepository;
        this.topicRepository = topicRepository;
        this.folderCategoryRepository = folderCategoryRepository;
        this.tagRepository = tagRepository;
        this.postImageRepository = postImageRepository;
        this.postViewCountRepository = postViewCountRepository;
        this.view = view;
    }

    // 게시글 생성
    @Override
    @Transactional
    public Post createPost(String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds, List<String> imageUrls, User currentUser) {
        // 토픽 조회
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        // 폴더 카테고리 조회
        FolderCategory folderCategory = null;
        if (folderCategoryId != null) {
            folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + folderCategoryId));

            // 폴더 소유자 확인
            if (!folderCategory.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedException("You don't have permission to use this folder");
            }
        }

        // 태그 조회
        Set<Tag> tags = Collections.emptySet();
        if (tags != null && !tagIds.isEmpty()) {
            tags = new HashSet<>(tagRepository.findByIdIn(tagIds));
        }

        // 게시글 생성
        Post post = new Post();
        post.setTitle(title);
        post.setUser(currentUser);
        post.setTopic(topic);
        post.setFolderCategory(folderCategory);
        post.setTags(tags);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setPublished(false);
        post.setViews(0L);

        Post savedPost = postRepository.save(post);

        // 게시글 내용 저장
        PostContent postContent = new PostContent();
        postContent.setPost(savedPost);
        postContent.setContent(content);
        postContentRepository.save(postContent);

        // 이미지 저장
        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (String imageUrl : imageUrls) {
                PostImage postImage = new PostImage();
                postImage.setPost(savedPost);
                postImage.setImageUrl(imageUrl);
                postImage.setUploadedAt(LocalDateTime.now());
                postImageRepository.save(postImage);
            }
        }

        return savedPost;
    }

    // 게시글 수정
    @Override
    @Transactional
    public Post updatePost(Long postId, String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds, User currentUser) {
        // 게시글 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Yout don't hanve permission to update this post");
        }

        // 토픽 업데이트
        if (topicId != null) {
            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));
            post.setTopic(topic);
        }

        // 폴더 카테고리 업데이트
        if (folderCategoryId != null) {
            FolderCategory folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + folderCategoryId));

            // 폴더 소유자 확인
            if (!folderCategory.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedException("You don't have permission to use this folder");
            }

            post.setFolderCategory(folderCategory);
        }

        // 태그 업데이트
        if (tagIds != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findByIdIn(tagIds));
            post.setTags(tags);
        }

        // 제목 업데이트
        if (title != null) {
            post.setTitle(title);
        }

        // 내용 업데이트
        if (content != null) {
            PostContent postContent = postContentRepository.findByPost(post)
                    .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));
            postContent.setContent(content);
            postContentRepository.save(postContent);
        }

        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }


    // 게시글 삭제
    @Override
    @Transactional
    public void deletePost(Long postId, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인(토큰으로도 가능한지 체크)
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this post");
        }

        // 연관 데이터 삭제
        postImageRepository.deleteByPost(post);
        postContentRepository.findByPost(post).ifPresent(postContentRepository::delete);

        // Redis 조회수 데이터 삭제
        postViewCountRepository.deleteViewCount(postId);

        // 게시글 삭제
        postRepository.delete(post);
    }


    // 게시글 조회
    @Override
    @Transactional(readOnly = true)
    public Post getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 게시글 내용과 이미지 함께 조회
        PostContent content = postContentRepository.findByPost(post)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));

        // Redis 조회수 반영
        Long viewCount = postViewCountRepository.getViewCount(postId);
        if (viewCount > 0) {
            post.setViews(viewCount);
        }

        return post;
    }


    // 게시글 내용 조회
    @Override
    @Transactional(readOnly = true)
    public String getPostContent(Long postId) {
        PostContent content = postContentRepository.findByPostId(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));
        return content.getContent();
    }

    // 게시글 목록 조회 (필터링, 정렬 포함)
    @Override
    @Transactional(readOnly = true)
    public Page<Post> getPosts(Long topicId, Long folderCategoryId, Set<Long> tagIds, Long authorId, String sortBy, Pageable pageable) {
        // TODO: 복잡한 필터링 로직 추가 예정
        // 현재는 간단한 필터링 조건만 적용

        if (topicId != null && folderCategoryId != null) {
            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

            FolderCategory folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + folderCategoryId));

            return postRepository.findByTopicAndFolderCategory(topic, folderCategory, pageable);
        } else if (topicId != null) {
            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

            return postRepository.findByTopic(topic, pageable);
        } else if (folderCategoryId != null) {
            FolderCategory folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + folderCategoryId));

            return postRepository.findByFolderCategory(folderCategory, pageable);
        } else if (tagIds != null && !tagIds.isEmpty()) {
            return postRepository.findByTagIds(tagIds, pageable);
        } else if ("popular".equals(sortBy)) {
            return postRepository.findByPublishedTrueOrderByViewsDesc(pageable);
        } else {
            return postRepository.findByPublishedTrue(pageable);
        }
    }


    // 게시글 공개 상태 변경
    @Override
    @Transactional
    public Post updatePublishStatus(Long postId, boolean published, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this post");
        }

        post.setPublished(published);
        return postRepository.save(post);
    }


    // 게시글 조회수 증가
    @Override
    @Transactional
    public void incrementViewCount(Long postId) {
        // Redis에 조회수 증가
        postViewCountRepository.incrementViewCount(postId);
    }


    // 게시글 조회수 조회
    @Override
    @Transactional(readOnly = true)
    public Long getViewCount(Long postId) {
        // Redis에서 조회수 조회
        return postViewCountRepository.getViewCount(postId);
    }


    // 특정 사용자 게시글 목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Post> getUserPosts(User user, Pageable pageable) {
        return postRepository.findByUser(user, pageable);
    }


    // 게시글에 이미지 추가
    @Override
    @Transactional
    public Post addImagesToPost(Long postId, List<String> imageUrls, boolean replace, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인: 현재 사용자가 작성자가 아닐 경우 예외 발생
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this post");
        }

        // 기존 이미지 삭제 (replace가 true일 경우)
        if (replace) {
            postImageRepository.deleteByPost(post);
        }

        // 새 이미지 추가
        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (String imageUrl : imageUrls) {
                PostImage postImage = new PostImage();
                postImage.setPost(post);
                postImage.setImageUrl(imageUrl);
                postImage.setUploadedAt(LocalDateTime.now());
                postImageRepository.save(postImage);
            }
        }

        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
}

























