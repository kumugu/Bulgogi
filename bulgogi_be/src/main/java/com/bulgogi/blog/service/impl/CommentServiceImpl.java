package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.blog.mapper.CommentMapper;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.repository.CommentRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.service.CommentService;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.common.exception.UnauthorizedException;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.commentMapper = commentMapper;
    }

    // 댓글 작성
    @Override
    @Transactional
    public CommentResponseDTO createComment(Long postId, CommentRequestDTO commentRequestDTO, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        Comment comment = commentMapper.toEntity(commentRequestDTO, currentUser);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toDTO(savedComment);
    }

    // 댓글 수정
    @Override
    @Transactional
    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO commentRequestDTO, User currentUser) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        // 권한 확인
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this comment");
        }

        comment.setContent(commentRequestDTO.getContent());
        comment.setUpdatedAt(LocalDateTime.now());

        Comment updatedComment = commentRepository.save(comment);
        return commentMapper.toDTO(updatedComment);
    }


    // 댓글 삭제
    @Override
    @Transactional
    public void deleteComment(Long commentId, User currentUser) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        // 권한 확인
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this comment");
        }

        commentRepository.delete(comment);
    }


    // 게시글의 댓글 목록 조회 (최신순 정렬)
    @Override
    @Transactional(readOnly = true)
    public Page<CommentResponseDTO> getCommentsByPostId(Long postId, Pageable pageable) {
        Page<Comment> comments = commentRepository.findByPostId(postId, pageable);
        return comments.map(commentMapper::toDTO);
    }


    // 사용자 작성 댓글 목록 조회 (페이징 처리 필요)
    @Override
    @Transactional(readOnly = true)
    public Page<CommentResponseDTO> getCommentsByUser(UserResponseDTO user, Pageable pageable) {
        Page<Comment> comments = commentRepository.findByUserId(user.getId(), pageable);
        return comments.map(commentMapper::toDTO);
    }


    // 댓글 상세 조회
    @Override
    @Transactional(readOnly = true)
    public CommentResponseDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        return commentMapper.toDTO(comment);
    }
}
