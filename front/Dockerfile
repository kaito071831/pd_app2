FROM node:16

RUN apt-get update -qq && npm install -g yarn

WORKDIR /frontapp
COPY . /frontapp

RUN yarn install
