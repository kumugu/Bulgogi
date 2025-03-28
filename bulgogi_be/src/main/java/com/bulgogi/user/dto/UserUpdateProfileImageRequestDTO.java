package com.bulgogi.user.dto;

import java.time.LocalDateTime;

public class UserUpdateProfileImageRequestDTO {

    private String profileImage;
    private LocalDateTime updateAt;

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
