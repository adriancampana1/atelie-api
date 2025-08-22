FROM node:20-alpine AS builder

WORKDIR /app

# install deps and build
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build
RUN npx prisma migrate deploy

FROM node:20-alpine AS runner
WORKDIR /app

# Default environment variables (can be overridden by docker-compose or runtime env)
ENV NODE_ENV=production
ENV PORT=3001
ENV CORS_ORIGIN=http://localhost:3000
ENV JWT_SECRET=atelie-app
ENV JWT_EXPIRATION=
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/atelie?schema=public"

# Copy only what's needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# small utility used by the HEALTHCHECK
RUN apk add --no-cache curl

EXPOSE 3001

# healthcheck: verifies Swagger endpoint is reachable
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
	CMD curl -f http://localhost:3001/api || exit 1

CMD ["node", "dist/main.js"]