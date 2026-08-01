package com.projectgenerator.common.ratelimit;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class RateLimiterService {

    private final StringRedisTemplate redisTemplate;

    public boolean isAllowed(String keyIdentifier, int limit, int windowSeconds) {
        String key = "rate_limit:" + keyIdentifier;
        long now = System.currentTimeMillis();
        long windowStart = now - (windowSeconds * 1000L);

        try {
            redisTemplate.execute((RedisCallback<Void>) connection -> {
                byte[] keyBytes = key.getBytes();
                // 1. Remove entries older than the sliding window start
                connection.zRemRangeByScore(keyBytes, 0, windowStart);
                // 2. Add current timestamp record
                connection.zAdd(keyBytes, now, String.valueOf(now).getBytes());
                // 3. Set expiration to maintain key cleanup
                connection.expire(keyBytes, windowSeconds);
                return null;
            });

            Long currentCount = redisTemplate.opsForZSet().zCard(key);
            boolean allowed = currentCount != null && currentCount <= limit;

            if (!allowed) {
                log.warn("Rate limit exceeded for key {}: {} requests in last {}s (limit: {})",
                        keyIdentifier, currentCount, windowSeconds, limit);
            }
            return allowed;
        } catch (Exception e) {
            log.error("Error executing Redis sliding window rate limit for key {}", keyIdentifier, e);
            // Fail open on Redis connectivity failure to prevent blocking legitimate traffic
            return true;
        }
    }
}
