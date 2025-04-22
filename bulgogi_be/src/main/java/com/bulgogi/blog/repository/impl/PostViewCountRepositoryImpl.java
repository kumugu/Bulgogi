package com.bulgogi.blog.repository.impl;

import com.bulgogi.blog.repository.PostViewCountRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Repository
// Redis PostViewCount Repository 구현체
public class PostViewCountRepositoryImpl implements PostViewCountRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String KEY_PREFIX = "views:";

    public PostViewCountRepositoryImpl(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Long incrementViewCount(Long postId) {
        String key = KEY_PREFIX + postId;
        return redisTemplate.opsForValue().increment(key);
    }

    @Override
    public Long getViewCount(Long postId) {
        String key = KEY_PREFIX + postId;
        String value = redisTemplate.opsForValue().get(key);
        return value != null ? Long.parseLong(value) : 0L;
    }

    @Override
    public Map<Long, Long> getAllViewCounts() {
        Set<String> keys = redisTemplate.keys(KEY_PREFIX + "*");
        Map<Long, Long> result = new HashMap<>();

        if (keys != null) {
            for (String key : keys) {
                String postIdStr = key.substring(KEY_PREFIX.length());
                try {
                    Long postId = Long.parseLong(postIdStr);
                    String value = redisTemplate.opsForValue().get(key);
                    if (value != null) {
                        result.put(postId, Long.parseLong(value));
                    }
                } catch (NumberFormatException e) {
                    // 잘못된 키 형식은 무시
                }
            }
        }
        return result;
    }

    @Override
    public void deleteViewCount(Long postId) {
        String key = KEY_PREFIX + postId;
        redisTemplate.delete(key);
    }
}
