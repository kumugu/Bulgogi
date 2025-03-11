package com.bulgogi.user.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal; // 인증된 사용자 정보

    // 인증되지 않은 사용자 정보로 JwtAuthenticationToken 생성
    public JwtAuthenticationToken(Object principal) {
        super(null);
        this.principal = principal;
        setAuthenticated(true); // 인증 상태로 설정
    }

    // 인증된 사용자 정보 및 권한으로 JwtAuthenticationToken 생성
    public JwtAuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        // 자격 증명 반환 (여기에서는 principal 자체 반환)
        return principal;
    }

    @Override
    public Object getPrincipal() {
        // 사용자 정보 반환
        return principal;
    }

    @Override
    public String getName() {
        if (principal instanceof UserDetails) {
            // UserDetails 인터페이스를 구현한 객체의 사용자 이름 반환
            return ((UserDetails) principal).getUsername();
        }
        // principal이 null이 아니면 toString() 반한, 그렇지 않으면 빈 문자열 반환
        return (principal != null) ? principal.toString() : "";
    }
}
