package com.bulgogi.user.dto;

public class UserLoginResponseDTO {
    private String accessToken;
    private String username;
    private String profileImageUrl;

    public UserLoginResponseDTO(String accessToken, String username, String profileImageUrl) {
        this.accessToken = accessToken;
        this.username = username;
        this.profileImageUrl = profileImageUrl;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}
