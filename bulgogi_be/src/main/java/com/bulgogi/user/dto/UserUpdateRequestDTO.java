package com.bulgogi.user.dto;

import java.time.LocalDateTime;

public class UserUpdateRequestDTO {

    private String username;
    private String profileImage;
    private String bio;
    private LocalDateTime updatedAt;

    public UserUpdateRequestDTO() {};

    public UserUpdateRequestDTO(String username, String profileImage, String bio, LocalDateTime updatedAt) {
        this.username = username;
        this.profileImage = profileImage;
        this.bio = bio;
        this.updatedAt = updatedAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

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
