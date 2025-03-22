package com.bulgogi.user.dto;

import java.time.LocalDateTime;

public class UserUpdateBioRequestDTO {

    private String bio;
    private LocalDateTime updatedAt;

    // 유효성 검증
    public void validate() {
        if (bio == null || bio.trim().isEmpty()) {
            throw new IllegalArgumentException("Bio 값은 비어 있을 수 없습니다.");
        }
        if (bio.length() > 255) {
            throw new IllegalArgumentException("Bio는 255자를 초과할 수 없습니다.");
        }
    }

    // 생성자
    public UserUpdateBioRequestDTO() {};

    public UserUpdateBioRequestDTO(String bio, LocalDateTime updatedAt) {
        this.bio = bio;
        this.updatedAt = updatedAt;
    }

    // Getter, Setter
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
