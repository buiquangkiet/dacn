# Sử dụng image Node.js chính thức làm base
FROM node:18

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và cài đặt các dependencies
COPY backend/package*.json ./
RUN npm install

# Sao chép phần còn lại của mã nguồn backend
COPY backend/ .

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 5000

# Chạy server backend
CMD ["npm", "start"]
