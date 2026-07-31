package com.projectgenerator.worker.queue;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GenerationJobConsumer implements StreamListener<String, MapRecord<String, String, String>> {

    private final GenerationJobProcessor processor;
    private final StringRedisTemplate redisTemplate;

    @Value("${queue.consumer-group:worker-group}")
    private String consumerGroup;

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        String jobId = message.getValue().get("jobId");
        try {
            processor.process(GenerationJobPayload.fromFields(message.getValue()));
        } catch (Exception e) {
            // GenerationJobProcessor already catches and marks the job FAILED internally — this
            // catch is only for something going wrong before/around that (e.g. malformed
            // message fields), so it doesn't crash the listener thread.
            log.error("Unhandled error processing generation job message (jobId={})", jobId, e);
        } finally {
            // Ack either way: the idempotency check in GenerationJobProcessor (skip if already
            // COMPLETED/FAILED) makes a redelivery of an unacked message a safe no-op, but an
            // unacked message would otherwise just retry forever without making progress.
            redisTemplate.opsForStream().acknowledge(message.getStream(), consumerGroup, message.getId());
        }
    }
}
