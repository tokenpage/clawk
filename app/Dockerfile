# Stage 1: build
FROM node:24 AS build

WORKDIR /app
COPY makefile .
COPY package.json .
COPY package-lock.json* .
RUN make install

COPY . .
ARG KRT_API_URL=http://localhost:5000
ENV KRT_API_URL=$KRT_API_URL
RUN make build

# Stage 2: serve
FROM ghcr.io/kibalabs/app-serve:latest
COPY --from=build /app/dist /usr/share/nginx/html
