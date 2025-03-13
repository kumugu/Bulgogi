package com.bulgogi.user.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenService {

    private final RedisTemplate<Object, Object> redisTemplate;
    private final long refreshExpirationTime;

    public TokenService(RedisTemplate<Object, Object> redisTemplate,
                        @Value("${spring.jwt.refresh_expiration}") long refreshExpirationTime) {
        this.redisTemplate = redisTemplate;
        this.refreshExpirationTime = refreshExpirationTime;
    }

     // Refresh Token을 Redis에 저장
     public void storeRefreshToken(String refreshToken, Long userId) {
        // Refresh Token을 Redis에 저장. 만료 기간 설정 (7일)
        redisTemplate.opsForValue().set(refreshToken, userId.toString(), refreshExpirationTime, TimeUnit.MILLISECONDS);
    }

    // Redis에서 Refresh Token을 가져옴
    public Long getRefreshToken(String refreshToken) {
        try {
            String userIdStr = (String) redisTemplate.opsForValue().get(refreshToken);
            if (userIdStr == null) {
                return null;  // 유효하지 않거나 만료된 토큰
            }
            return Long.parseLong(userIdStr);
        } catch (Exception e) {
            return null;
        }
    }

    // 로그아웃 시 Redis에서 Refresh Token을 삭제
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }
}
