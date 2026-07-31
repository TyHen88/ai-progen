package com.projectgenerator.worker.queue;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.StreamMessageListenerContainer.StreamMessageListenerContainerOptions;

import java.time.Duration;

/**
 * Registers the consumer-group subscription on the generation-jobs stream apps/api produces to.
 * Not live-tested against a running Redis in this pass — verify manually per the plan's
 * Verification section before relying on it.
 */
@Slf4j
@Configuration
public class RedisStreamConfig {

    @Value("${queue.stream-name:generation-jobs}")
    private String streamName;

    @Value("${queue.consumer-group:worker-group}")
    private String consumerGroup;

    private StreamMessageListenerContainer<String, MapRecord<String, String, String>> container;

    @Bean
    public StreamMessageListenerContainer<String, MapRecord<String, String, String>> streamContainer(
            RedisConnectionFactory connectionFactory,
            StringRedisTemplate redisTemplate,
            GenerationJobConsumer consumer
    ) {
        ensureConsumerGroup(redisTemplate);

        StreamMessageListenerContainerOptions<String, MapRecord<String, String, String>> options =
                StreamMessageListenerContainerOptions.builder()
                        .pollTimeout(Duration.ofSeconds(2))
                        .build();

        container = StreamMessageListenerContainer.create(connectionFactory, options);
        container.receive(Consumer.from(consumerGroup, "worker-1"),
                StreamOffset.create(streamName, ReadOffset.lastConsumed()),
                consumer);
        container.start();

        log.info("Subscribed to Redis stream '{}' as consumer group '{}'", streamName, consumerGroup);
        return container;
    }

    private void ensureConsumerGroup(StringRedisTemplate redisTemplate) {
        try {
            redisTemplate.opsForStream().createGroup(streamName, consumerGroup);
        } catch (Exception e) {
            // Group (and stream) already exist from a prior run — expected on every restart
            // after the first, not an error.
            log.debug("Consumer group '{}' on stream '{}' already exists: {}", consumerGroup, streamName, e.getMessage());
        }
    }

    @PreDestroy
    public void stop() {
        if (container != null) {
            container.stop();
        }
    }
}
