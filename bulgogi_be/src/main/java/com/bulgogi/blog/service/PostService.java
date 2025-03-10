package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.PostRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.exception.CategoryNotFoundException;
import com.bulgogi.blog.mapper.PostMapper;
import com.bulgogi.blog.model.Category;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.blog.repository.CategoryRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.repository.TagRepository;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.service.UserService;
import jakarta.transaction.Transactional;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final UserService userService;
    private final PostRepository postRepository;
    private final CategoryService categoryService;
    private final TagService tagService;
    private final PostMapper postMapper;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    private static final org.slf4j.Logger logger = (org.slf4j.Logger) LoggerFactory.getLogger(PostService.class);

    @Autowired
    public PostService(UserService userService, PostRepository postRepository, CategoryService categoryService, TagService tagService, PostMapper postMapper, UserRepository userRepository, CategoryRepository categoryRepository, TagRepository tagRepository) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.categoryService = categoryService;
        this.tagService = tagService;
        this.postMapper = postMapper;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    /**
     * 게시글 작성: 사용자가 게시글을 작성할 수 있도록 처리.
     * 게시글 단건 조회: 사용자가 게시글을 조회할 수 있도록 처리.
     * 게시글 전체 조회: 사용자가 작성한 게시글 리스트를 조회할 수 있도록 처리.
     * 게시글 수정: 기존 게시글을 수정할 수 있도록 처리.
     * 게시글 삭제: 사용자가 게시글을 삭제할 수 있도록 처리.
     */

    // 게시글 작성
    @Transactional
    public PostResponseDTO createPost(PostRequestDTO postRequestDTO, Long userId) {
        // 사용자 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        // 사용자명 가져오기
        String username = user.getUsername();
        logger.debug("게시글 작성을 위한 유저ID: {} 사용자이름: {}", userId, username);

        // 카테고리 조회
        Category category = categoryRepository.findById(postRequestDTO.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다."));

        // 태그 조회
        List<Tag> tags = tagRepository.findAllById(postRequestDTO.getTagIds());

        // 게시글 생성
        Post post = PostMapper.toCreatePost(postRequestDTO, category, tags, user);

        // 게시글 저장
        Post savedPost = postRepository.save(post);
        logger.info("저장된 게시글 ID: {}, 제목: {}", savedPost.getId(), savedPost.getTitle());

        // 게시글 응답 DTO 변환
        return postMapper.toPostResponseDTO(savedPost);
    }

    // 게시글 단건 조회
    public PostResponseDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return postMapper.toPostResponseDTO(post);
    }

    // 게시글 전체 조회
    public List<PostResponseDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(postMapper::toPostResponseDTO)
                .collect(Collectors.toList());
    }

    // 게시글 수정
    public PostResponseDTO updatePost(Long postId, PostRequestDTO postRequestDTO) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        post.setTitle(postRequestDTO.getTitle());
        post.setContent(postRequestDTO.getContent());

        post = postRepository.save(post);
        return postMapper.toPostResponseDTO(post);
    }

    // 게시글 삭제
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

}
