# Use Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy rest of the source code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
