FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

# serve stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# copy nginx config (spa fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]