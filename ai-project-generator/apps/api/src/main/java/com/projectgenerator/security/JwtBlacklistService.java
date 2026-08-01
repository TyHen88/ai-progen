package com.projectgenerator.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtBlacklistService {

    private static final String BLACKLIST_PREFIX = "auth:blacklist:";
    private final StringRedisTemplate redisTemplate;

    public void blacklistToken(String token, long remainingTtlSeconds) {
        if (token == null || token.isBlank()) {
            return;
        }
        if (remainingTtlSeconds <= 0) {
            remainingTtlSeconds = 900; // Default 15 minutes TTL
        }
        try {
            String key = BLACKLIST_PREFIX + token;
            redisTemplate.opsForValue().set(key, "REVOKED", Duration.ofSeconds(remainingTtlSeconds));
            log.info("Blacklisted Access Token in Redis for {} seconds", remainingTtlSeconds);
        } catch (Exception e) {
            log.error("Failed to blacklist JWT in Redis", e);
        }
    }

    public boolean isBlacklisted(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }
        try {
            String key = BLACKLIST_PREFIX + token;
            Boolean hasKey = redisTemplate.hasKey(key);
            return Boolean.TRUE.equals(hasKey);
        } catch (Exception e) {
            log.error("Failed to check JWT blacklist in Redis", e);
            return false;
        }
    }
}
