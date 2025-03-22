package com.bulgogi.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserLoginDTO {
    private Long id;

    @Size(min = 4, max = 20, message = "이름은 최소 4자 이상, 최대 20자이어야 합니다.")
    private String username;

    @NotBlank(message = "이메일을 입력하새주세요.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 4, max = 20, message = "비밀번호는 최소 4자 이상, 최대 20자이어야 합니다.")
    private String password;

    private boolean deleted;

    // 기본 생성자
    public UserLoginDTO () {}

    // 파라미터가 있는 생성자
    public UserLoginDTO(String email, String password, boolean deleted) {
        this.email = email;
        this.password = password;
        this.deleted = deleted;
    }

    public UserLoginDTO(Long id, String email, String password, String username, boolean deleted) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
