package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.TagDTO;
import com.bulgogi.blog.model.Tag;
import org.springframework.stereotype.Component;

@Component
public class TagMapper {

    public TagDTO toDTO(Tag tag) {
        return new TagDTO(tag.getId(), tag.getName());
    }

    public Tag toEntity(TagDTO tagDTO) {
        return new Tag(tagDTO.getName());
    }
}
