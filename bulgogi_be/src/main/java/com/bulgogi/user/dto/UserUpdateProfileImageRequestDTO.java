package com.bulgogi.user.dto;

import java.time.LocalDateTime;

public class UserUpdateProfileImageRequestDTO {

    private String profileImage;
    private LocalDateTime updateAt;

    // 유효성 검증
    public void validate() {
        if (profileImage == null) {
            throw new IllegalArgumentException("ProfileImage 값은 비어 있을 수 없습니다.");
        }
        if (!profileImage.startsWith("http:") || !profileImage.startsWith("https:")) {
            throw new IllegalArgumentException("유효하지 않은 ProfileImage URL입니다.");
        }
    }

    // 생성자
    public UserUpdateProfileImageRequestDTO() {}
    public UserUpdateProfileImageRequestDTO(String profileImage,  LocalDateTime updateAt) {
        this.profileImage = profileImage;
        this.updateAt = updateAt;
    }

    // Getter, Setter
    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }
}
