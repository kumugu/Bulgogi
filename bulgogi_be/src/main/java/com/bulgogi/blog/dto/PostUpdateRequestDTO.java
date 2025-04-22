package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;
import java.util.Set;

public class PostUpdateRequestDTO {

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 255, message = "제목은 255자 이내로 작성해주세요")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;

    @NotNull(message = "주제는 필수입니다")
    private Long topicId;

    private Long folderCategoryId;
    private Set<Long> tagIds;

    public PostUpdateRequestDTO() {}

    public PostUpdateRequestDTO(String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds) {
        this.title = title;
        this.content = content;
        this.topicId = topicId;
        this.folderCategoryId = folderCategoryId;
        this.tagIds = tagIds;
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
        return "PostUpdateRequestDTO{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", topicId=" + topicId +
                ", folderCategoryId=" + folderCategoryId +
                ", tagIds=" + tagIds +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostUpdateRequestDTO that)) return false;
        return Objects.equals(title, that.title) && Objects.equals(content, that.content) && Objects.equals(topicId, that.topicId) && Objects.equals(folderCategoryId, that.folderCategoryId) && Objects.equals(tagIds, that.tagIds);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, content, topicId, folderCategoryId, tagIds);
    }
}
