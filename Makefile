
REPORTER=spec

test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER)

test-cov: lib-cov
	EJSON_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov: lib
	jscoverage $< $@ 

.PHONY: test test-cov