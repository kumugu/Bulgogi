package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.PostDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.TopicDTO;
import com.bulgogi.blog.dto.TopicRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TopicService {

    // 토픽 생성
    TopicDTO createTopic(TopicRequestDTO topicRequestDTO);

    // 토픽 수정
    TopicDTO updateTopic(Long topicId, TopicRequestDTO topicRequestDTO);

    // 토픽 삭제
    void deleteTopic(Long topicId);

    // 모든 토픽 조회
    List<TopicDTO> getAllTopics();

    // 활성화된 토픽만 조회
    List<TopicDTO> isActiveTopics();

    // 토픽별 게시글 조회
    Page<PostResponseDTO> getPostsByTopic(Long topicId, Pageable pageable);

    // 인기 토픽 조회
    List<TopicDTO> getPopularTopics(int limit);

    // 토픽 상세 조회
    TopicDTO getTopicById(Long topicId);
}