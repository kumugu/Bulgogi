package com.bulgogi.user.dto;

import com.bulgogi.user.model.Role;

public class UserRequestDTO {

    private String email;
    private String password;
    private String username;
    private String profileImage;
    private String bio;
    private Role role;

    public UserRequestDTO() {}

    public UserRequestDTO(String email, String password, String username, String profileImage, String bio, Role role) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.profileImage = profileImage;
        this.bio = bio;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
