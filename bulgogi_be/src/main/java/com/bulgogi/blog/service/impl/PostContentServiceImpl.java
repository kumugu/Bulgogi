package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.PostContentDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.PostContentMapper;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.PostContent;
import com.bulgogi.blog.repository.PostContentRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.service.PostContentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostContentServiceImpl implements PostContentService {

    private final PostContentRepository postContentRepository;
    private final PostRepository postRepository;
    private final PostContentMapper postContentMapper;

    public PostContentServiceImpl(PostContentRepository postContentRepository, PostRepository postRepository, PostContentMapper postContentMapper) {
        this.postContentRepository = postContentRepository;
        this.postRepository = postRepository;
        this.postContentMapper = postContentMapper;
    }

    // 게시글 내용 저장
    @Override
    @Transactional
    public PostContentDTO savePostContent(PostContentDTO postContentDTO, Long postId) {
        // 게시글 ID로 게시글을 조회, 없으면 예외 발생
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // DTO를 Entity로 변환 후 저장
        PostContent postContent = postContentMapper.toEntity(postContentDTO);
        postContent.setPost(post);
        postContent.setCreatedAt(LocalDateTime.now());

        PostContent savedPostContent = postContentRepository.save(postContent);
        return postContentMapper.toDTO(savedPostContent);
    }


    // 게시글 ID로 내용 조회
    @Override
    @Transactional(readOnly = true)
    public Optional<PostContentDTO> getPostContentByPostId(Long postId) {
        return postContentRepository.findByPostId(postId)
                .map(postContentMapper::toDTO);
    }


    // 게시글 객체로 내용 조회
    @Override
    @Transactional(readOnly = true)
    public Optional<PostContentDTO> getPostContentByPost(Post post) {
        return postContentRepository.findByPost(post)
                .map(postContentMapper::toDTO);
    }


    // 게시글 내용 업데이트
    @Override
    @Transactional
    public PostContentDTO updatePostContent(Long postId, String newContent) {
        PostContent postContent = postContentRepository.findByPostId(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));

        postContent.updateContent(newContent);
        PostContent updatedPostContent = postContentRepository.save(postContent);
        return postContentMapper.toDTO(updatedPostContent);
    }


    // 게시글 내용 삭제
    @Override
    @Transactional
    public void deletePostContent(Long postId) {
        PostContent postContent = postContentRepository.findByPostId(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post content not found for post id: " + postId));

        postContentRepository.delete(postContent);
    }
}
