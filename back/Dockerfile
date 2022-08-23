FROM ruby:2.7.5

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

RUN curl -fsSL https://deb.nodesources.com/setup_16.x | bash - \
  && apt-get update -qq \
  && apt-get install -y nodejs \
  && apt-get install -y default-mysql-client

WORKDIR /pdapi
COPY Gemfile /pdapi/Gemfile
COPY Gemfile.lock /pdapi/Gemfile.lock
RUN bundle install

COPY . /pdapi

CMD ["rails", "server", "-b", "0.0.0.0"]
