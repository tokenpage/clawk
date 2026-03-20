FROM python:3.12-slim

RUN apt-get update && apt-get install --yes --no-install-recommends make git gcc libc6-dev

WORKDIR /app
COPY makefile .
COPY pyproject.toml .
RUN make install

COPY . .

EXPOSE 5000
CMD make migrate && make start-prod
