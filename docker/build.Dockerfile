# syntax = docker/dockerfile:1.0-experimental
FROM archlinux:base-devel as builder
RUN \
# pacman -Syuq --noconfirm --needed hugo autoconf automake m4 grep gcc libjpeg-turbo libpng git yarn
pacman -Syuq --noconfirm --needed hugo git yarn

# installs npm packages needed for gulp in a more cacheable way
WORKDIR /cache/
COPY package*.json ./
RUN yarn
ONBUILD RUN ln -s /cache/node_modules ./node_modules
