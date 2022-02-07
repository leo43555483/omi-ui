# ARG NODE_VERSION=12-alpine
ARG NGINX_VERSION=1.21.3-alpine

# FROM node:${NODE_VERSION} AS frontend

# ARG FRONT_PATH_NAME=/usr/share/nginx/html

# WORKDIR ${FRONT_PATH_NAME}


# COPY ./dist ./

# RUN npm run build

FROM nginx:${NGINX_VERSION} AS nginx

ARG FRONT_PATH_NAME=/usr/share/nginx/html

WORKDIR ${FRONT_PATH_NAME}

COPY ./dist ./

EXPOSE 80 443
