package com.bulgogi.blog.service;

import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TopicService {

    /**
     * 토픽 생성
     */
    Topic createTopic(String name, String description, Integer displayOrder);

    /**
     * 토픽 수정
     */
    Topic updateTopic(Long topicId, String name, String description, Integer displayOrder, Boolean active);

    /**
     * 토픽 삭제
     */
    void deleteTopic(Long topicId);

    /**
     * 모든 토픽 조회
     */
    List<Topic> getAllTopics();

    /**
     * 활성화된 토픽만 조회
     */
    List<Topic> getActiveTopics();

    /**
     * 토픽별 게시글 조회
     */
    Page<Post> getPostsByTopic(Long topicId, Pageable pageable);

    /**
     * 인기 토픽 조회
     */
    List<Topic> getPopularTopics(int limit);

    /**
     * 토픽 상세 조회
     */
    Topic getTopicById(Long topicId);
}