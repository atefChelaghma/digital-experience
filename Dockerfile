# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22

########################################
# 1. base — shared build foundation
########################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

########################################
# 2. deps — install dependencies
########################################
FROM base AS deps

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

########################################
# 3. builder — build Next.js
########################################
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

########################################
# 4. runner — production image
########################################
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]