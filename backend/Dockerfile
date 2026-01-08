# 1️⃣ Base image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for Docker cache)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --production

# 5️⃣ Copy application source code
COPY . .

# 6️⃣ Expose backend port (internal to Docker network)
EXPOSE 5001

# 7️⃣ Start backend
CMD ["node", "index.js"]

