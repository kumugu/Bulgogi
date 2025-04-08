package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.TopicDTO;
import com.bulgogi.blog.dto.TopicRequestDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.PostMapper;
import com.bulgogi.blog.mapper.TopicMapper;
import com.bulgogi.blog.model.Topic;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.repository.TopicRepository;
import com.bulgogi.blog.service.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final PostRepository postRepository;
    private final TopicMapper topicMapper;
    private final PostMapper postMapper;

    public TopicServiceImpl(TopicRepository topicRepository, PostRepository postRepository, TopicMapper topicMapper, PostMapper postMapper) {
        this.topicRepository = topicRepository;
        this.postRepository = postRepository;
        this.topicMapper = topicMapper;
        this.postMapper = postMapper;
    }


    // 토픽 생성
    @Override
    @Transactional
    public TopicDTO createTopic(TopicRequestDTO topicRequestDTO) {
        Topic topic = new Topic();
        topic.setName(topicRequestDTO.getName());
        topic.setDescription(topicRequestDTO.getDescription());
        
        if (topicRequestDTO.getDisplayOrder() != null) {
            topic.setDisplayOrder(topicRequestDTO.getDisplayOrder());
        } else {
            topic.setDisplayOrder(0);   // 기본값 설정
        }
        
        if (topicRequestDTO.isActive() != null) {
            topic.setActive(topicRequestDTO.isActive());
        } else {
            topic.setActive(true);  // 기본값 설정
        }
        
        Topic savedTopic = topicRepository.save(topic);
        return topicMapper.toDTO(savedTopic);
    }

    
    // 토픽 수정
    @Override
    @Transactional
    public TopicDTO updateTopic(Long topicId, TopicRequestDTO topicRequestDTO) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        topic.setName(Optional.ofNullable(topicRequestDTO.getName()).orElse(topic.getName()));
        topic.setDescription(Optional.ofNullable(topicRequestDTO.getDescription()).orElse(topic.getDescription()));
        topic.setDisplayOrder(Optional.ofNullable(topicRequestDTO.getDisplayOrder()).orElse(topic.getDisplayOrder()));
        topic.setActive(Optional.ofNullable(topicRequestDTO.isActive()).orElse(topic.isActive()));

        Topic updatedTopic = topicRepository.save(topic);
        return topicMapper.toDTO(updatedTopic);
    }


    // 토픽 삭제
    @Override
    @Transactional
    public void deleteTopic(Long topicId) {
        if (!topicRepository.existsById(topicId)) {
            throw new ResourceNotFoundException("Topic not found with id: " + topicId);
        }
        
        // 토픽에 연결된 게시글 확인 로직 필요할 수 있음
        topicRepository.deleteById(topicId);
    }
    
    
    // 모든 토픽 조회
    @Override
    @Transactional(readOnly = true)
    public List<TopicDTO> getAllTopics() {
        return topicRepository.findAll().stream()
                .map(topicMapper::toDTO)
                .collect(Collectors.toList());
    }

    
    // 활성화된 토픽만 조회
    @Override
    @Transactional(readOnly = true)
    public List<TopicDTO> isActiveTopics() {
        return topicRepository.findByActiveTrue().stream()
                .map(topicMapper::toDTO)
                .collect(Collectors.toList());
    }

    
    // 토픽별 게시글 조회
    @Override
    @Transactional(readOnly = true)
    public Page<PostResponseDTO> getPostsByTopic(Long topicId, Pageable pageable) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + topicId));

        return postRepository.findByTopic(topic, pageable)
                .map(postMapper::toDTO);
    }


    // 인기 토픽 조회
    @Override
    @Transactional(readOnly = true)
    public List<TopicDTO> getPopularTopics(int limit) {
        return topicRepository.findPopularTopics(Pageable.ofSize(limit)).stream()
                .map(topicMapper::toDTO)
                .collect(Collectors.toList());
    }


    // 토픽 상세 조회
    @Override
    @Transactional(readOnly = true)
    public TopicDTO getTopicById(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));
        return null;
    }
}