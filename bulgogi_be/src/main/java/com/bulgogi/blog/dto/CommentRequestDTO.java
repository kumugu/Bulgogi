package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class CommentRequestDTO {

    @NotBlank(message = "댓글 내용은 필수입니다")
    @Size(max = 1000, message = "댓글은 1000자 이내로 작성해주세요")
    private String content;

    public CommentRequestDTO() {}

    public CommentRequestDTO(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "CommentRequestDTO{" +
                "content='" + content + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof CommentRequestDTO that)) return false;
        return Objects.equals(content, that.content);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(content);
    }
}
