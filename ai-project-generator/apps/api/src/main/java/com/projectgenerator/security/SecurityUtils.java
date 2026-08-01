package com.projectgenerator.security;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
        // Utility class
    }

    public static UserPrincipal getCurrentUserPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS);
        }

        if (authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
            return userPrincipal;
        }

        throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS);
    }

    public static String getCurrentUserId() {
        return getCurrentUserPrincipal().getId();
    }

    public static void validateOwnership(String resourceOwnerId, String currentUserId) {
        if (resourceOwnerId == null || currentUserId == null || !resourceOwnerId.equals(currentUserId)) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }
    }
}
