FROM node:16.9.1-alpine3.11

ENV NODE_ENV=production

WORKDIR /app/backend

# Build serialport from source for alpine
RUN apk add --no-cache make gcc g++ python3 linux-headers udev
RUN npm install serialport --build-from-source

COPY package*.json ./
RUN npm ci --production
COPY . .

CMD ["npm", "run", "start:prod"]
