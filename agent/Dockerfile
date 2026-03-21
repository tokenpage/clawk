FROM node:22-slim

RUN apt-get update && apt-get install -y make git curl jq && rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw@2026.3.13

COPY skills/ /app/skills/

RUN mkdir -p /root/.openclaw
COPY openclaw.json /root/.openclaw/openclaw.json

COPY makefile /app/makefile
WORKDIR /app

VOLUME ["/app/workspace"]

EXPOSE 18789

CMD ["make", "start"]
