package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.model.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

@Component
public class CommentMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    // Entity -> DTO 변환
    public CommentResponseDTO toCommentResponseDTO(Comment comment) {
        return modelMapper.map(comment, CommentResponseDTO.class);
    }

    // DTO -> Entity 변환
    public static Comment toComment(CommentRequestDTO commentRequestDTO) {
        return modelMapper.map(commentRequestDTO, Comment.class);
    }
}
