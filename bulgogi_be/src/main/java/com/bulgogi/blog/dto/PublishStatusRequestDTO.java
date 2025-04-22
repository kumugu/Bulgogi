package com.bulgogi.blog.dto;

import java.util.Objects;

public class PublishStatusRequestDTO {

    private boolean published;

    public PublishStatusRequestDTO() {}

    public PublishStatusRequestDTO(boolean published) {
        this.published = published;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    @Override
    public String toString() {
        return "PublishStatusRequestDTO{" +
                "published=" + published +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PublishStatusRequestDTO that)) return false;
        return published == that.published;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(published);
    }
}
