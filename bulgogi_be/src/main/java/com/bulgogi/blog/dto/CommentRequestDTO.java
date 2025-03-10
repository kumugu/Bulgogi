package com.bulgogi.blog.dto;

public class CommentRequestDTO {
    private String content;
    private Long postId;

    // Constructor
    public CommentRequestDTO() {}

    public CommentRequestDTO(String content, Long postId) {
        this.content = content;
        this.postId = postId;
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
}
