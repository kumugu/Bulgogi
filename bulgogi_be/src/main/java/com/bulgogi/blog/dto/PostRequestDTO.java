package com.bulgogi.blog.dto;

import java.util.List;

public class PostRequestDTO {
    private String title;
    private String content;
    private Long categoryId;
    private List<Long> tagIds;

    // Constructor
    public PostRequestDTO() {}

    public PostRequestDTO(String title, String content, Long categoryId, List<Long> tagIds) {
        this.title = title;
        this.content = content;
        this.categoryId = categoryId;
        this.tagIds = tagIds;
    }

    // Getter, Setter

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }
}
