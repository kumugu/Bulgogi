package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.exception.ResourceNotFoundException;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.blog.repository.TagRepository;
import com.bulgogi.blog.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    // 태그 생성 메서드 (중복 태그 확인 후 존재하면 반환, 없으면 새로 생성)
    @Override
    @Transactional
    public Tag createTag(String name) {
        // 태그 중복 확인
        if (tagRepository.existsByName(name)) {
            return tagRepository.findByName(name).orElse(null);
        }

        Tag tag = new Tag();
        tag.setName(name);
        return tagRepository.save(tag);
    }


    // 사용자 입력(query)을 포함하는 태그 추천 검색
    @Override
    @Transactional(readOnly = true)
    public List<Tag> getSuggestions(String query) {
        return tagRepository.findByNameContaining(query);
    }


    // 모든 태그 조회 (페이징 지원)
    @Override
    @Transactional(readOnly = true)
    public Page<Tag> getAllTags(Pageable pageable) {
        return tagRepository.findAll(pageable);
    }


    // 인기 태그 조회 (조회된 태그 개수 제한)
    @Override
    @Transactional(readOnly = true)
    public List<Tag> getPopularTags(int limit) {
        return tagRepository.findPopularTags(PageRequest.of(0, limit)).getContent();
    }


    // 태그명으로 특정 태그 조회 (없으면 예외 발생)
    @Override
    @Transactional(readOnly = true)
    public Tag getTagByName(String name) {
        return tagRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with name: " + name));
    }


    // 태그 ID로 특정 태그 조회 (없으면 예외 발생)
    @Override
    @Transactional(readOnly = true)
    public Tag getTagById(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
    }


    // 여러 태그명을 받아 존재하는 태그는 조회하고, 존재하지 않는 태그는 생성
    @Override
    @Transactional
    public Set<Tag> getOrCreateTagsByNames(Set<String> tagNames) {
        Set<Tag> result = new HashSet<>();

        // 기존 태그 조회
        List<Tag> existingTags = tagRepository.findByNameIn(tagNames);
        result.addAll(existingTags);

        // 기존 태그명 확인
        Set<String> existingTagNames = existingTags.stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());

        // 없는 태그 생성
        for (String tagName : tagNames) {
            if (!existingTagNames.contains(tagName)) {
                Tag newTag = new Tag();
                newTag.setName(tagName);
                result.add(tagRepository.save(newTag));
            }
        }

        return Set.of();
    }
}
