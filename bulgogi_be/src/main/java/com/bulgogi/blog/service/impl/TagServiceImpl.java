package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.TagCreateRequestDTO;
import com.bulgogi.blog.dto.TagDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.TagMapper;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.blog.repository.TagRepository;
import com.bulgogi.blog.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService{

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    public TagServiceImpl(TagRepository tagRepository, TagMapper tagMapper) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
    }

    // 태그 생성
    @Override
    @Transactional
    public TagDTO createTag(TagCreateRequestDTO requestDTO) {
        Optional<Tag> existing = tagRepository.findByName(requestDTO.getName());
        if (existing.isPresent()) {
            return tagMapper.toDTO(existing.get());
        }

        Tag tag = new Tag();
        tag.setName(requestDTO.getName());
        Tag saved = tagRepository.save(tag);
        return tagMapper.toDTO(saved);
    }


    // 태그명 자동완성 제안
    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> getSuggestions(String query) {
        List<Tag> suggestions = tagRepository.findByNameContainingIgnoreCase(query);
        return suggestions.stream()
                .map(tagMapper::toDTO)
                .collect(Collectors.toList());
    }


    // 태그 목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<TagDTO> getAllTags(Pageable pageable) {
        Page<Tag> tagPage = tagRepository.findAll(pageable);
        return tagPage.map(tagMapper::toDTO);
    }


    // 인기 태그 조회
    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> getPopularTags(int limit) {
        return tagRepository.findPopularTags(Pageable.ofSize(limit)).stream()
                .map(tagMapper::toDTO)
                .collect(Collectors.toList());
    }


    // 태그명으로 태그 조회
    @Override
    @Transactional(readOnly = true)
    public TagDTO getTagByName(String tagName) {
        Tag tag = tagRepository.findByName(tagName)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + tagName));
        return tag != null ? tagMapper.toDTO(tag) : null;
    }


    // 태그 ID로 태그 조회
    @Override
    @Transactional(readOnly = true)
    public TagDTO getTagById(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: "+ tagId));
        return tag != null ? tagMapper.toDTO(tag) : null;
    }


    // 여러 태그명으로 태그 조회 또는 생성
    @Override
    @Transactional
    public Set<TagDTO> getOrCreateTagsByNames(Set<String> tagNames) {
        Set<TagDTO> tagDTOs = new HashSet<>();
        for (String name : tagNames) {
            Optional<Tag> existing = tagRepository.findByName(name);
            if (existing.isPresent()) {
                tagDTOs.add(tagMapper.toDTO(existing.get()));
            } else {
                Tag newTag = new Tag();
                newTag.setName(name);
                Tag saved = tagRepository.save(newTag);
                tagDTOs.add(tagMapper.toDTO(saved));
            }
        }
        return tagDTOs;
    }
}
