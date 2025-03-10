package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.CategoryRequestDTO;
import com.bulgogi.blog.dto.PostRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.model.Category;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.user.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    // Entity -> DTO 변환
    public PostResponseDTO toPostResponseDTO(Post post) {
        return modelMapper.map(post, PostResponseDTO.class);
    }

    // DTO -> Entity 변환
    public static Post toPost(PostRequestDTO postRequestDTO) {
        return modelMapper.map(postRequestDTO, Post.class);
    }

    // DTO -> Entity 변환(create)
    public static Post toCreatePost(PostRequestDTO postRequestDTO, Category category, List<Tag> tags, User user) {
        return modelMapper.map(postRequestDTO, Post.class);
    }
}