[joecot](https://gist.github.com/joecot) made this awesome how-to for linux!
The original gist can be found [here](https://gist.github.com/joecot/2b6fb52f72ca8022cacc4543fe1bed1b)

---

This is a quick howto for [self-hosting](/self-hosted/getting-started/) SyncLounge, a useful tool for hosting watch parties for your Plex server, on Linux natively.

If you just want to host a plex party, you can use the public [app.synclounge.tv](http://app.synclounge.tv/) servers.

If you want to use Docker instead of mucking about with Node, see [Running with Docker](/self-hosted/docker/).

This is for running the NodeJS yourself.

You don't need programming experience to set SyncLounge up, but without a passable experience configuring linux, you're probably better off using synclounge.tv instead.

## Server Pre-Reqs

* **Linux**: These docs assume a debian/ubuntu distro, but it should be easy enough to install packages on the distro of your choice. nodejs should run on Windows, and feel free to write a different guide for that.
* **A domain** pointed at your server in DNS. Here I'll be using synclounge.yourdomain.com as the example domain, but whichever one you use should point at your server. You could also just use your server's public IP if you don't have a domain
* **nginx** or another comparable web server. I prefer nginx. Any web server that works for reverse proxying (including web sockets!) will be fine, but I'm only giving config for nginx, since nginx also handles web sockets well especially. Feel free to hit me up with a working apache2 or similar config
* **git** To check out the synclounge code. If you're running ubuntu/debian, this is as easy as: `sudo apt-get install git`
* **nodejs and npm** with Node at least v8.4.0.
  * Preferred method is probably using nvm (node version manager), which will install a local version of node in your home directory. [Here's a guide for NVM installation.](https://tecadmin.net/install-nodejs-with-nvm/)
  * You can use the distro package version most likely, or at least find a repo or PPA for them. [Here's a sample Ubuntu guide.](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) Note that if using packages, you'll need to use sudo when we install global npm packages.
  * Either way, run, `node -v` and `npm -v` to confirm you have them.

**Note**: While you can run synclounge over https with an ssl certificate, I'm not going to do that here. You could easily use https instead of http in your URL, and setup your ssl certificate in your web server config. But unless you setup your plex server using https as well, connecting to your plex will fail.

## Setting up SyncLounge Code Directory

* Check out the synclounge project: `git clone https://github.com/samcm/synclounge`
* enter directory: `cd synclounge`
* install node libraries using npm: `npm install`

## settings.json file

See the [Settings page](/self-hosted/settings/) for more detail on each of the settings. While you can potentially set these using command line arguments or environmental variables, editing the settings.json file directly is by far the most reliable way.
Here's an example settings.json file:

```json
    {
       "webroot":"",
       "serverroot":"",
       "accessUrl":"http://synclounge.yourdomain.com",
       "webapp_port":8280,
       "server_port":8281,
       "authentication":{
          "mechanism":"plex",
          "type":[
             "server"
          ],
          "authorized":[
             "YOUR_PLEX_MACHINE_ID"
          ]
       },
       "servers":[
          {
             "name":"Your Super Cool Plex Party Server",
             "location":"Space, the Final Frontier",
             "url":"http://synclounge.yourdomain.com",
             "logo":""
          }
       ],
       "autoJoin":false,
       "autoJoinServer":"",
       "autoJoinRoom":"",
       "autoJoinPassword":""
    }
```

I've made some opinionated assumptions for simplicity here, and again read the whole SyncLounge readme for more details, but the highlights are:

* **accessUrl** - Set this to the url you want synclounge to be at, and replace `http://synclounge.yourdomain.com` with that wherever you see it.
* **Server ports**. These can be whatever you want. I've changed them from the default 8080 and 8081 since they're most commonly used. If you change these just keep them in mind when we do nginx/apache setup
  * `webapp_port` - The local port the web frontend will be served at.
  * `server_port` - The local port the backend will be served at.
* **authentication** - sets who is allowed to use your SyncLounge. I have this set so that if someone has access to your plex server, they have access to your synclounge server (presuming you're trying to stream from your own plex server library!) If you want to do that, set `YOUR_PLEX_MACHINE_ID` to your server ID.
* If you launch plex.tv and go to Settings -> Manage -> Libraries, you can see your server ID in the URL. It'll be the XXXX in `https://app.plex.tv/desktop#!/settings/server/XXXX/manage/libraries` . Put that hex code as your plex machine id.
* If you don't want to authenticate that users have access to your plex server, you can either remove the authentication part of the settings, or replace it with `"authentication":{"mechanism":"none"},`
  * **HOWEVER**, the user will *still* need to log in with their plex account, because SyncLounge opens videos via plex using their plex account. Leaving authentication as none just means they can log in to your SyncLounge without their user having been given shared access to your plex server. However, unless they have access to a different plex server with the exact same videos you're trying to play, SyncLounge won't work for them anyway. I'd say for 95% of use cases, you're trying to use SyncLounge with your own plex server you've shared with other people, so authenticating they have access to your plex server let's you know there's a problem when they go to sign in, as opposed to waiting til they get into the room with you and nothing will play for them.
  * In 95% of cases, you want them to give you their plex account email address, you want to add them to sharing in your plex server (and them confirm it via email), and *then* you want to give them the SyncLounge invite link. If you fall into that case, leave the authentication as I described and add your machine id in.
* **servers** - I'm replacing the default server list with the custom server. If you want the other servers you can set this server object to `customServer` as shown in the official docs. The upside of replacing all the servers is your users can skip picking a server. Set the name, location, and url details here (the url being the same as what you set above), and optionally a thumbnail which won't get shown if you only have one server anyway.

## Build SyncLounge web files

Now that we have the settings.json setup, it's time to build the web frontend files. This is easy. Run: `npm run build`
Then go get a drink or a snack, because it will take a minute. You may or may not need to re-run the build if you edit settings.json later, but probably not? I haven't tested that out.

## Run SyncLounge

### To Test

This is just to test out that it's all working while you can see the console output. If you're a confident person you can just switch to the Production options. But you might want to try these if it's not working.
You need to both run the SyncLounge web and server instances. You can do this is multiple ssh windows, but I suggest using `screen`. If you don't have screen installed, you can get it with `sudo apt-get install screen` . As a quick screen tutorial:

* List any existing screen sessions: `screen -ls`
* Open a new named screen session: `screen -S YourName`
* Send the screen session you're in to the background: Hold down the CTRL key, then press and release A, then D
* Resume a screen session running in the background: `screen -r YourName`
So when running the server commands I suggest running `screen -S sl-server` to open a screen for that, then CTRL-A-D to get out of it, then `screen -S sl-web` to run the web commands. Then you can rejoin the screens with `screen -r sl-web` or `screen -r sl-server` . But I'm a guide writer, not a cop, so do whatever's easiest for you.

To run the synclounge server, run: `node server.js` and leave it running. You'll see output like:

```bash
Setting up with serverRoot of /slserver
SyncLounge Server successfully started on port 8281
Connected users: 0
```

With whatever server port you set.
To run the synclounge web files, run: `node webapp.js` and leave it running. You'll see it output your Settings and such, followed by:

```bash
SyncLounge WebApp successfully started on port 8280
Access URL is http://synclounge.yourdomain.com
```

With whatever url and web port you set

## Web Server Setup

### NGINX

Here's a sample nginx site config (this is essentially the same as the one in the synclounge readme):

```conf
server {
  listen 80;
  server_name synclounge.yourdomain.com;
  # you can make a separate access log if you want,
  # or just leave it to the default nginx/access.log
  #access_log /var/log/nginx/synclounge.yourdomain.com_access.log;

  proxy_redirect off;
  proxy_buffering off;
  location / {
    include proxy_params;
    proxy_pass http://localhost:8280;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location /slserver {
    include proxy_params;
    proxy_pass http://localhost:8281/slserver;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

This should go in your `/etc/nginx/sites-available/` directory, likely named `synclounge.yourdomain.com.conf` . Update the domain you're using in the config and the filename, and if you changed web or server ports in your synclounge config, change them in the location / and /slserver sections respectively.

This also assumes you have a `/etc/nginx/proxy_params` file. If you don't, make one with:

```bash
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Once you have the config setup how you want:

* Symlink it to sites-enabled: `sudo ln -s /etc/nginx/sites-available/synclounge.yourdomain.com.conf /etc/nginx/sites-enabled/`
* Check your nginx config for errors: `sudo nginx -t`
* If everything looks good, reload nginx with your changes: `sudo service nginx reload`

Then try going to your synclounge install in your browser!

### For "Production" (Serious Business Plex Watching)

Once you've tested out running this and see it's working (or immediately if you're feeling lucky), you probably want this to just run in the background all the time, including starting up with your server. To do that we'll be using a node utility called **pm2**

To install pm2 run `npm install -g pm2` to install it globally. If you're not running npm with nvm, you probably need to do `sudo npm install -g pm2`

If you're running the server or web files still from testing, stop them (just ctrl-c will do it).

Then from the synclounge directory, we just need to run 2 commands:

* `pm2 start webapp.js --name=sl-web`
* `pm2 start server.js --name=sl-server`

If you run `pm2 list`, you should see two processes running:

```bash
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 2   │ ◉ sl-server  │ default     │ 2.0.0   │ fork    │ 4521     │ 107m   │ 0    │ online    │ 0.1%     │ 17.2mb   │ joe      │ disabled │
│ 1   │ ◉ sl-web     │ default     │ 2.0.0   │ fork    │ 4548     │ 107m   │ 2    │ online    │ 0.1%     │ 12.8mb   │ joe      │ disabled │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

Now go try your synclounge site again and confirm it's still working.

If it's not working, you can still see the output from the programs in the pm2 logs. look in `~/.pm2/logs/` for the output and error logs for each of your processes.

If it's working, you probably want this to launch on startup now. To do that, first run `pm2 save`, which will save your 2 processes to run when pm2 starts up. Then call `pm2 startup` . pm2 will give you a command to run to add your user's pm2 to the server setup. It'll probably look something like this:

```bash
sudo env PATH=$PATH:/home/user/.nvm/versions/node/v12.7.0/bin /home/user/.nvm/versions/node/v12.7.0/lib/node_modules/pm2/bin/pm2 startup systemd -u user --hp /home/user
```

Run that, and now your pm2 will start with the server.

## That's all folks

If something doesn't appear to work, check the output of the web or server terminal/log outputs, or your nginx access and error log, and [ask on Discord](https://discord.gg/Cp9RPSJ).
