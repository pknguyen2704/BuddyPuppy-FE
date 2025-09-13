# builder stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# truyền API URL vào build
ARG VITE_API_PRODUCTION_URL
ENV VITE_API_PRODUCTION_URL=$VITE_API_PRODUCTION_URL

RUN npm run build

# production stage (nginx)
FROM nginx:alpine
# copy build output (Vite output is /dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
