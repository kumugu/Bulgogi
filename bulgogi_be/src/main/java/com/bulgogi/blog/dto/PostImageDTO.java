package com.bulgogi.blog.dto;

import java.util.Objects;

public class PostImageDTO {

    private Long id;
    private String imageUrl;

    public PostImageDTO() {}

    public PostImageDTO(Long id, String imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "ImageDTO{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PostImageDTO postImageDTO)) return false;
        return Objects.equals(id, postImageDTO.id) && Objects.equals(imageUrl, postImageDTO.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, imageUrl);
    }
}
