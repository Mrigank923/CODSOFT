FROM node:20
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend .
CMD ["node", "app.js"]
