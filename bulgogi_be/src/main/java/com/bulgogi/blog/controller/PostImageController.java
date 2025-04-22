package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.PostImageDTO;
import com.bulgogi.blog.dto.PostImageRequestDTO;
import com.bulgogi.blog.service.PostImageService;
import com.bulgogi.user.model.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/images-upload")
public class PostImageController {

    private final PostImageService postImageService;

    @Autowired
    public PostImageController(PostImageService postImageService) {
        this.postImageService = postImageService;
    }

    /**
     * 게시글에 이미지 추가
     */
    @PostMapping
    public ResponseEntity<ApiResponse<List<PostImageDTO>>> addImagesToPost(
            @PathVariable Long postId,
            @Valid @RequestBody PostImageRequestDTO imageRequestDTO) {

        List<PostImageDTO> images = postImageService.addImagesToPost(postId, imageRequestDTO);
        return new ResponseEntity<>(
                ApiResponse.success("이미지가 게시글에 성공적으로 추가되었습니다.", images),
                HttpStatus.CREATED
        );
    }

    /**
     * 게시글의 이미지 목록 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostImageDTO>>> getImagesByPostId(
            @PathVariable Long postId) {

        List<PostImageDTO> images = postImageService.getImagesByPostId(postId);
        return ResponseEntity.ok(
                ApiResponse.success(images)
        );
    }

    /**
     * 이미지 URL 존재 여부 확인
     */
    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Boolean>> checkImageUrlExists(
            @RequestParam String imageUrl) {

        boolean exists = postImageService.existsByImageUrl(imageUrl);
        return ResponseEntity.ok(
                ApiResponse.success(exists)
        );
    }

    /**
     * 특정 이미지 URL로 이미지 조회
     */
    @GetMapping("/url")
    public ResponseEntity<ApiResponse<PostImageDTO>> getImageByUrl(
            @RequestParam String imageUrl) {

        return postImageService.getImageByUrl(imageUrl)
                .map(image -> ResponseEntity.ok(ApiResponse.success(image)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 이미지 삭제
     */
    @DeleteMapping("/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long postId,
            @PathVariable Long imageId,
            @AuthenticationPrincipal User currentUser) {

        postImageService.deleteImage(imageId);
        return ResponseEntity.ok(
                ApiResponse.success("이미지가 성공적으로 삭제되었습니다.", null)
        );
    }

    /**
     * 게시글의 모든 이미지 삭제
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllImagesByPostId(
            @PathVariable Long postId,
            @AuthenticationPrincipal User currentUser) {

        postImageService.deleteAllImagesByPostId(postId);
        return ResponseEntity.ok(
                ApiResponse.success("게시글의 모든 이미지가 성공적으로 삭제되었습니다.", null)
        );
    }
}