# Reverse Proxy

If you want to host SyncLounge on your own domain and not having to give out your IP address, you will want to use a reverse proxy.
There are many different options such as nginx, haproxy, traefik, etc.

## Nginx

If you are using the [Let's Encrypt container by LinuxServer.io (LSIO)](https://hub.docker.com/r/linuxserver/letsencrypt), you can use the provided configs found in [LSIO's reverse proxy repo](https://github.com/linuxserver/reverse-proxy-confs).

If you aren't using [LSIO's Let's Encrypt container](https://hub.docker.com/r/linuxserver/letsencrypt), the configurations found in [LSIO's reverse proxy repo](https://github.com/linuxserver/reverse-proxy-confs) for [subdomain](https://github.com/linuxserver/reverse-proxy-confs/blob/master/synclounge.subdomain.conf.sample) and [subfolder](https://github.com/linuxserver/reverse-proxy-confs/blob/master/synclounge.subfolder.conf.sample) configurations will still be helpful.

