package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class PostContentDTO {

    private Long id;
    private String content;
    private LocalDateTime createdAt;

    public PostContentDTO() {}

    public PostContentDTO(Long id, String content, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
    }

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

    @Override
    public String toString() {
        return "PostContentDTO{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostContentDTO that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(content, that.content) && Objects.equals(createdAt, that.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content, createdAt);
    }
}
