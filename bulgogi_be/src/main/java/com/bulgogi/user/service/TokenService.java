package com.bulgogi.user.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenService {

    private final RedisTemplate<Object, Object> redisTemplate;

    public TokenService(RedisTemplate<Object, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Refresh Token을 Redis에 저장합니다.
     * @param refreshToken 저장할 Refresh Token
     * @param userId Refresh Token과 연결된 사용자 ID
     */
    public void storeRefreshToken(String refreshToken, Long userId) {
        // Refresh Token을 Redis에 저장. 만료 기간 설정 (1일)
        redisTemplate.opsForValue().set(refreshToken, userId.toString(), 1, TimeUnit.DAYS);
    }

    /**
     * Redis에서 Refresh Token을 가져옵니다.
     * @param refreshToken 가져올 Refresh Token
     * @return Refresh Token과 연결된 사용자 ID (유효하지 않거나 만료된 경우 null 반환)
     */
    public Long getRefreshToken(String refreshToken) {
        String userIdStr = (String) redisTemplate.opsForValue().get(refreshToken);
        if (userIdStr == null) {
            return null;  // 유효하지 않거나 만료된 토큰
        }
        return Long.parseLong(userIdStr);
    }

    /**
     * 로그아웃 시 Redis에서 Refresh Token을 삭제합니다.
     * @param refreshToken 삭제할 Refresh Token
     */
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }
}
