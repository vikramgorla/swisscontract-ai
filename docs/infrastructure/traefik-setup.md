# Traefik Setup

Run once on the VPS. Traefik acts as reverse proxy + automatic SSL for all containers.

## docker-compose.yml (on VPS at ~/traefik/docker-compose.yml)

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: unless-stopped
    command:
      - "--api.dashboard=false"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=vikram.gorla@gmail.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik-letsencrypt:/letsencrypt
    networks:
      - traefik-net

networks:
  traefik-net:
    external: true

volumes:
  traefik-letsencrypt:
```

## Deployment Architecture

A single workflow (`.github/workflows/deploy.yml`) handles all environments:

| Branch    | GitHub Environment | Domain                      |
|-----------|--------------------|-----------------------------|
| `main`    | `production`       | `swisscontract.ai`          |
| `preprod` | `preprod`          | `preprod.swisscontract.ai`  |

### GitHub Configuration

**Repo-level secrets** (shared across all environments):
- `VPS_SSH_KEY` — ed25519 deploy key
- `VPS_HOST` — VPS IP address
- `VPS_USER` — SSH user

**Environment-level variables** (per environment):
- `DOMAIN` — the domain routed by Traefik

**Environment-level secrets** (per environment):
- `INFOMANIAK_AI_TOKEN` — API token for Infomaniak AI
- `INFOMANIAK_AI_PRODUCT_ID` — product ID for Infomaniak AI

### How it works

1. Push to `main` or `preprod` triggers the workflow
2. Branch name determines the environment (`main` → `production`, otherwise branch name)
3. Docker image built and pushed to `ghcr.io/vikramgorla/swisscontract-ai:<environment>`
4. SSH into VPS, pull image, run container with Traefik labels
5. Container self-registers with Traefik via Docker labels — no port mapping needed
6. Health check confirms deployment

### Adding a new environment

1. Create a GitHub environment (e.g. `staging`) with:
   - Variable: `DOMAIN` = `staging.swisscontract.ai`
   - Secrets: `INFOMANIAK_AI_TOKEN`, `INFOMANIAK_AI_PRODUCT_ID`
2. Add the branch name to the `branches` list in `deploy.yml`
3. Point DNS for the new domain to the VPS IP
4. Push to the branch — Traefik auto-provisions SSL and routes traffic

## Bootstrap commands

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# 2. Swap
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. Firewall
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp
sudo ufw --force enable

# 4. Create Docker network for Traefik
docker network create traefik-net

# 5. Start Traefik
mkdir -p ~/traefik
# Create docker-compose.yml as above
cd ~/traefik && docker compose up -d

# 6. DNS: point swisscontract.ai and preprod.swisscontract.ai to VPS IP

# 7. Push to preprod or main — GitHub Actions deploys automatically
```

## Notes

- No nginx needed — Traefik handles SSL + routing
- App containers self-register via Docker labels — no port mapping (`-p`) used
- Adding a new environment = new GitHub environment + branch + DNS, zero server changes
- Certs stored in Docker volume (persist across Traefik restarts)
