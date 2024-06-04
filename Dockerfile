FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .
ARG WORKSPACE

RUN turbo prune ${WORKSPACE} --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
ARG WORKSPACE
ARG APP

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .

RUN npx turbo run build --filter=${WORKSPACE}

FROM base AS runner
WORKDIR /app
ARG APP

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer --chown=nodejs:nodejs /app .
WORKDIR /app/apps/${APP}

CMD npm run start
