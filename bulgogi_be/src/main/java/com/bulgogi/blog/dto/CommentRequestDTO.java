package com.bulgogi.blog.dto;

public class CommentRequestDTO {
    private String content;
    private Long postId;
    private Long userId;

    // Constructor
    public CommentRequestDTO() {}

    public CommentRequestDTO(String content, Long postId,  Long userId) {
        this.content = content;
        this.postId = postId;
        this.userId = userId;
    }

    // Getter, Setter

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }
}
