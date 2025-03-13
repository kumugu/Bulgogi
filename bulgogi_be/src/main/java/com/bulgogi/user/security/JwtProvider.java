package com.bulgogi.user.security;

import com.bulgogi.user.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {

    private final Key key;
    private final long expirationTime;
    private final long refreshExpirationTime;

    public JwtProvider(
            @Value("${spring.jwt.secret_key}") String secretKey,
            @Value("${spring.jwt.expiration}") long expirationTime,
            @Value("${spring.jwt.refresh_expiration}") long refreshExpirationTime) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.expirationTime = expirationTime;
        this.refreshExpirationTime = refreshExpirationTime;
    }

    // JWT Token 생성
    public String generateToken(Long userId, String username) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .addClaims(Map.of("username", username))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT Refresh Token 생성 (토큰 생성 메서드와 합칠 수 있음)
    public String generateRefreshToken(Long userId, String username) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
                .addClaims(Map.of("username", username))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Refresh Token을 HttpOnly 쿠키에 저장
    public void setRefreshToken(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);   // Javascript에서 접근 불가
        cookie.setSecure(true);     // HTTPS 연결에서만 전송(option)
        cookie.setPath("/");        // 쿠키 유효 범위 설정
        cookie.setMaxAge(60 * 60 * 24 * 30);    // 30일 유지
        response.addCookie(cookie); // 쿠키를 응답에 추가
    }

    // JWT Token 에서 사용자 ID 추출
    public Long extractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    // JWT Token 에서 사용자 이름 추출
    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("username", String.class);
    }

    // JWT Token 검증
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            // 만료 시간 검증
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;   //만료된 토큰
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
