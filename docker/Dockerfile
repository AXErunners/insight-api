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
RUN git clone --branch master --single-branch --depth 1 https://github.com/axerunners/axecore-node.git .

# Copy config file
COPY axecore-node.json .

ARG VERSION

# Install npm packages
RUN npm ci

# Install Insight API module
RUN bin/axecore-node install @axerunners/insight-api@${VERSION}

FROM node:8-alpine

LABEL maintainer="AXErunners <info@axerunners.com>"
LABEL description="Dockerized Insight API"

WORKDIR /insight

# Copy project files
COPY --from=0 /insight/ .

EXPOSE 3001

CMD ["bin/axecore-node", "start"]
