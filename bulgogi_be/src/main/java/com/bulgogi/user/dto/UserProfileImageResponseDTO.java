package com.bulgogi.user.dto;

public class UserProfileImageResponseDTO {
    private String profileImageUrl;

    public UserProfileImageResponseDTO(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }
}
