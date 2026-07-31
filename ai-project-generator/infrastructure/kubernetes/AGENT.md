# AGENT.md — infrastructure/kubernetes

## Purpose
**Kubernetes Manifests** — K8s deployment, service, ingress, and configuration manifests for production deployment.

## Contents
- Deployment manifests per service
- Service and Ingress definitions
- ConfigMaps and Secrets
- HorizontalPodAutoscaler configs
- Namespace definitions

## Agent Guidelines
- Use namespaces to isolate environments (dev, staging, production).
- Set resource requests and limits for all pods.
- Use readiness and liveness probes for all services.
- Never store plain-text secrets in manifests — use K8s Secrets or external secrets operator.
