package com.bulgogi.blog.controller;

import com.bulgogi.blog.dto.PostRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.service.PostService;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public PostController(PostService postService, UserService userService, UserRepository userRepository) {
        this.postService = postService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * 게시글 작성: 사용자가 게시글을 작성할 수 있도록 처리.
     * 게시글 단건 조회: 사용자가 게시글을 조회할 수 있도록 처리.
     * 게시글 전체 조회: 사용자가 작성한 게시글 리스트를 조회할 수 있도록 처리.
     * 게시글 수정: 기존 게시글을 수정할 수 있도록 처리.
     * 게시글 삭제: 사용자가 게시글을 삭제할 수 있도록 처리.
     *
     * 16:24 2025-03-10
     *
     */

    // 게시글 작성
    @PostMapping("/{userId}")
    public ResponseEntity<PostResponseDTO> createPost(
            @RequestBody PostRequestDTO postRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        // UserDetails가 null인지 확인
        if (userDetails == null) {
            throw new RuntimeException("UserDetails가 null입니다. 인증이 제대로 이루어졌는지 확인하세요.");
        }

        // UserDetails에서 username 가져오기
        String username = userDetails.getUsername();
        System.out.println("현재 인증된 사용자 이름: " + username);

        // username이 null이거나 빈 문자열인지 확인
        if (username == null || username.isEmpty()) {
            throw new RuntimeException("userId 변환 오류: userDetails.getUsername() 값이 없습니다.");
        }

        try {
            // username을 통해 사용자 정보 조회
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다: " + username));

            // 게시글 생성
            PostResponseDTO postResponseDTO = postService.createPost(postRequestDTO, user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(postResponseDTO);
        } catch (Exception e) {
            throw new RuntimeException("사용자 ID 또는 게시글 작성에 문제가 발생했습니다: " + e.getMessage());
        }
    }


    // 게시글 단건 조회
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDTO> getById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    // 게시글 전체 조회
    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 게시글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long postId, @RequestBody PostRequestDTO postRequestDTO) {
        return ResponseEntity.ok(postService.updatePost(postId, postRequestDTO));
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<PostResponseDTO> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}


