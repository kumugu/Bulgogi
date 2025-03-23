package com.bulgogi.user.security;

import com.bulgogi.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }


    @Override
    public String getUsername() {
        // 사용자 ID를 문자열로 반환
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        // 사용자 비밀번호 반환
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자 권한 목록 반환
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    @Override
    public boolean isAccountNonExpired() {
        // 계정이 만료되지 않았음을 나타냄
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정이 잠기지 않았음을 나타냄
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 자격 증명이 만료되지 않았음을 나타냄
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정이 활성화되었음을 나타냄
        return true;
    }
}
