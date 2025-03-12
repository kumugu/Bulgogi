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

    // JWT Refresh Token 생성
    public String generateRefreshToken(Long userId, String username) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
                .addClaims(Map.of("username", username))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 로그인 시 Access Token하고 Refresh Token을 쿠키에 설정
//    public Map<String, String> login(HttpServletResponse response, Long userId, String username) {
//        String accessToken = generateToken(userId, username);
//        String refreshToken = generateRefreshToken(userId, username);
//
//        // Refresh Token을 HttpOnly 쿠키에 설정
//        setRefreshToken(response, refreshToken);
//
//        Map<String, String> tokens = new HashMap<>();
//        tokens.put("accessToken", accessToken);
//        tokens.put("refreshToken", refreshToken);
//        return tokens;
//    }

    // Refresh Token을 HttpOnly 쿠키에 저장
    public void setRefreshToken(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);   // Javascript에서 접근 불가
        cookie.setSecure(true);     // HTTPS 연결에서만 전송(option)
        cookie.setPath("/");        // 쿠키 유효 범위 설정
        cookie.setMaxAge(60 * 60 * 24 * 30);    // 30일 유지
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
        Claims clasims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return clasims.get("username", String.class);
    }

    // JWT Token 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
