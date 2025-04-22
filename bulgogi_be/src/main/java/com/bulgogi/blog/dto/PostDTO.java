package com.bulgogi.blog.dto;

import java.util.Objects;
import java.util.Set;

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private Long topicId;
    private Long folderCategoryId;
    private Set<Long> tagIds;

    public PostDTO() {}

    public PostDTO(Long id, String title, String content, Long userId, Long topicId, Long folderCategoryId, Set<Long> tagIds) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.topicId = topicId;
        this.folderCategoryId = folderCategoryId;
        this.tagIds = tagIds;
    }

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Long getFolderCategoryId() {
        return folderCategoryId;
    }

    public void setFolderCategoryId(Long folderCategoryId) {
        this.folderCategoryId = folderCategoryId;
    }

    public Set<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(Set<Long> tagIds) {
        this.tagIds = tagIds;
    }

    @Override
    public String toString() {
        return "PostDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", userId=" + userId +
                ", topicId=" + topicId +
                ", folderCategoryId=" + folderCategoryId +
                ", tagIds=" + tagIds +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostDTO postDTO)) return false;
        return Objects.equals(id, postDTO.id) && Objects.equals(title, postDTO.title) && Objects.equals(content, postDTO.content) && Objects.equals(userId, postDTO.userId) && Objects.equals(topicId, postDTO.topicId) && Objects.equals(folderCategoryId, postDTO.folderCategoryId) && Objects.equals(tagIds, postDTO.tagIds);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, content, userId, topicId, folderCategoryId, tagIds);
    }
}
