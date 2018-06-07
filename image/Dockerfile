FROM node:8-slim

MAINTAINER Scot Matson <sjpmatson@gmail.com>

RUN apt-get update && apt-get upgrade -y

RUN apt-get update && apt-get install -yq \
  build-essential \
#  curl \
#  ffmpeg \ 
  g++ \
  imagemagick \
  libgconf-2-4 \
  make \
  unoconv

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

# The version of unoconv that ships with debian:8-slim has a known bug that causes the first execution to fail,
# this has been fixed on later releases. We can avoid exposing this error by initiating the first call ourselves.
# https://github.com/dagwieers/unoconv/issues/241
RUN unoconv foo; exit 0

EXPOSE 1902

CMD ["npm", "start"]
