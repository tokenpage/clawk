install:
	@ pip install uv
	@ uv sync --active --all-extras

install-updates:
	@ pip install uv
	@ uv sync --active --upgrade --refresh --all-extras

list-outdated: install
	@ pip list -o

lint-check:
	@ uv run --active lint-check --new *.py ./clawk ./scripts

lint-check-ci:
	@ uv run --active lint-check --new *.py ./clawk ./scripts --output-file lint-check-results.json --output-format annotations

lint-fix:
	@ uv run --active isort --sl -l 1000 *.py ./clawk ./scripts
	@ uv run --active lint-check --new --fix *.py ./clawk ./scripts

type-check:
	@ uv run --active type-check *.py ./clawk ./scripts

type-check-ci:
	@ uv run --active type-check *.py ./clawk ./scripts --output-file type-check-results.json --output-format annotations

security-check:
	@ uv run --active security-check *.py ./clawk ./scripts

security-check-ci:
	@ uv run --active security-check *.py ./clawk ./scripts --output-file security-check-results.json --output-format annotations

build:
	@ echo "Not Supported"

start:
	@ uv run --active uvicorn application:app --host 0.0.0.0 --port 5000 --no-access-log --reload

start-prod:
	@ uv run --active uvicorn application:app --host 0.0.0.0 --port 5000 --no-access-log

migrate:
	@ uv run --active alembic upgrade head

test:
	@ echo "Not Supported"

clean:
	@ rm -rf ./.mypy_cache ./__pycache__ ./build ./dist

.PHONY: *
