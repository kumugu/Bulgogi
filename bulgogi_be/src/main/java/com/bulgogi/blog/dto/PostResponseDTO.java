package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostResponseDTO {
    private Long id;
    private String title;
    private String content;
    private Long views;
    private boolean published;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String category;
    private List<String> tags;

    // Constructor
    public PostResponseDTO () {}

    public PostResponseDTO(Long id, String title, String content, Long views, boolean published, LocalDateTime createdAt, LocalDateTime updatedAt, String category, List<String> tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category = category;
        this.tags = tags;
    }


    // Getter, Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
