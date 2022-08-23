FROM node:16

RUN apt-get update

WORKDIR /frontapp
COPY . /frontapp

RUN yarn install

CMD [ "yarn", "dev" ]
