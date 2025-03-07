package com.bulgogi.user.dto;

import com.bulgogi.user.model.Role;

public class UserRequestDTO {

    private String email;
    private String PasswordHash;
    private String username;
    private String profileImage;
    private String bio;
    private Role role;

    // Constructor
    public UserRequestDTO () {}

    public UserRequestDTO(String email, String passwordHash, String username, String profileImage, String bio, Role role) {
        this.email = email;
        PasswordHash = passwordHash;
        this.username = username;
        this.profileImage = profileImage;
        this.bio = bio;
        this.role = role;
    }

    // Getter, Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return PasswordHash;
    }

    public void setPasswordHash(String passwordHash) {
        PasswordHash = passwordHash;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
