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

# 6. Update GitHub Actions secrets:
#    VPS_HOST = <new IP>
#    VPS_SSH_KEY = <deploy key>
#    VPS_USER = ubuntu
#    INFOMANIAK_AI_TOKEN = <token>
#    INFOMANIAK_AI_PRODUCT_ID = 107324

# 7. Push to preprod branch — GitHub Actions deploys the app automatically
```

## Notes

- No nginx needed — Traefik handles SSL + routing
- App containers self-register via Docker labels
- Adding a new environment = new branch + new workflow, zero server changes
- Certs stored in Docker volume (persist across Traefik restarts)
