FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

RUN npm ci --omit=dev
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001 -G nextjs

ENV HOME=/home/nextjs

RUN mkdir -p /home/nextjs/.npm/_cacache \
    && mkdir -p /home/nextjs/.npm/_logs \
    && chown -R nextjs:nextjs /home/nextjs \
    && chown -R nextjs:nextjs /app \
    && chmod -R 755 /app

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]