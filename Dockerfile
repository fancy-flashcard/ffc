FROM node:latest as builder
COPY . /app
WORKDIR /app
ENV ASSET_PATH "/"
RUN npm install && \
    npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
