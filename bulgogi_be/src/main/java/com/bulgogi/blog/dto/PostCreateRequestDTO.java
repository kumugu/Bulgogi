package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Objects;
import java.util.Set;

public class PostCreateRequestDTO {
    @NotBlank(message = "제목은 필수입니다")
    @Size(max = 255, message = "제목은 255자 이내로 작성해주세요")
    private String title;

    @NotBlank(message = "내용은 필수입니다")
    private String content;

    @NotNull(message = "주제는 필수입니다.")
    private Long topicId;

    private Long folderCategoryId;
    private Set<Long> tagIds;
    private List<String> imageUrls;

    public PostCreateRequestDTO () {}

    public PostCreateRequestDTO(String title, String content, Long topicId, Long folderCategoryId, Set<Long> tagIds, List<String> imageUrls) {
        this.title = title;
        this.content = content;
        this.topicId = topicId;
        this.folderCategoryId = folderCategoryId;
        this.tagIds = tagIds;
        this.imageUrls = imageUrls;
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

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    @Override
    public String toString() {
        return "PostCreateRequestDto{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", topicId=" + topicId +
                ", folderCategoryId=" + folderCategoryId +
                ", tagIds=" + tagIds +
                ", imageUrls=" + imageUrls +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof PostCreateRequestDTO)) return false;
        PostCreateRequestDTO that = (PostCreateRequestDTO) obj;
        return Objects.equals(title, that.title) &&
                Objects.equals(content, that.content) &&
                Objects.equals(topicId, that.topicId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, content, topicId);
    }
}
