package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.PostImageDTO;
import com.bulgogi.blog.model.PostImage;
import org.springframework.stereotype.Component;

@Component
public class PostImageMapper {

    public PostImageDTO toDTO(PostImage postImage) {
        return new PostImageDTO(postImage.getId(), postImage.getImageUrl());
    }

    public PostImage toEntity(PostImageDTO postImageDTO) {
        PostImage postImage = new PostImage();
        postImage.setImageUrl(postImageDTO.getImageUrl());
        return postImage;
    }
}
