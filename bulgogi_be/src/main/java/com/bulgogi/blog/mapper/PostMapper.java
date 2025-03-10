package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.PostRequestDTO;
import com.bulgogi.blog.dto.PostResponseDTO;
import com.bulgogi.blog.model.Category;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Tag;
import com.bulgogi.user.model.User;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PostMapper {

    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(PostMapper.class);

    @Autowired
    public PostMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @PostConstruct
    public void configureMappings() {
        logger.info("Configuring ModelMapper mappings...");

        modelMapper.getConfiguration()
                .setAmbiguityIgnored(true)
                .setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(Post.class, PostResponseDTO.class).setPostConverter(context -> {
            Post source = context.getSource();
            PostResponseDTO destination = context.getDestination();

            if (source.getCategory() != null) {
                destination.setCategory(source.getCategory().getName());
            }

            if (source.getTags() != null) {
                destination.setTags(source.getTags().stream()
                        .map(Tag::getName)
                        .collect(Collectors.toList()));
            }

            return destination;
        });

        logger.info("ModelMapper mappings configured successfully.");
    }

    public PostResponseDTO toPostResponseDTO(Post post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());

        // Hibernate.isInitialized() 사용하여 프록시인지 확인 후 접근
        if (post.getCategory() != null && Hibernate.isInitialized(post.getCategory())) {
            dto.setCategory(post.getCategory().getName());
        }

        if (post.getTags() != null && Hibernate.isInitialized(post.getTags())) {
            dto.setTags(post.getTags().stream()
                    .map(Tag::getName)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public Post toPost(PostRequestDTO postRequestDTO) {
        return modelMapper.map(postRequestDTO, Post.class);
    }

    public Post toCreatePost(PostRequestDTO postRequestDTO, Category category, Set<Tag> tags, User user) {
        Post post = modelMapper.map(postRequestDTO, Post.class);
        post.setCategory(category);
        post.setTags(tags);
        post.setUser(user);
        return post;
    }
}
