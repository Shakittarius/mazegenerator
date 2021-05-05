FROM nginx:alpine

EXPOSE 80

COPY /html /usr/share/nginx/html

