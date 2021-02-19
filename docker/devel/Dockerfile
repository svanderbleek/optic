FROM alpine:3.13

RUN \
  apk --no-cache --update upgrade && \
  apk --no-cache add ca-certificates

# devel image begins here, would FROM core
RUN \
  apk --no-cache add \
    bash curl wget jq git openssh-client \
    musl-dev gcc \
    nodejs yarn npm

# task
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# rust
RUN \
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

