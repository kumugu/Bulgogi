package com.bulgogi.blog.dto;

import com.bulgogi.blog.model.Tag;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class PostRequestDTO {
    private String title;
    private String content;
    private Long categoryId;
    private Set<Long> tagIds;

    // 문자열에서 설정하는 추가 메서드 구현
    public void setTagIdsFromString(String tagIdsString) {
        if (tagIdsString != null && !tagIdsString.isEmpty()) {
            this.tagIds = Arrays.stream(tagIdsString.split(","))
                    .map(String::trim)
                    .map(Long::parseLong)
                    .collect(Collectors.toSet()); // Set으로 변경
        } else {
            this.tagIds = Set.of(); // 빈 Set으로 설정
        }
    }

    // Constructor
    public PostRequestDTO() {}

    public PostRequestDTO(String title, String content, Long categoryId, Set<Long> tagIds) {
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

    public Set<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(Set<Long> tagIds) {
        this.tagIds = tagIds;
    }
}
