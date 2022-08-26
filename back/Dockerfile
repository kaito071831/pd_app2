FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

ENV TZ Asia/Tokyo
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja

RUN apt-get update && apt-get install -y build-essential git curl wget libssl-dev libreadline-dev zlib1g-dev openssl libmysqlclient-dev
RUN git clone --depth=1 https://github.com/rbenv/ruby-build
RUN PREFIX=/usr/local ./ruby-build/install.sh
RUN rm -rf ruby-build
RUN ruby-build 2.7.5 /usr/local
RUN mkdir /pdapi
WORKDIR /pdapi

COPY Gemfile /pdapi/Gemfile
COPY Gemfile.lock /pdapi/Gemfile.lock
RUN bundle install
COPY . /pdapi

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
