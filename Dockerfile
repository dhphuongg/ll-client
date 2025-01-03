# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN npm run build \
    && rm -rf node_modules

# Production stage
FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html
USER nginx

RUN apk add --no-cache shadow \
    && touch /var/run/nginx.pid \
    && mkdir -p /var/cache/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid \
    && rm -rf /var/cache/apk/*

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]