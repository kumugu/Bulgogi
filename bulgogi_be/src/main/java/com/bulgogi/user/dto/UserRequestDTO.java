package com.bulgogi.user.dto;

import com.bulgogi.user.model.Role;

import java.util.regex.Pattern;

public class UserRequestDTO {

    private Long id;
    private String email;
    private String password;
    private String username;
    private String profileImage;
    private String bio;
    private Role role;
    private Boolean deleted;

    public UserRequestDTO() {}

    public UserRequestDTO(Long id, String email, String password, String username, String profileImage, String bio, Role role, Boolean deleted) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.profileImage = profileImage;
        this.bio = bio;
        this.role = role;
        this.deleted = deleted;
    }

    // 비밀번호 유효성 검사 메소드
    public boolean isValidPassword() {
        // 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함한 패턴
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$";
        return Pattern.matches(passwordPattern, this.password);
    }

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

    public Boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
