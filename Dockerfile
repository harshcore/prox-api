# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files separately to use cache efficiently
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 8080

# Run the server
CMD ["node", "server.js"]
