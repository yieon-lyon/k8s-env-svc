FROM node:16.13.0

# inspector check
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y apt-transport-https ca-certificates curl

RUN curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list
RUN apt-get update && \
    apt-get install -y kubectl

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

RUN yarn

WORKDIR /usr/src/app

RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
