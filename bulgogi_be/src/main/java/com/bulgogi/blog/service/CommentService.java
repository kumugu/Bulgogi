package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.CommentRequestDTO;
import com.bulgogi.blog.dto.CommentResponseDTO;
import com.bulgogi.blog.mapper.CommentMapper;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.repository.CommentRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentMapper commentMapper;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper, PostRepository postRepository, UserRepository userRepository) {
        this.commentMapper = commentMapper;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
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
        Post post = postRepository.findById(commentRequestDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        User user = userRepository.findById(commentRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Comment comment = new Comment();
        comment.setContent(commentRequestDTO.getContent());
        comment.setPost(post);
        comment.setUser(user);

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
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        comment.setContent(commentRequestDTO.getContent());

        comment = commentRepository.save(comment);
        return commentMapper.toCommentResponseDTO(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}

