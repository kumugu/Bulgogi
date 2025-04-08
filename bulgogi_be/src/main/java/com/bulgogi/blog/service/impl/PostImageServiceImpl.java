package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.PostImageDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.PostImageMapper;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.PostImage;
import com.bulgogi.blog.repository.PostImageRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.service.PostImageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostImageServiceImpl implements PostImageService {

    private final PostImageRepository postImageRepository;
    private final PostRepository postRepository;
    private final PostImageMapper postImageMapper;

    public PostImageServiceImpl(PostImageRepository postImageRepository, PostRepository postRepository, PostImageMapper postImageMapper) {
        this.postImageRepository = postImageRepository;
        this.postRepository = postRepository;
        this.postImageMapper = postImageMapper;
    }


    // 게시글에 이미지 추가
    @Override
    @Transactional
    public List<PostImageDTO> addImagesToPost(Long postId, PostImageRequestDTO imageRequestDTO) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // 교체 옵션이 true면 기존 이미지 삭제
        if (imageRequestDTO.isReplace()) {
            postImageRepository.deleteByPost(post);
        }

        List<PostImage> savedImages = new ArrayList<>();

        // 새 이미지 추가
        for (String imageUrl : imageRequestDTO.getImageUrls()) {
            // 이미 존재하는 URL인지 확인
            if (!existsByImageUrl(imageUrl)) {
                PostImage postImage = new PostImage();
                postImage.setPost(post);
                postImage.setImageUrl(imageUrl);

                savedImages.add(postImageRepository.save(postImage));
            }
        }

        return savedImages.stream()
                .map(postImageMapper::toDTO)
                .collect(Collectors.toList());
    }


    // 게시글의 이미지 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<PostImageDTO> getImagesByPostId(Long postId) {
        return postImageRepository.findByPostId(postId).stream()
                .map(postImageMapper::toDTO)
                .collect(Collectors.toList());
    }


    // Post 객체로 이미지 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<PostImageDTO> getImagesByPost(Post post) {
        return postImageRepository.findByPost(post).stream()
                .map(postImageMapper::toDTO)
                .collect(Collectors.toList());
    }


    // 이미지 URL로 이미지 조회
    @Override
    @Transactional(readOnly = true)
    public Optional<PostImageDTO> getImageByUrl(String imageUrl) {
        return postImageRepository.findByImageUrl(imageUrl)
                .map(postImageMapper::toDTO);
    }


    // 게시글의 이미지 수 조회
    @Override
    @Transactional(readOnly = true)
    public long countImagesByPost(Post post) {
        return postImageRepository.countByPost(post);
    }


    // 이미지 삭제
    @Override
    @Transactional
    public void deleteImage(Long imageId) {
        if (postImageRepository.existsById(imageId)) {
            postImageRepository.deleteById(imageId);
        } else {
            throw new ResourceNotFoundException("Image not found with id: " + imageId);
        }
    }


    // 게시글의 모든 이미지 삭제
    @Override
    @Transactional
    public void deleteAllImagesByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        postImageRepository.deleteByPost(post);
    }


    // 게시글의 모든 이미지 삭제 (Post 객체 사용)
    @Override
    @Transactional
    public void deleteAllImagesByPost(Post post) {
        postImageRepository.deleteByPost(post);
    }


    // 특정 이미지 URL 존재 여부 확인
    @Override
    @Transactional(readOnly = true)
    public boolean existsByImageUrl(String imageUrl) {
        return postImageRepository.findByImageUrl(imageUrl).isPresent();
    }
}

