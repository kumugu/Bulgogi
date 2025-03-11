package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.CategoryRequestDTO;
import com.bulgogi.blog.dto.CategoryResponseDTO;
import com.bulgogi.blog.model.Category;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    // Entity -> DTO 변환
    public CategoryResponseDTO toCategoryResponseDTO(Category category) {
        return modelMapper.map(category,CategoryResponseDTO .class);
    }

    // DTO -> Entity 변환
    public static Category toCategory(CategoryRequestDTO categoryRequestDTO) {
        return modelMapper.map(categoryRequestDTO, Category.class);
    }
}
