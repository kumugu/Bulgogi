package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.exception.ResourceNotFoundException;
import com.bulgogi.blog.model.Comment;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.repository.CommentRepository;
import com.bulgogi.blog.repository.PostRepository;
import com.bulgogi.blog.service.CommentService;
import com.bulgogi.user.exception.UnauthorizedException;
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

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // 댓글 작성
    @Override
    @Transactional
    public Comment createComment(Long postId, String content, User currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(currentUser);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }


    // 댓글 수정
    @Override
    @Transactional
    public Comment updateComment(Long commentId, String content, User currentUser) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        // 권한 확인
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this comment");
        }

        comment.setContent(content);
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
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
    public Page<Comment> getCommentsByPostId(Long postId, Pageable pageable) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        return commentRepository.findByPostOrderByCreatedAtDesc(post, pageable);
    }


    // 사용자 작성 댓글 목록 조회 (페이징 처리 필요)
    @Override
    @Transactional(readOnly = true)
    public Page<Comment> getCommentsByUser(User user, Pageable pageable) {
        // 페이징을 위한 메소드는 Repository에 없어 별도 구현 필요
        // 임시로 리스트 변환 후 처리
        return null; // TODO: 사용자별 댓글 조회 페이징 처리 구현
    }


    // 댓글 상세 조회
    @Override
    @Transactional(readOnly = true)
    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
    }
}
