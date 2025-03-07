package com.bulgogi.user.dto;

public class UserResponseDTO {

    private Long id;
    private String email;
    private String username;
    private String profileImage;
    private String bio;
    private String role;
    private String createdAt;
    private String updatedAt;

    // Constructor
    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String email, String username, String profileImage, String bio, String role, String createdAt, String updatedAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.profileImage = profileImage;
        this.bio = bio;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getter, Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
