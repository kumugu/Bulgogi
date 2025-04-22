package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.PostContentDTO;
import com.bulgogi.blog.model.PostContent;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

@Component
public class PostContentMapper {

    public PostContentDTO toDTO(PostContent postContent) {
        return new PostContentDTO(
                postContent.getId(),
                postContent.getContent(),
                postContent.getCreatedAt()
        );
    }

    public PostContent toEntity(PostContentDTO postContentDTO) {
        PostContent postContent = new PostContent();
        postContent.setContent(postContentDTO.getContent());
        return postContent;
    }
}
