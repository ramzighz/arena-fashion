FROM node:20-alpine

WORKDIR /app

# Copy server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy client and build
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client/ ./client/
RUN cd client && npm run build

# Copy server source
COPY server/ ./server/

# Create data directory
RUN mkdir -p server/data

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "src/index.js"]
