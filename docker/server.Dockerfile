# syntax = docker/dockerfile:1.0-experimental
FROM registry.gitlab.com/candoizo/modern-blog/build:rolling as gen
COPY . .
ARG NODE_ENV
# basically once i removed all the old files from here it disappeared in git
# since it was not locally i didnt see and that was causing days worth of freezing
RUN \
mkdir -p public static test && \
yarn run browserslist --update-db && \
yarn run gulp build

# creates a test webserver
FROM alpine:3.12.3
RUN \
apk update && \
apk add darkhttpd
COPY --from=gen /cache/public ./public
CMD ["/usr/bin/darkhttpd", "/public", "--port", "1313"]
