# Phase 21: Deployment & Production Readiness — Scope

## Objective
Package, containerize, and configure BricksBazar for enterprise production hosting on DigitalOcean, AWS, or custom Linux VPS environments. Provide production Docker configurations, Nginx reverse proxy routing with SSL termination, PM2 process clustering, and a comprehensive deployment runbook.

## Core Deliverables
1. **Containerization**:
   - `Dockerfile`: Multi-stage build with dependency isolation, Next.js build compilation, unprivileged `nextjs` system user, and minimal footprint.
   - `docker-compose.yml`: Multi-container topology linking the Next.js frontend, Node API server, and MongoDB 7.0 database.
   - `.dockerignore`: Protection against copying node_modules, local environments, and temporary build caches.

2. **Reverse Proxy & Edge Configuration (`nginx/bricksbazar.conf`)**:
   - Automated HTTP to HTTPS redirection.
   - SSL / TLS 1.3 encryption configuration with Let's Encrypt / Certbot pathing.
   - Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
   - Gzip compression across all JSON, CSS, and JS chunks.
   - 365-day immutable caching for `/_next/static/` hashed assets.

3. **Process Clustering (`ecosystem.config.js`)**:
   - PM2 cluster configuration auto-scaling across available CPU cores.
   - Auto-restart upon uncaught exceptions and memory limit caps.

4. **Production Runbook**:
   - Step-by-step DigitalOcean droplet provisioning, DNS records, SSL setup, and environment variables checklist.
