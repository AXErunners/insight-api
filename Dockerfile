FROM node:8-alpine

RUN apk add --update --no-cache \
                            git \
                            libzmq \
                            zeromq-dev \
                            python \
                            make \
                            g++

WORKDIR /insight

# Copy axecore-node
RUN git clone --branch master --single-branch --depth 1 https://github.com/axerunners/axecore-node.git /insight

# Copy config file
COPY ./axecore-node.json /insight/axecore-node.json

ARG VERSION

# Install npm packages
RUN npm ci

# Install Insight API module
RUN /insight/bin/axecore-node install @axerunners/insight-api@${VERSION}

FROM node:8-alpine

LABEL maintainer="AXErunners <info@axerunners.com>"
LABEL description="Dockerized Insight API"

COPY --from=0 /insight/ /insight

EXPOSE 3001

CMD ["/insight/bin/axecore-node", "start"]
