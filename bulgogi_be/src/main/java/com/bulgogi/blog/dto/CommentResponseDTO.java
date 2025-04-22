package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class CommentResponseDTO extends AuditableDTO{

    private String content;
    private Long authorId;
    private String authorName;

    public CommentResponseDTO() {}

    public CommentResponseDTO(String content, Long authorId, String authorName) {
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public CommentResponseDTO(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String content, Long authorId, String authorName) {
        super(id, createdAt, updatedAt);
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    @Override
    public String toString() {
        return "CommentResponseDTO{" +
                "content='" + content + '\'' +
                ", authorId=" + authorId +
                ", authorName='" + authorName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof CommentResponseDTO that)) return false;
        if (!super.equals(object)) return false;
        return Objects.equals(content, that.content) && Objects.equals(authorId, that.authorId) && Objects.equals(authorName, that.authorName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), content, authorId, authorName);
    }
}
