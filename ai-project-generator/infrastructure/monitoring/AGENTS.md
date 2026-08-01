# AGENTS.md — infrastructure/monitoring

## Purpose
**Monitoring and Observability** — Configuration for metrics collection, log aggregation, alerting, and dashboards.

## Contents
- Prometheus configuration and alert rules
- Grafana dashboard definitions
- Log aggregation config (ELK / Loki)
- Alertmanager routing rules

## Agent Guidelines
- Define SLOs (Service Level Objectives) and corresponding alerts.
- Create dashboards for: API latency, error rates, job queue depth, AI cost.
- Alert on anomalies, not just hard thresholds.
- Ensure logs are structured (JSON format) for easy querying.
