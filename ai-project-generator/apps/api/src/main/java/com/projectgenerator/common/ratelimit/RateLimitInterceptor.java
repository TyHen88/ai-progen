package com.projectgenerator.common.ratelimit;

import com.projectgenerator.common.annotation.RateLimit;
import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimiterService rateLimiterService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        RateLimit rateLimit = handlerMethod.getMethodAnnotation(RateLimit.class);
        if (rateLimit == null) {
            rateLimit = handlerMethod.getBeanType().getAnnotation(RateLimit.class);
        }

        if (rateLimit != null) {
            String clientIp = extractClientIp(request);
            String identifier = clientIp + ":" + request.getRequestURI();

            boolean allowed = rateLimiterService.isAllowed(identifier, rateLimit.limit(), rateLimit.windowSeconds());
            if (!allowed) {
                throw new BusinessException(ErrorCode.INVALID_INPUT, "Rate limit exceeded. Too many requests. Please try again later.");
            }
        }

        return true;
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
