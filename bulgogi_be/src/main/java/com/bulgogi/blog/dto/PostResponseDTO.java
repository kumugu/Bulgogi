package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class PostResponseDTO extends AuditableDTO{
    private String title;
    private String content;
    private Long authorId;
    private String authorName;
    private Long topicId;
    private String topicName;
    private Long folderCategoryId;
    private String folderCategoryName;
    private List<TagDTO> tags;
    private List<PostImageDTO> images;
    private Long views;
    private Integer commentCount;
    private boolean published;

    public PostResponseDTO() {}

    public PostResponseDTO(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String content,
                           Long authorId, String authorName, Long topicId, String topicName,
                           Long folderCategoryId, String folderCategoryName,
                           List<TagDTO> tags, List<PostImageDTO> images, Long views, Integer commentCount, boolean published) {
        super(id, createdAt, updatedAt);
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;
        this.topicId = topicId;
        this.topicName = topicName;
        this.folderCategoryId = folderCategoryId;
        this.folderCategoryName = folderCategoryName;
        this.tags = tags;
        this.images = images;
        this.views = views;
        this.commentCount = commentCount;
        this.published = published;
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

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public Long getFolderCategoryId() {
        return folderCategoryId;
    }

    public void setFolderCategoryId(Long folderCategoryId) {
        this.folderCategoryId = folderCategoryId;
    }

    public String getFolderCategoryName() {
        return folderCategoryName;
    }

    public void setFolderCategoryName(String folderCategoryName) {
        this.folderCategoryName = folderCategoryName;
    }

    public List<TagDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }

    public List<PostImageDTO> getImages() {
        return images;
    }

    public void setImages(List<PostImageDTO> images) {
        this.images = images;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    @Override
    public String toString() {
        return "PostResponseDTO{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", authorId=" + authorId +
                ", authorName='" + authorName + '\'' +
                ", topicId=" + topicId +
                ", topicName='" + topicName + '\'' +
                ", folderCategoryId=" + folderCategoryId +
                ", folderCategoryName='" + folderCategoryName + '\'' +
                ", tags=" + tags +
                ", images=" + images +
                ", views=" + views +
                ", commentCount=" + commentCount +
                ", published=" + published +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostResponseDTO that)) return false;
        if (!super.equals(object)) return false;
        return Objects.equals(title, that.title) && Objects.equals(content, that.content) && Objects.equals(authorId, that.authorId) && Objects.equals(topicId, that.topicId) && Objects.equals(folderCategoryId, that.folderCategoryId) && Objects.equals(tags, that.tags) && Objects.equals(images, that.images);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), title, content, authorId, topicId, folderCategoryId, tags, images);
    }
}
