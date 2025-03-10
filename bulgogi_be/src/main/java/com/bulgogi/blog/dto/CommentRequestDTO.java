package com.bulgogi.blog.dto;

public class CommentRequestDTO {
    private String content;
    private Long postId;

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
