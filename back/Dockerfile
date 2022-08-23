FROM ruby:2.7.6

RUN curl -fsSL https://deb.nodesources.com/setup_16.x | bash - \
  && apt-get update -qq \
  && apt-get install -y nodejs \
  && npm install -g yarn

WORKDIR /pdapi
COPY Gemfile /pdapi/Gemfile
COPY Gemfile.lock /pdapi/Gemfile.lock
RUN bundle install

COPY . /pdapi
