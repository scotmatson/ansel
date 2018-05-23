FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  unoconv \
  ffmpeg \
  imagemagick \
  curl

COPY package*.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8080
CMD [ "cmd", "server.js" ]
