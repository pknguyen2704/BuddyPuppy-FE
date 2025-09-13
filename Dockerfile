# --------- Builder stage ---------
  FROM node:18-alpine AS builder
  WORKDIR /app
  
  # Copy package.json trước để cache dependency
  COPY package*.json ./
  # Cài cả devDependencies để build
  RUN npm ci --include=dev
  
  # Copy toàn bộ source code
  COPY . .
  
  # Truyền API URL vào build (Vite chỉ nhận biến bắt đầu bằng VITE_)
  ARG VITE_API_PRODUCTION_URL
  ENV VITE_API_PRODUCTION_URL=$VITE_API_PRODUCTION_URL
  
  # Build FE (Vite -> dist)
  RUN npm run build
  
  # --------- Production stage (nginx) ---------
  FROM nginx:alpine
  
  # Copy build output vào Nginx serve
  COPY --from=builder /app/dist /usr/share/nginx/html
  
  # SPA fallback (handle client-side routing)
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  