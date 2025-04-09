FROM node:20-alpine as build

# Install necessary packages for SSH
RUN apk update && \
    apk add openssh-client git && \
    mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh


RUN apk add nodejs npm

# Add SSH key build argument
ARG SSH_PRIVATE_KEY
ARG SSH_KNOWN_HOSTS


# Add the keys and set permissions
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && \
    echo "${SSH_KNOWN_HOSTS}" > /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 644 /root/.ssh/known_hosts

WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app

# Remove SSH keys after dependencies are installed
RUN rm -rf /root/.ssh/

RUN yarn build

# FROM nginx:latest
# COPY default.conf /etc/nginx/conf.d/
# COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
