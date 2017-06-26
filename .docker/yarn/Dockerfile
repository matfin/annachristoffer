FROM node:8.0.0-alpine
MAINTAINER matfin@gmail.com

RUN apk update && \
 	apk upgrade && \
 	apk add --no-cache git && \
 	npm install -g yarn

WORKDIR /opt