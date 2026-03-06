# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build — NEXT_PUBLIC_ENV injected at build time via ARG
ARG NEXT_PUBLIC_ENV=preprod
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV

RUN npm run build

# ---- Runtime image ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Only copy what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["node_modules/.bin/next", "start", "-p", "3000", "-H", "0.0.0.0"]
