package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.*;
import com.bulgogi.blog.model.*;
import com.bulgogi.user.model.User;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PostMapper {

    public PostResponseDTO toDTO(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getTitle(),
                Optional.ofNullable(post.getPostContent()).map(PostContent::getContent).orElse(""),
                post.getUser().getId(),
                post.getUser().getUsername(),
                Optional.ofNullable(post.getTopic()).map(Topic::getId).orElse(null),
                Optional.ofNullable(post.getTopic()).map(Topic::getName).orElse(null),
                Optional.ofNullable(post.getFolderCategory()).map(FolderCategory::getId).orElse(null),
                Optional.ofNullable(post.getFolderCategory()).map(FolderCategory::getName).orElse(null),
                post.getTags().stream().map(tag -> new TagDTO(tag.getId(), tag.getName())).collect(Collectors.toList()),
                post.getImages().stream().map(image -> new PostImageDTO(image.getId(), image.getImageUrl())).collect(Collectors.toList()),
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

    public PostDTO fromEntity(Post post) {
        return new PostDTO(
                post.getId(),
                post.getTitle(),
                Optional.ofNullable(post.getPostContent()).map(PostContent::getContent).orElse(""),
                post.getUser().getId(),
                Optional.ofNullable(post.getTopic()).map(Topic::getId).orElse(null),
                Optional.ofNullable(post.getFolderCategory()).map(FolderCategory::getId).orElse(null),
                post.getTags().stream().map(Tag::getId).collect(Collectors.toSet())
        );
    }
}
