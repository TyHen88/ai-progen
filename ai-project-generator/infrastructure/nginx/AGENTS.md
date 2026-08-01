# AGENTS.md — infrastructure/nginx

## Purpose
**Nginx Configuration** — Reverse proxy and load balancer configuration for routing traffic to application services.

## Contents
- Main `nginx.conf`
- Site-specific virtual host configs
- SSL/TLS certificate configurations
- Rate limiting and security headers

## Agent Guidelines
- Enable HTTPS only — redirect HTTP to HTTPS.
- Set security headers (CSP, HSTS, X-Frame-Options).
- Configure rate limiting to protect API endpoints.
- Enable Gzip compression for static assets.
