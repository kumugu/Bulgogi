package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.TagRequestDTO;
import com.bulgogi.blog.dto.TagResponseDTO;
import com.bulgogi.blog.mapper.TagMapper;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.blog.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    private final TagMapper tagMapper;
    private final TagRepository tagRepository;

    public TagService(TagMapper tagMapper, TagRepository tagRepository) {
        this.tagMapper = tagMapper;
        this.tagRepository = tagRepository;
    }

    /**
     * 태그 추가: 게시글에 태그를 추가할 수 있도록 처리.
     * 태그 조회: 태그를 조회할 수 있도록 처리.
     * 태그 삭제: 게시글에서 태그를 삭제할 수 있도록 처리.
     *
     *

     */

    // 태그 추가
    public TagResponseDTO createTag(TagRequestDTO tagRequestDTO) {
        Tag tag = tagMapper.toTag(tagRequestDTO);
        tag = tagRepository.save(tag);
        return tagMapper.toTagResponseDTO(tag);
    }

    // 태그 조회
    public TagResponseDTO getTagById(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("태그를 찾을 수 없습니다."));
        return tagMapper.toTagResponseDTO(tag);
    }

    // 태그 삭제
    public void deleteTagById(Long tagId) {
        tagRepository.deleteById(tagId);
    }
}
