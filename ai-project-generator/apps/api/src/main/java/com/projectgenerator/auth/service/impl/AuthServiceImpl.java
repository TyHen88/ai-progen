package com.projectgenerator.auth.service.impl;

import com.projectgenerator.auth.dto.AuthResponse;
import com.projectgenerator.auth.dto.LoginRequest;
import com.projectgenerator.auth.dto.RefreshTokenRequest;
import com.projectgenerator.auth.dto.RegisterRequest;
import com.projectgenerator.auth.dto.RememberMeRequest;
import com.projectgenerator.auth.dto.RememberMeSession;
import com.projectgenerator.auth.dto.UserDeviceDto;
import com.projectgenerator.auth.entity.RefreshTokenEntity;
import com.projectgenerator.auth.entity.RememberMeTokenEntity;
import com.projectgenerator.auth.repository.RefreshTokenRepository;
import com.projectgenerator.auth.repository.RememberMeTokenRepository;
import com.projectgenerator.auth.service.AuthService;
import com.projectgenerator.auth.service.RememberMeRedisService;
import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import com.projectgenerator.security.JwtTokenProvider;
import com.projectgenerator.user.entity.UserEntity;
import com.projectgenerator.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RememberMeTokenRepository rememberMeTokenRepository;
    private final RememberMeRedisService rememberMeRedisService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.refresh-token-expiration:2592000000}") // Default 30 Days (ms)
    private long refreshTokenExpirationMs;

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request, String deviceInfo, String ipAddress) {
        UserEntity user = authenticateUser(request.getEmail(), request.getPassword());
        String familyId = UUID.randomUUID().toString();
        return createAuthTokenPair(user, familyId, deviceInfo, ipAddress);
    }

    @Override
    @Transactional
    public AuthResponse rememberMeLogin(LoginRequest request, String deviceId, String browserFingerprint, String ipAddress) {
        UserEntity user = authenticateUser(request.getEmail(), request.getPassword());
        String familyId = UUID.randomUUID().toString();

        AuthResponse tokenPair = createAuthTokenPair(user, familyId, deviceId, ipAddress);
        String rawRememberMeToken = UUID.randomUUID().toString() + "-rm-" + UUID.randomUUID().toString();
        String tokenHash = jwtTokenProvider.hashToken(rawRememberMeToken);
        Instant expiresAt = Instant.now().plus(refreshTokenExpirationMs, ChronoUnit.MILLIS);

        RememberMeTokenEntity entity = RememberMeTokenEntity.builder()
                .userId(user.getId())
                .familyId(familyId)
                .tokenHash(tokenHash)
                .deviceId(nullToDefault(deviceId, "dev_unknown"))
                .browserFingerprint(nullToDefault(browserFingerprint, "fp_unknown"))
                .ipAddress(ipAddress)
                .isRevoked(false)
                .isUsed(false)
                .expiresAt(expiresAt)
                .build();

        rememberMeTokenRepository.save(entity);

        // Cache in Redis L1
        RememberMeSession session = mapToSession(entity);
        rememberMeRedisService.cacheSession(session, refreshTokenExpirationMs / 1000);

        tokenPair.setRefreshToken(rawRememberMeToken);
        return tokenPair;
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request, String deviceInfo, String ipAddress) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }

        UserEntity user = UserEntity.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .credits(100)
                .build();

        UserEntity savedUser = userRepository.save(user);
        String familyId = UUID.randomUUID().toString();

        return createAuthTokenPair(savedUser, familyId, deviceInfo, ipAddress);
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request, String deviceInfo, String ipAddress) {
        String rawToken = request.getRefreshToken();
        if (rawToken == null || rawToken.isBlank()) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Refresh token is required");
        }

        String tokenHash = jwtTokenProvider.hashToken(rawToken);
        RefreshTokenEntity existingToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Invalid refresh token"));

        if (Boolean.TRUE.equals(existingToken.getIsRevoked())) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Refresh token has been revoked");
        }

        if (Boolean.TRUE.equals(existingToken.getIsUsed())) {
            log.error("SECURITY ALERT: Refresh token reuse detected for family {}. Revoking entire family!", existingToken.getFamilyId());
            refreshTokenRepository.revokeFamily(existingToken.getFamilyId());
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Security Alert: Refresh token reuse detected. Session terminated.");
        }

        if (Instant.now().isAfter(existingToken.getExpiresAt())) {
            existingToken.setIsRevoked(true);
            refreshTokenRepository.save(existingToken);
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Refresh token has expired");
        }

        existingToken.setIsUsed(true);
        refreshTokenRepository.save(existingToken);

        UserEntity user = userRepository.findById(existingToken.getUserId())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        return createAuthTokenPair(user, existingToken.getFamilyId(), deviceInfo, ipAddress);
    }

    @Override
    @Transactional
    public AuthResponse refreshRememberMeToken(RememberMeRequest request, String deviceId, String browserFingerprint, String ipAddress) {
        String rawToken = request.getRememberMeToken();
        if (rawToken == null || rawToken.isBlank()) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Remember Me token is required");
        }

        String tokenHash = jwtTokenProvider.hashToken(rawToken);

        // 1. Try Redis L1 Lookup first
        Optional<RememberMeSession> redisSession = rememberMeRedisService.getSession(tokenHash);
        
        RememberMeTokenEntity dbToken;
        if (redisSession.isPresent()) {
            RememberMeSession s = redisSession.get();
            dbToken = RememberMeTokenEntity.builder()
                    .id(s.getId())
                    .userId(s.getUserId())
                    .familyId(s.getFamilyId())
                    .tokenHash(s.getTokenHash())
                    .deviceId(s.getDeviceId())
                    .browserFingerprint(s.getBrowserFingerprint())
                    .ipAddress(s.getIpAddress())
                    .isRevoked(s.getIsRevoked())
                    .isUsed(s.getIsUsed())
                    .expiresAt(s.getExpiresAt())
                    .build();
        } else {
            // L2 Database Fallback
            dbToken = rememberMeTokenRepository.findByTokenHash(tokenHash)
                    .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Invalid Remember Me token"));
        }

        // 2. Validate Revocation Status
        if (Boolean.TRUE.equals(dbToken.getIsRevoked())) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Remember Me session has been revoked");
        }

        // 3. REPLAY DETECTION: Token reuse attack!
        if (Boolean.TRUE.equals(dbToken.getIsUsed())) {
            log.error("SECURITY ALERT: Remember Me token reuse detected for family {}. Revoking entire token family!", dbToken.getFamilyId());
            rememberMeTokenRepository.revokeFamily(dbToken.getFamilyId());
            rememberMeRedisService.invalidateToken(tokenHash);
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Security Alert: Remember Me token reuse detected. Session terminated.");
        }

        // 4. Validate Device ID & Fingerprint Alignment
        String targetDeviceId = nullToDefault(deviceId != null ? deviceId : request.getDeviceId(), "dev_unknown");
        String targetFingerprint = nullToDefault(browserFingerprint != null ? browserFingerprint : request.getBrowserFingerprint(), "fp_unknown");

        if (!dbToken.getDeviceId().equals(targetDeviceId)) {
            log.warn("Device ID mismatch on Remember Me refresh for user {}", dbToken.getUserId());
        }

        if (Instant.now().isAfter(dbToken.getExpiresAt())) {
            dbToken.setIsRevoked(true);
            rememberMeTokenRepository.save(dbToken);
            rememberMeRedisService.invalidateToken(tokenHash);
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS, "Remember Me session has expired");
        }

        // 5. Mark used and rotate
        dbToken.setIsUsed(true);
        rememberMeTokenRepository.save(dbToken);
        rememberMeRedisService.invalidateToken(tokenHash);

        UserEntity user = userRepository.findById(dbToken.getUserId())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        // 6. Issue fresh Access + Remember Me Token Pair with Sliding Expiration
        AuthResponse response = createAuthTokenPair(user, dbToken.getFamilyId(), targetDeviceId, ipAddress);

        String newRawRememberMeToken = UUID.randomUUID().toString() + "-rm-" + UUID.randomUUID().toString();
        String newTokenHash = jwtTokenProvider.hashToken(newRawRememberMeToken);
        Instant newExpiresAt = Instant.now().plus(refreshTokenExpirationMs, ChronoUnit.MILLIS);

        RememberMeTokenEntity newToken = RememberMeTokenEntity.builder()
                .userId(user.getId())
                .familyId(dbToken.getFamilyId())
                .tokenHash(newTokenHash)
                .deviceId(targetDeviceId)
                .browserFingerprint(targetFingerprint)
                .ipAddress(ipAddress)
                .isRevoked(false)
                .isUsed(false)
                .expiresAt(newExpiresAt)
                .build();

        rememberMeTokenRepository.save(newToken);
        rememberMeRedisService.cacheSession(mapToSession(newToken), refreshTokenExpirationMs / 1000);

        response.setRefreshToken(newRawRememberMeToken);
        return response;
    }

    @Override
    @Transactional
    public void logout(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            return;
        }

        String tokenHash = jwtTokenProvider.hashToken(rawRefreshToken);
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setIsRevoked(true);
            refreshTokenRepository.save(token);
        });

        rememberMeTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setIsRevoked(true);
            rememberMeTokenRepository.save(token);
            rememberMeRedisService.invalidateToken(tokenHash);
        });
    }

    @Override
    @Transactional
    public void logoutAll(String userId) {
        refreshTokenRepository.revokeAllForUser(userId);
        rememberMeTokenRepository.revokeAllForUser(userId);
        rememberMeRedisService.invalidateUserSessions(userId);
        log.info("Revoked all active refresh & remember-me token families for user {}", userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDeviceDto> getActiveDevices(String userId) {
        return refreshTokenRepository.findByUserIdAndIsRevokedFalse(userId).stream()
                .map(token -> UserDeviceDto.builder()
                        .id(token.getId())
                        .familyId(token.getFamilyId())
                        .deviceInfo(token.getDeviceInfo())
                        .ipAddress(token.getIpAddress())
                        .createdAt(token.getCreatedAt())
                        .expiresAt(token.getExpiresAt())
                        .build())
                .toList();
    }

    private UserEntity authenticateUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new BusinessException(ErrorCode.INVALID_CREDENTIALS);
        }
        return user;
    }

    private AuthResponse createAuthTokenPair(UserEntity user, String familyId, String deviceInfo, String ipAddress) {
        String accessToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());
        String rawRefreshToken = UUID.randomUUID().toString() + "-" + UUID.randomUUID().toString();
        String tokenHash = jwtTokenProvider.hashToken(rawRefreshToken);
        Instant expiresAt = Instant.now().plus(refreshTokenExpirationMs, ChronoUnit.MILLIS);

        RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
                .userId(user.getId())
                .familyId(familyId)
                .tokenHash(tokenHash)
                .deviceInfo(deviceInfo)
                .ipAddress(ipAddress)
                .isRevoked(false)
                .isUsed(false)
                .expiresAt(expiresAt)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        return AuthResponse.builder()
                .token(accessToken)
                .accessToken(accessToken)
                .refreshToken(rawRefreshToken)
                .tokenType("Bearer")
                .expiresIn(900L)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .credits(user.getCredits())
                .build();
    }

    private RememberMeSession mapToSession(RememberMeTokenEntity entity) {
        return RememberMeSession.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .familyId(entity.getFamilyId())
                .tokenHash(entity.getTokenHash())
                .deviceId(entity.getDeviceId())
                .browserFingerprint(entity.getBrowserFingerprint())
                .ipAddress(entity.getIpAddress())
                .isRevoked(entity.getIsRevoked())
                .isUsed(entity.getIsUsed())
                .expiresAt(entity.getExpiresAt())
                .build();
    }

    private String nullToDefault(String value, String defaultValue) {
        return (value == null || value.isBlank()) ? defaultValue : value;
    }
}
