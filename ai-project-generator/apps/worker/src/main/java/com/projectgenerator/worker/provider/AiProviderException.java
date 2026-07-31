package com.projectgenerator.worker.provider;

/**
 * Unlike apps/api's BusinessException, this carries no HttpStatus — this process has no REST
 * layer to shape a response for. Callers catch this, log it, and mark the job FAILED.
 */
public class AiProviderException extends RuntimeException {

    public AiProviderException(String message) {
        super(message);
    }

    public AiProviderException(String message, Throwable cause) {
        super(message, cause);
    }
}
