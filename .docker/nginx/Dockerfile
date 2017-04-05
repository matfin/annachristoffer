FROM nginx:alpine
MAINTAINER matfin@gmail.com

ARG ssl_cn

RUN apk add --no-cache openssl && \
	openssl req \ 
	-x509 \
	-nodes \ 
	-days 365 \
	-newkey rsa:2048 \
	-keyout /etc/ssl/private/nginx-selfsigned.key \
	-out /etc/ssl/certs/nginx-selfsigned.crt \
	-subj "/C=DE/ST=Berlin/L=Berlin/O=Dev/CN=$ssl_cn"

RUN openssl dhparam \
	-out /etc/ssl/certs/dhparam.pem 2048

COPY nginx.conf /etc/nginx/nginx.conf