package com.projectgenerator.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Auth & Security Errors
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "AUTH_001", "Invalid email or password"),
    UNAUTHORIZED_ACCESS(HttpStatus.UNAUTHORIZED, "AUTH_002", "Authentication is required to access this resource"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "AUTH_003", "You do not have permission to access this resource"),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "AUTH_004", "An account with this email already exists"),

    // User & Account Errors
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_001", "User not found"),
    INSUFFICIENT_CREDITS(HttpStatus.BAD_REQUEST, "USER_002", "Insufficient credits to perform project generation"),

    // Resource & Job Errors
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "RES_001", "Requested resource was not found"),
    JOB_NOT_FOUND(HttpStatus.NOT_FOUND, "JOB_001", "Generation job not found"),
    QUEUE_ENQUEUE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "JOB_002", "Failed to enqueue project generation job"),

    // General System Errors
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "SYS_001", "Invalid request input parameters"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "SYS_500", "An unexpected internal server error occurred");

    private final HttpStatus httpStatus;
    private final String code;
    private final String defaultMessage;
}
