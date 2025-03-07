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

    @Column(name = "password_hash", nullable = false)
    private String passwordHash; // 해시된 비밀번호

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

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false; // 삭제 상태 관리 필드, 기본값은 false

    // 기본 생성자
    public User() {}

    // 생성자
    public User(String email, String passwordHash, String username, Role role, String profileImage, String bio) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.username = username;
        this.role = role;
        this.profileImage = profileImage;
        this.bio = bio;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.deleted = false;
    }

    // Getter, Setter 추가
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
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
