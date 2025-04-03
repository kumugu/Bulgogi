package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.exception.ResourceNotFoundException;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.blog.model.Topic;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.repository.TopicRepository;
import com.bulgogi.blog.service.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final PostRepository postRepository;

    public TopicServiceImpl(TopicRepository topicRepository, PostRepository postRepository) {
        this.topicRepository = topicRepository;
        this.postRepository = postRepository;
    }

    // 새로운 토픽 생성 (중복 확인 후 저장)
    @Override
    @Transactional
    public Topic createTopic(String name, String description, Integer displayOrder) {
        // 토픽명 중복 확인: 이미 존재하는 경우 예외 발생
        if (topicRepository.existsByName(name)) {
            throw new IllegalArgumentException("Topic with name " + name + " already exists");
        }

        // 새로운 토픽 생성 및 저장
        Topic topic = new Topic();
        topic.setName(name);
        topic.setDescription(description);
        topic.setDisplayOrder(displayOrder);
        topic.setActive(true);

        return topicRepository.save(topic);
    }


    // 기존 토픽 정보 수정
    @Override
    @Transactional
    public Topic updateTopic(Long topicId, String name, String description, Integer displayOrder, Boolean active) {
        // ID로 토픽 조회 (없으면 예외 발생)
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        // 토픽명 변경 시 중복 확인
        if (name != null && !name.equals(topic.getName()) && topicRepository.existsByName(name)) {
            throw new IllegalArgumentException("Topic with name " + name + " already exists");
        }

        // 전달된 값이 있는 경우만 업데이트
        if (name != null) {
            topic.setName(name);
        }
        if (description != null) {
            topic.setDescription(description);
        }
        if (displayOrder != null) {
            topic.setDisplayOrder(displayOrder);
        }
        if (active != null) {
            topic.setActive(active);
        }

        return topicRepository.save(topic);
    }


    // 토픽 삭제 (연관된 게시글 처리 필요)
    @Override
    @Transactional
    public void deleteTopic(Long topicId) {
        // ID로 토픽 조회 (없으면 예외 발생)
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        // TODO: 연관된 게시글이 있을 경우 삭제를 막거나 특정 기본 토픽으로 변경 필요

        topicRepository.delete(topic);
    }


    // 모든 토픽 조회
    @Override
    @Transactional(readOnly = true)
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }


    // 활성화된 토픽만 조회
    @Override
    @Transactional(readOnly = true)
    public List<Topic> getActiveTopics() {
        return topicRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }


    // 특정 토픽의 게시글 목록 조회 (페이징 지원)
    @Override
    @Transactional(readOnly = true)
    public Page<Post> getPostsByTopic(Long topicId, Pageable pageable) {
        // 토픽 존재 여부 확인
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        // 해당 토픽에 속한 게시글 조회
        return postRepository.findByTopic(topic, pageable);
    }


    // 인기 있는 토픽 목록 조회 (조회된 개수 제한)
    @Override
    @Transactional(readOnly = true)
    public List<Topic> getPopularTopics(int limit) {
        return topicRepository.findPopularTopics(PageRequest.of(0, limit));
    }


    // 특정 ID로 토픽 조회 (없으면 예외 발생)
    @Override
    @Transactional(readOnly = true)
    public Topic getTopicById(Long topicId) {
        return topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));
    }
}
