# syntax = docker/dockerfile:1.0-experimental
FROM archlinux:base-devel as builder
RUN \
sed -i "s/#IgnorePkg.*=/IgnorePkg = filesystem libsystemd/g" /etc/pacman.conf && \
pacman -Syuq --noconfirm --needed hugo autoconf automake m4 grep gcc libjpeg-turbo libpng git openssh chromium python2 python npm node-gyp yarn && \
mkdir -p /root/.config && \
echo "--no-sandbox" > /root/.config/chromium-flags.conf

# installs npm packages needed for gulp in a more cacheable way
WORKDIR /cache/
COPY package*.json ./
RUN yarn && yarn run browserslist --update-db
ONBUILD RUN ln -s /cache/node_modules ./node_modules
