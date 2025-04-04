package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.PostImageDTO;
import com.bulgogi.blog.dto.PostCreateRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.dto.TagDTO;
import com.bulgogi.blog.model.*;
import com.bulgogi.user.model.User;

import java.util.Set;

public class PostMapper {

    public PostResponseDTO toDTO(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getTitle(),
                post.getPostContent() != null ? post.getPostContent().getContent() : "",
                post.getUser().getId(),
                post.getUser().getUsername(),
                post.getTopic() != null ? post.getTopic().getId() : null,
                post.getTopic() != null ? post.getTopic().getName() : null,
                post.getFolderCategory() != null ? post.getFolderCategory().getId() : null,
                post.getFolderCategory() != null ? post.getFolderCategory().getName() : null,
                post.getTags().stream().map(tag -> new TagDTO(tag.getId(), tag.getName())).toList(),
                post.getImages().stream().map(image -> new PostImageDTO(image.getId(), image.getImageUrl())).toList(),
                post.getViews(),
                post.getCommentCount(),
                post.isPublished()
        );
    }

    public Post toEntity(PostCreateRequestDTO dto, User user, Topic topic, FolderCategory folderCategory, Set<Tag> tags) {
        Post post = new Post();
        post.setTitle(dto.getTitle());

        // postContent 설정
        PostContent postContent = new PostContent();
        postContent.setContent(dto.getContent());
        post.setPostContent(postContent);

        // 필드 설정
        post.setUser(user);
        post.setTopic(topic);
        post.setFolderCategory(folderCategory);
        post.setTags(tags);

        return post;
    }
}

