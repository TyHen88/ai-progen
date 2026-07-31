plugins {
    java
    id("org.springframework.boot") version "3.4.2"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "com.projectgenerator"
version = "0.1.0-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Core — no web starter: this process has no REST layer, only a queue consumer.
    implementation("org.springframework.boot:spring-boot-starter")

    // Database & Persistence — points at the same Postgres tables apps/api owns/migrates.
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.postgresql:postgresql")

    // Queue — consumes the Redis Stream apps/api produces to.
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    // AI provider HTTP calls (RestClient) — part of spring-web, pulled in standalone here
    // since we deliberately did not take the full web starter.
    implementation("org.springframework:spring-web")

    // Archive packaging
    implementation("org.apache.commons:commons-compress:1.27.1")
    implementation("commons-io:commons-io:2.18.0")

    // Developer Tooling
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Testing
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
