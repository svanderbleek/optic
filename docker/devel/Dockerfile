FROM alpine:3.13

RUN \
  apk --no-cache --update upgrade && \
  apk --no-cache add ca-certificates

# devel image begins here, would FROM core
RUN \
  apk --no-cache add \
    bash curl wget jq \
    nodejs yarn

RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin
