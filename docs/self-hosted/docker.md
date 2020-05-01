
# Docker

The official Docker container for SyncLounge can be found on [Docker Hub](https://hub.docker.com/r/starbix/synclounge) made by [Starbix](https://github.com/Starbix/)

Note: If you have issues with the ENV variables in [Settings](/self-hosted/settings/), trying using the argument instead for the environment variable.

The following tags are available:

- latest / alpine: webapp and server based on alpine
- server: only server based on alpine
- dev: development version of webapp and server based on alpine
- nginx: latest + nginx reverse proxy

To use the latest

```bash
docker run \
  --name=synclounge \
  -p 8088:8088 \
  -p 8089:8089 \
  -e DOMAIN=example.com \
  starbix/synclounge
```

To use a tagged version:

```bash
docker run \
  --name=plextogether_nginx \
  -p 80:80 \
  -e DOMAIN=example.com \
  starbix/synclounge:TAG
```

## Docker on Linux with DockSTARTer

If you are running linux, check out [DockSTARTer](https://dockstarter.com/)! DockSTARTer's main goal is to make it quick and easy to get up and running with Docker.

DockSTARTer is in the process of [testing to include it with the configuration](https://github.com/GhostWriters/DockSTARTer/issues/818).  
Until then, you can use [overrides](https://dockstarter.com/advanced/overrides/) to add SyncLounge. Here is a sample override file:

```yaml
version: "3.4"
services:
  synclounge:
    image: starbix/synclounge
    container_name: synclounge
    environment:
      - DOMAIN=synclounge.domain.tld
    logging:
      driver: json-file
      options:
        max-file: ${DOCKERLOGGING_MAXFILE}
        max-size: ${DOCKERLOGGING_MAXSIZE}
    ports:
      - 8088:8088
      - 8089:8089
    restart: unless-stopped
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${DOCKERCONFDIR}/synclounge/settings.json:/opt/synclounge/settings.json
```
