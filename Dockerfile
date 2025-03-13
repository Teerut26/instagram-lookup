# ##### DEPENDENCIES

# FROM --platform=linux/amd64 node:21-alpine AS deps
# RUN apk add --no-cache libc6-compat openssl build-base python3
# RUN apk add --no-cache \
#     udev \
#     ttf-freefont \
#     chromium
# WORKDIR /app

# # Install dependencies based on the preferred package manager

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

# RUN yarn global add pnpm && pnpm i

# ##### BUILDER

# FROM --platform=linux/amd64 node:21-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/package.json ./package.json
# COPY . .

# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

# ##### RUNNER

# FROM --platform=linux/amd64 node:21-alpine AS runner
# RUN apk add --no-cache \
#     udev \
#     ttf-freefont \
#     chromium
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# EXPOSE 3000
# EXPOSE 10000
# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"
# CMD ["node", "server.js"]

FROM oven/bun:1 AS deps
WORKDIR /usr/src/app
COPY package.json bun.lock* ./

RUN bun install

FROM oven/bun:1 AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN SKIP_ENV_VALIDATION=1 bun run build

FROM oven/bun:1 AS runner
RUN apt-get install -y fonts-freefont-ttf chromium
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]

