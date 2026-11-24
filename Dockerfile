FROM node:20-alpine AS builder

ARG SASS_PATH
ARG PORT
ARG REACT_APP_API_BASE
ARG REACT_APP_GOOGLE_API_KEY

ENV SASS_PATH="${SASS_PATH}" \
    PORT="${PORT}" \
    REACT_APP_API_BASE="${REACT_APP_API_BASE}" \
    REACT_APP_GOOGLE_API_KEY="${REACT_APP_GOOGLE_API_KEY}"

WORKDIR /app

RUN ["node", "-e", "if (!process.env.REACT_APP_GOOGLE_API_KEY) { console.error('REACT_APP_GOOGLE_API_KEY is required at build time'); process.exit(1); }"]

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN NODE_OPTIONS=--openssl-legacy-provider node scripts/build.js

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
