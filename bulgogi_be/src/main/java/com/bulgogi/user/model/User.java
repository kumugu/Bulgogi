package com.bulgogi.user.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 사용자 고유 식별자

    @Column(nullable = false, unique = true)
    private String email; // 로그인에 사용되는 이메일 (고유값)

    @Column(name = "password", nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false, unique = true)
    private String username; // 블로그 주소에 사용될 고유 사용자명

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER; // 기본 역할 값 USER

    @Column(name = "profile_image")
    private String profileImage; // 프로필 사진 URL

    @Column(name = "bio")
    private String bio; // 자기소개

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // 계정 생성 시간

    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // 계정 수정 시간

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        LocalDateTime now = LocalDateTime.now();
    }

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false; // 삭제 상태 관리 필드, 기본값은 false

    public User () {}

    public User(Long id, String email, String password, String username, Role role, String profileImage, String bio, LocalDateTime createdAt, LocalDateTime updatedAt, boolean deleted) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.role = role;
        this.profileImage = profileImage;
        this.bio = bio;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deleted = deleted;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
