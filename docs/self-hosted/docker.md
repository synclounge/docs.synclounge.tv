
# Docker

The official Docker container for SyncLounge can be found on [Docker Hub](https://hub.docker.com/r/starbix/synclounge) made by [Starbix](https://github.com/Starbix/)

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
