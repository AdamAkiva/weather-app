FROM node:20.11.1-alpine as app-base

# Install dependencies
RUN apk update && apk add --no-cache curl=8.5.0-r0

############################### Development ########################################

FROM app-base as app-dev

# Set the workdir
WORKDIR /home/node/weather-app

############################ Build for production ##################################

FROM app-base as app-build

ARG WEATHER_APP_API_URL=${WEATHER_APP_API_URL}
ARG WEATHER_APP_API_KEY=${WEATHER_APP_API_KEY}
ARG NODE_ENV=${NODE_ENV}

WORKDIR /home/node/weather-app

COPY ./eslint.config.js ./index.html ./package*.json ./tsconfig.json ./vite.config.ts ./
COPY ./src ./src
COPY ./public ./public

RUN npm ci --include=dev
RUN npm run _build

################################ Production ########################################

FROM nginxinc/nginx-unprivileged:1.24.0-alpine-slim as app-prod
USER nginx

WORKDIR /usr/share/nginx/html
# Copy the static front-end to the docker image from previous step
COPY --chown=nginx:nginx --from=app-build /home/node/weather-app/build ./

# CMD is used in contrast to ENTRYPOINT because the nginx docker image uses
# ENTRYPOINT to run the scripts located in /docker-entrypoint.d
CMD ["nginx", "-g", "daemon off;"]

