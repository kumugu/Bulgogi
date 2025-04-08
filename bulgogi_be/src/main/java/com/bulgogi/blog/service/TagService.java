package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.TagCreateRequestDTO;
import com.bulgogi.blog.dto.TagDTO;
import com.bulgogi.blog.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface TagService {

    // 태그 생성
    TagDTO createTag(TagCreateRequestDTO requestDTO);

    // 태그명 자동완성 제안
    List<TagDTO> getSuggestions(String query);

    // 태그 목록 조회
    Page<TagDTO> getAllTags(Pageable pageable);

    // 인기 태그 조회
    List<TagDTO> getPopularTags(int limit);

    // 태그명으로 태그 조회
    TagDTO getTagByName(String name);

    // 태그 ID로 태그 조회
    TagDTO getTagById(Long id);

    // 여러 태그명으로 태그 조회 또는 생성
    Set<TagDTO> getOrCreateTagsByNames(Set<String> tagNames);
}