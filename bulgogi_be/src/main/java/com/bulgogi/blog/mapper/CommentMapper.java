package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.user.model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CommentMapper {

    public CommentResponseDTO toDTO(Comment comment) {
        return new CommentResponseDTO(
                comment.getId(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getContent(),
                comment.getUser().getId(),
                comment.getUser().getUsername()
        );
    }

    public Comment toEntity(CommentRequestDTO dto, User user) {
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        return comment;
    }
}
