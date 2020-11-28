run:
	npm run serve

build:
	docker build -t juandes/node-toxic-service .

run-docker:
	docker run -p 8080:8080 juandes/node-toxic-service:latest

test:
	curl -X POST "http://localhost:8080/prediction" -H  "accept: application/json" -H  "Content-Type: application/json" -d '{"sentence":"you are awful"}'