package com.projectgenerator.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectgenerator.auth.dto.RememberMeSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RememberMeRedisService {

    private static final String TOKEN_PREFIX = "remember_me:token:";
    private static final String USER_FAMILIES_PREFIX = "remember_me:user:";

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public void cacheSession(RememberMeSession session, long ttlSeconds) {
        try {
            String key = TOKEN_PREFIX + session.getTokenHash();
            String json = objectMapper.writeValueAsString(session);
            redisTemplate.opsForValue().set(key, json, Duration.ofSeconds(ttlSeconds));

            // Index familyId under user's set of families for instant bulk revocation
            String userFamilyKey = USER_FAMILIES_PREFIX + session.getUserId() + ":families";
            redisTemplate.opsForSet().add(userFamilyKey, session.getFamilyId());
            redisTemplate.expire(userFamilyKey, Duration.ofSeconds(ttlSeconds));
        } catch (Exception e) {
            log.error("Failed to cache RememberMeSession in Redis for token hash {}", session.getTokenHash(), e);
        }
    }

    public Optional<RememberMeSession> getSession(String tokenHash) {
        try {
            String key = TOKEN_PREFIX + tokenHash;
            String json = redisTemplate.opsForValue().get(key);
            if (json != null) {
                return Optional.of(objectMapper.readValue(json, RememberMeSession.class));
            }
        } catch (Exception e) {
            log.error("Failed to read RememberMeSession from Redis for token hash {}", tokenHash, e);
        }
        return Optional.empty();
    }

    public void invalidateToken(String tokenHash) {
        try {
            String key = TOKEN_PREFIX + tokenHash;
            redisTemplate.delete(key);
        } catch (Exception e) {
            log.error("Failed to invalidate token in Redis for hash {}", tokenHash, e);
        }
    }

    public void invalidateUserSessions(String userId) {
        try {
            String userFamilyKey = USER_FAMILIES_PREFIX + userId + ":families";
            redisTemplate.delete(userFamilyKey);
            log.info("Invalidated all Redis sessions for user {}", userId);
        } catch (Exception e) {
            log.error("Failed to invalidate user sessions in Redis for user {}", userId, e);
        }
    }
}
