# Reverse Proxy

If you want to host SyncLounge on your own domain and not having to give out your IP address, you will want to use a reverse proxy.
There are many different options such as nginx, haproxy, traefik, etc.

## Nginx

If you are using the [Let's Encrypt container by LinuxServer.io (LSIO)](https://hub.docker.com/r/linuxserver/letsencrypt), you can use the provided configs found in [LSIO's reverse proxy repo](https://github.com/linuxserver/reverse-proxy-confs).

If you aren't using [LSIO's Let's Encrypt container](https://hub.docker.com/r/linuxserver/letsencrypt), the configurations found in [LSIO's reverse proxy repo](https://github.com/linuxserver/reverse-proxy-confs) for [subdomain](https://github.com/linuxserver/reverse-proxy-confs/blob/master/synclounge.subdomain.conf.sample) and [subfolder](https://github.com/linuxserver/reverse-proxy-confs/blob/master/synclounge.subfolder.conf.sample) configurations will still be helpful.

**NOTES:**

- The subdomain conf assumes that you are running the webapp with the default webroot (`/`) and server with default serverroot (`/slserver`).
- The subfolder conf assumes that you are running the webapp with the webroot set to `/slweb` and server with default serverroot (`/slserver`).
- Both assume that you are using the container name `synclounge` and default ports.
- If you have changed any of the above, you will need to change the conf file you are using

## Apache

Users have had luck with the following:

## Subdomain

```conf
#SyncLounge Server
ProxyPass /slserver/socket.io http://<IP>:8089/slserver/socket.io/

ProxyPass /slserver http://<IP>:8089/slserver/
ProxyPassReverse /slserver http://<IP>:8089/slserver/

# SyncLounge Web
ProxyPass / http://<IP>:8088/
ProxyPassReverse / http://<IP>:8088/
```

## Subfolder

If you have a working subfolder created, please contribute!
