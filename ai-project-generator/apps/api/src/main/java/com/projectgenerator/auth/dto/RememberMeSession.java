package com.projectgenerator.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RememberMeSession {

    private String id;
    private String userId;
    private String familyId;
    private String tokenHash;
    private String deviceId;
    private String browserFingerprint;
    private String ipAddress;
    private Boolean isRevoked;
    private Boolean isUsed;
    private Instant expiresAt;
}
