package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.TopicDTO;
import com.bulgogi.blog.dto.TopicRequestDTO;
import com.bulgogi.blog.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog/topics")
public class TopicController {

    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    /**
     * 토픽 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<TopicDTO>> createTopic(
            @Valid @RequestBody TopicRequestDTO topicRequestDTO) {

        TopicDTO topicDTO = topicService.createTopic(topicRequestDTO);
        return new ResponseEntity<>(
                ApiResponse.success("토픽이 성공적으로 생성되었습니다.", topicDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 토픽 수정
     */
    @PutMapping("/{topicId}")
    public ResponseEntity<ApiResponse<TopicDTO>> updateTopic(
            @PathVariable Long topicId,
            @Valid @RequestBody TopicRequestDTO topicRequestDTO) {

        TopicDTO topicDTO = topicService.updateTopic(topicId, topicRequestDTO);
        return ResponseEntity.ok(
                ApiResponse.success("토픽이 성공적으로 수정되었습니다.", topicDTO)
        );
    }

    /**
     * 토픽 삭제
     */
    @DeleteMapping("/{topicId}")
    public ResponseEntity<ApiResponse<Void>> deleteTopic(
            @PathVariable Long topicId) {

        topicService.deleteTopic(topicId);
        return ResponseEntity.ok(
                ApiResponse.success("토픽이 성공적으로 삭제되었습니다.", null)
        );
    }

    /**
     * 모든 토픽 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<TopicDTO>>> getAllTopics() {
        List<TopicDTO> topics = topicService.getAllTopics();
        return ResponseEntity.ok(
                ApiResponse.success(topics)
        );
    }

    /**
     * 활성화된 토픽만 조회
     */
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<TopicDTO>>> getActiveTopics() {
        List<TopicDTO> activeTopics = topicService.isActiveTopics();
        return ResponseEntity.ok(
                ApiResponse.success(activeTopics)
        );
    }

    /**
     * 토픽별 게시글 조회
     */
    @GetMapping("/{topicId}/posts")
    public ResponseEntity<ApiResponse<Page<PostResponseDTO>>> getPostsByTopic(
            @PathVariable Long topicId,
            @PageableDefault(size = 10) Pageable pageable) {

        Page<PostResponseDTO> posts = topicService.getPostsByTopic(topicId, pageable);
        return ResponseEntity.ok(
                ApiResponse.success(posts)
        );
    }

    /**
     * 인기 토픽 조회
     */
    @GetMapping("/popular")
    public ResponseEntity<ApiResponse<List<TopicDTO>>> getPopularTopics(
            @RequestParam(defaultValue = "5") int limit) {

        List<TopicDTO> popularTopics = topicService.getPopularTopics(limit);
        return ResponseEntity.ok(
                ApiResponse.success(popularTopics)
        );
    }

    /**
     * 토픽 상세 조회
     */
    @GetMapping("/{topicId}")
    public ResponseEntity<ApiResponse<TopicDTO>> getTopicById(
            @PathVariable Long topicId) {

        TopicDTO topicDTO = topicService.getTopicById(topicId);
        return ResponseEntity.ok(
                ApiResponse.success(topicDTO)
        );
    }
}