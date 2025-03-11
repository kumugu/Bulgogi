package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.model.Post;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

@Component
public class CommentMapper {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public CommentMapper(ModelMapper modelMapper, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;

        // 명시적 매핑 설정
        modelMapper.createTypeMap(Comment.class, CommentResponseDTO.class)
                .addMappings(mapper ->
                        mapper.skip(CommentResponseDTO::setUsername));
    }

    // Entity -> DTO 변환
    public CommentResponseDTO toCommentResponseDTO(Comment comment) {
        CommentResponseDTO commentResponseDTO = modelMapper.map(comment, CommentResponseDTO.class);

        // username 필드 수동 설정 - LazyInitializationException 방지
        if (comment.getUser() != null) {
            try {
                commentResponseDTO.setUsername(comment.getUser().getUsername());
            } catch (Exception e) {
                // Lazy 로딩 실패 시 사용자 ID로 직접 조회
                User user = userRepository.findById(comment.getUser().getId())
                        .orElse(null);
                if (user != null) {
                    commentResponseDTO.setUsername(user.getUsername());
                }
            }
        }

        return commentResponseDTO;
    }

    // DTO -> Entity 변환
    public static Comment toComment(CommentRequestDTO commentRequestDTO, Post post, User user) {
        Comment comment = new Comment();
        comment.setContent(commentRequestDTO.getContent());
        comment.setPost(post);
        comment.setUser(user);
        return comment;
    }
}
