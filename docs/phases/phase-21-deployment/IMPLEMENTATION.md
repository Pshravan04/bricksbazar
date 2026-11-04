# Phase 21: Deployment & Production Readiness — Implementation Details

## DigitalOcean Droplet & Production Runbook

### 1. Droplet Provisioning
- Recommended Spec: **Basic Droplet — 4 GB RAM, 2 vCPUs, 80 GB SSD** (Ubuntu 24.04 LTS, Region: Bangalore `BLR1` or Singapore `SGP1`).
- Initial Server Setup:
  ```bash
  # Update package manager
  sudo apt update && sudo apt upgrade -y
  # Install Node.js 24, pnpm, Docker, and Nginx
  curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
  sudo apt install -y nodejs nginx certbot python3-certbot-nginx
  corepack enable && corepack prepare pnpm@latest --activate
  ```

### 2. Domain & SSL Setup
- Configure DNS A records pointing `@` and `www` to your Droplet IP address.
- Provision SSL with Certbot:
  ```bash
  sudo certbot --nginx -d bricksbazar.com -d www.bricksbazar.com
  ```

### 3. Application Deployment via PM2
```bash
git clone https://github.com/bricksbazar/bricksbazar.git /var/www/bricksbazar
cd /var/www/bricksbazar
pnpm install --frozen-lockfile
pnpm run build
pnpm test
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Database Automated Backup
Create `/etc/cron.daily/mongo-backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/mongodb"
mkdir -p "$BACKUP_DIR"
mongodump --uri="mongodb://localhost:27017/bricksbazar" --out="$BACKUP_DIR/$DATE"
find "$BACKUP_DIR" -type d -mtime +14 -exec rm -rf {} +
```
Make executable: `chmod +x /etc/cron.daily/mongo-backup.sh`.
