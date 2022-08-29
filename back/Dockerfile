FROM ruby:3.1.2

ENV TZ Asia/Tokyo
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja

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
