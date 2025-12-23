# Step 1: Build the Next.js app
FROM node:20-alpine AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và lock file trước để tận dụng cache
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Cài dependency (ưu tiên dùng pnpm/yarn nếu có)
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build Next.js app
RUN npm run build

# Step 2: Run the app with a smaller image
FROM node:20-alpine AS runner

WORKDIR /app

# Tùy chọn, không cần thiết nếu không dùng Image Optimization
RUN apk add --no-cache libc6-compat

# Copy files từ bước build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Nếu dùng next/image, bạn nên set env này để tránh lỗi
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
