package com.bulgogi.user.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal; // 인증된 사용자 정보

    public JwtAuthenticationToken(Object principal) {
        super(null);
        this.principal = principal;
        setAuthenticated(true); // 인증 상태로 설정
    }

    public JwtAuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return principal;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }

    @Override
    public String getName() {
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return (principal != null) ? principal.toString() : "";
    }
}
