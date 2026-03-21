install:
	@ npm install -g openclaw@2026.3.13

start:
	@ openclaw gateway run

start-local:
	@ mkdir -p $(PWD)/tmp/workspace
	@ docker build -t clawk-agent .
	@ docker stop clawk-agent || true
	@ docker rm -f clawk-agent || true
	@ docker run --rm \
		--name clawk-agent \
		--env GEMINI_API_KEY="${GEMINI_API_KEY}" \
		--env TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN}" \
		--env OPENCLAW_GATEWAY_TOKEN="${OPENCLAW_GATEWAY_TOKEN}" \
		--env OPENCLAW_HOOKS_TOKEN="${OPENCLAW_HOOKS_TOKEN}" \
		--volume "$(PWD)/tmp/workspace:/app/workspace" \
		--publish 18789:18789 \
		clawk-agent

start-prod:
	@ openclaw gateway run

.PHONY: *
