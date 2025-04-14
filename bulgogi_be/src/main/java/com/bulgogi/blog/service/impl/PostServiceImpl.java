package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.PostCreateRequestDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.PostUpdateRequestDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.PostMapper;
import com.bulgogi.blog.model.*;
import com.bulgogi.blog.repository.*;
import com.bulgogi.blog.service.PostService;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.common.exception.UnauthorizedException;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.View;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
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
    private final PostMapper postMapper;
    private final View view;
    private final UserRepository userRepository;

    public PostServiceImpl(PostRepository postRepository, PostContentRepository postContentRepository, TopicRepository topicRepository, FolderCategoryRepository folderCategoryRepository, TagRepository tagRepository, PostImageRepository postImageRepository, PostViewCountRepository postViewCountRepository, PostMapper postMapper, View view, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.postContentRepository = postContentRepository;
        this.topicRepository = topicRepository;
        this.folderCategoryRepository = folderCategoryRepository;
        this.tagRepository = tagRepository;
        this.postImageRepository = postImageRepository;
        this.postViewCountRepository = postViewCountRepository;
        this.postMapper = postMapper;
        this.view = view;
        this.userRepository = userRepository;
    }


    // 게시글 생성
    @Override
    @Transactional
    public PostResponseDTO createPost(PostCreateRequestDTO requestDTO, User currentUser) {
        // 토픽 조회
        Topic topic = topicRepository.findById(requestDTO.getTopicId())
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + requestDTO.getTopicId()));

        // 폴더 카테고리 조회
        FolderCategory folderCategory = null;
        if (requestDTO.getFolderCategoryId() != null) {
            folderCategory = folderCategoryRepository.findById(requestDTO.getFolderCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + requestDTO.getFolderCategoryId()));

            // 폴더 소유자 확인
            if (!folderCategory.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedException("You don't have permission to use this folder");
            }
        }

        // 태그 조회
        Set<Tag> tags = Collections.emptySet();
        if (requestDTO.getTagIds() != null && !requestDTO.getTagIds().isEmpty()) {
            tags = new HashSet<>(tagRepository.findByIdIn(requestDTO.getTagIds()));
        }

        // 게시글 생성
        Post post = new Post();
        post.setTitle(requestDTO.getTitle());
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
        postContent.setContent(requestDTO.getContent());
        postContent.setCreatedAt(LocalDateTime.now());
        postContentRepository.save(postContent);

        // 이미지 저장
        if (requestDTO.getImageUrls() != null && !requestDTO.getImageUrls().isEmpty()) {
            for (String imageUrls : requestDTO.getImageUrls()) {
                PostImage postImage = new PostImage();
                postImage.setPost(savedPost);
                postImage.setImageUrl(imageUrls);
                postImageRepository.save(postImage);
            }
        }

        return postMapper.toDTO(savedPost);
    }


    // 게시글 수정
    @Override
    @Transactional
    public PostResponseDTO updatePost(Long postId, PostUpdateRequestDTO requestDTO, User currentUser) {
        // 게시글 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this post");
        }

        // 토픽 업데이트
        if (requestDTO.getTopicId() != null) {
            Topic topic = topicRepository.findById(requestDTO.getTopicId())
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " +requestDTO.getTopicId()));
            post.setTopic(topic);
        }

        // 폴더 카테고리 업데이트
        if (requestDTO.getFolderCategoryId() != null) {
            FolderCategory folderCategory = folderCategoryRepository.findById(requestDTO.getFolderCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + requestDTO.getFolderCategoryId()));

            // 폴더 소유자 확인
            if (!folderCategory.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedException("You don't have permission to use this folder");
            }

            post.setFolderCategory(folderCategory);
        }

        // 태그 업데이트
        if (requestDTO.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findByIdIn(requestDTO.getTagIds()));
            post.setTags(tags);
        }

        // 제목 업데이트
        if (requestDTO.getTitle() != null) {
            post.setTitle(requestDTO.getTitle());
        }

        // 내용 업데이트
        if (requestDTO.getContent() != null) {
            PostContent postContent = postContentRepository.findByPost(post)
                    .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));
            postContent.setContent(requestDTO.getContent());
            postContentRepository.save(postContent);
        }

        post.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(post);

        return postMapper.toDTO(updatedPost);
    }


    // 게시글 삭제
    @Override
    @Transactional
    public void deletePost(Long postId, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인
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
    public PostResponseDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 게시글 내용과 이미지 함께 조회
        PostContent postContent = postContentRepository.findByPost(post)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));

        // Redis 조회수 반영
        Long viewCount = postViewCountRepository.getViewCount(postId);
        if (viewCount > 0) {
            post.setViews(viewCount);
        }

        return postMapper.toDTO(post);
    }


    // 게시글 내용 조회
    @Override
    @Transactional(readOnly = true)
    public String getPostContent(Long postId) {
        PostContent postContent = postContentRepository.findByPostId(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));
        return postContent.getContent();
    }


    // 게시글 목록 조회 (필터링, 정렬 포함)
    @Override
    @Transactional(readOnly = true)
    public Page<PostResponseDTO> getPosts(Long topicId, Long folderCategoryId, Set<Long> tagIds, Long authorId, String sortBy, Pageable pageable) {
        // TODO: 복잡한 필터링 로직 추가
        // 현재는 간단한 필터링 조건만 적용
        Page<Post> postPage;

        if (topicId != null && folderCategoryId != null) {
            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

            FolderCategory folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + folderCategoryId));

            postPage = postRepository.findByTopicAndFolderCategory(topic, folderCategory, pageable);
        } else if (topicId != null) {
            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

            postPage = postRepository.findByTopic(topic, pageable);
        } else if (folderCategoryId != null) {
            FolderCategory folderCategory = folderCategoryRepository.findById(folderCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder category not found with id: " + topicId));

            postPage = postRepository.findByFolderCategory(folderCategory, pageable);
        } else if (tagIds != null && !tagIds.isEmpty()) {
            postPage = postRepository.findByTagIds(tagIds, pageable);
        } else if ("popular".equals(sortBy)) {
            postPage = postRepository.findByPublishedTrueOrderByViewsDesc(pageable);
        } else {
            postPage = postRepository.findByPublishedTrue(pageable);
        }

        return postPage.map(postMapper::toDTO);
    }


    // 게시글 공개 상태 변경
    @Override
    @Transactional
    public PostResponseDTO updatePublishStatus(Long postId, boolean published, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this post");
        }

        post.setPublished(published);
        Post updatedPost = postRepository.save(post);

        return postMapper.toDTO(updatedPost);
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
    @Transactional
    public Long getViewCount(Long postId) {
        // Redis에서 조회수 조회
        return postViewCountRepository.getViewCount(postId);
    }


    // 특정 사용자 게시글 목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<PostResponseDTO> getUserPosts(UserResponseDTO userResponseDTO, Pageable pageable) {
        // UserResponseDTO에서 ID를 추출하여 User 엔티티를 조회
        User user = userRepository.findById(userResponseDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userResponseDTO.getId()));

        // 해당 사용자의 게시글 목록을 페이지네이션으로 조회
        Page<Post> postPage = postRepository.findByUser(user, pageable);

        // Post 엔티티를 PostResponseDTO로 변환하여 반환
        return postPage.map(postMapper::toDTO);
    }


    // 게시글에 이미지 추가
    @Override
    @Transactional
    public PostResponseDTO addImagesToPost(Long postId, PostImageRequestDTO requestDTO, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 권한 확인: 현재 사용자가 작성자가 아닐 경우 예외 발생
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this post");
        }

        // 기존 이미지 삭제 (replace가 true일 경우)
        if (requestDTO.isReplace()) {
            postImageRepository.deleteByPost(post);
        }

        // 새 이미지 추가
        if (requestDTO.getImageUrls() != null && !requestDTO.getImageUrls().isEmpty()) {
            for (String imageUrl : requestDTO.getImageUrls()) {
                PostImage postImage = new PostImage();
                postImage.setPost(post);
                postImage.setImageUrl(imageUrl);
                postImageRepository.save(postImage);
            }
        }

        post.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(post);

        return postMapper.toDTO(updatedPost);
    }
}