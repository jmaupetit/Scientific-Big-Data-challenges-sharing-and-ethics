default: build

dev:
	@npm run watch &
	@python -mSimpleHTTPServer

build:
	@npm run build

.PHONY: dev build
