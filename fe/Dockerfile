FROM node:20.11.1-alpine as fe-base

# Install dependencies
RUN apk update && apk add curl

############################### Development ########################################

FROM fe-base as fe-dev

# Set the workdir
WORKDIR /home/node/weather-app

################################ Production ########################################
