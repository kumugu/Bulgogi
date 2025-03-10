package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.TagRequestDTO;
import com.bulgogi.blog.dto.TagResponseDTO;
import com.bulgogi.blog.model.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TagMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    // Entity -> DTO 변환
    public static TagResponseDTO toTagResponseDTO(Tag tag) {
        return modelMapper.map(tag, TagResponseDTO.class);
    }

    // DTO -> Entity 변환
    public static Tag toTag(TagRequestDTO tagRequestDTO) {
        return modelMapper.map(tagRequestDTO, Tag.class);
    }
}
