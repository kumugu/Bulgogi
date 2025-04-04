package com.bulgogi.blog.dto;

import java.util.List;
import java.util.Objects;

public class PostImageRequestDTO {

    private List<String> imageUrls;
    private boolean replace;

    public PostImageRequestDTO() {}

    public PostImageRequestDTO(List<String> imageUrls, boolean replace) {
        this.imageUrls = imageUrls;
        this.replace = replace;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public boolean isReplace() {
        return replace;
    }

    public void setReplace(boolean replace) {
        this.replace = replace;
    }

    @Override
    public String toString() {
        return "PostImageRequestDTO{" +
                "imageUrls=" + imageUrls +
                ", replace=" + replace +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostImageRequestDTO that)) return false;
        return replace == that.replace && Objects.equals(imageUrls, that.imageUrls);
    }

    @Override
    public int hashCode() {
        return Objects.hash(imageUrls, replace);
    }
}
