install:
	@ npm install -g openclaw@2026.3.13

start:
	@ openclaw onboard --non-interactive --auth-choice gemini-api-key --gemini-api-key "${GEMINI_API_KEY}" --secret-input-mode plaintext --skip-skills || true
	@ openclaw gateway --port 18789

start-prod:
	@ openclaw gateway --port 18789

.PHONY: *
