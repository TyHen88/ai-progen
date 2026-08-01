package com.projectgenerator.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {

    /** Maximum allowed requests within the time window. */
    int limit() default 60;

    /** Time window in seconds. Default is 60 seconds (1 minute). */
    int windowSeconds() default 60;
}
