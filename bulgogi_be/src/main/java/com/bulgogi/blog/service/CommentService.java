package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.mapper.CommentMapper;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    /**
     * 댓글 작성: 게시글에 댓글을 작성할 수 있도록 처리.
     * 댓글 단건 조회: 게시글의 댓글을 조회할 수 있도록 처리.
     * 댓글 전체 조회: 게시글의 댓글을 전체 조회할 수 있도록 처리.
     * 댓글 수정: 댓글을 수정할 수 있도록 처리.
     * 댓글 삭제: 댓글을 삭제할 수 있도록 처리.
     */

    // 댓글 작성
    public CommentResponseDTO createComment(CommentRequestDTO commentRequestDTO) {
        Comment comment = commentMapper.toComment(commentRequestDTO);
        comment = commentRepository.save(comment);
        return commentMapper.toCommentResponseDTO(comment);
    }

    // 댓글 단건 조회
    public CommentResponseDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        return commentMapper.toCommentResponseDTO(comment);
    }

    // 댓글 전체 조회
    public List<CommentResponseDTO> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .map(commentMapper::toCommentResponseDTO)
                .collect(Collectors.toList());
    }

    // 댓글 수정
    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO commentRequestDTO) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        comment.setContent(commentRequestDTO.getContent());

        comment = commentRepository.save(comment);
        return commentMapper.toCommentResponseDTO(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}

