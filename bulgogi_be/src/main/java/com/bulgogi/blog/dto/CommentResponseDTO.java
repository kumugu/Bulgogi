package com.bulgogi.blog.dto;

import java.time.LocalDateTime;

public class CommentResponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String author;

    // Constructor
    public CommentResponseDTO() {}

    public CommentResponseDTO(Long id, String content, LocalDateTime createdAt, String author) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
    }

    // Getter, Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
