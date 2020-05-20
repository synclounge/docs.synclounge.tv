
# Running with Docker

There are two containers for running SyncLounge using Docker: LinuxServer.io's container and Starbix's container.

## LinuxServer.io's container

The LinuxServer.io container for SyncLounge is located at [https://hub.docker.com/r/linuxserver/synclounge](https://hub.docker.com/r/linuxserver/synclounge) and full documentation can be found there.

If you are running linux, [DockSTARTer](https://dockstarter.com/) supports this container and makes it quick and easy to get up and running with Docker. [DockSTARTer SyncLounge documentation](https://dockstarter.com/apps/synclounge/) will help you get set up.

Even if you aren't using DockSTARTer, there is some information under the [Advanced](https://dockstarter.com/apps/synclounge/#advanced) that may be useful.

## Starbix's container

The original Docker container for SyncLounge can be found on [Docker Hub](https://hub.docker.com/r/starbix/synclounge) made by [Starbix](https://github.com/Starbix/).

Note: If you have issues with the ENV variables in [Settings](/self-hosted/settings/), trying using the argument syntax instead for the environment variable syntax. E.g. - `webroot` instead of `WEB_ROOT`

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

If you are running [DockSTARTer](https://dockstarter.com/), you can run this container by using [overrides](https://dockstarter.com/advanced/overrides/) to add SyncLounge. Here is a sample override file:

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
