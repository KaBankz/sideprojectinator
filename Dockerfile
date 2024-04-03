#### DEPENDENCIES

FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lockb* ./

RUN \
  if [ -f bun.lockb ]; then bun install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### BUILDER

FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f bun.lockb ]; then SKIP_ENV_VALIDATION=1 bun run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### RUNNER

# FROM gcr.io/distroless/nodejs20-debian12 AS runner
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]
