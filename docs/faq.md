hide_nav_left: true
hide_nav_right: true

# FAQ

## General

- _Do I have to have a Plex account to use SyncLounge?_
    - Yes.
- _Why do I have to log in with my Plex account?_
    - SyncLounge uses your Plex account to fetch details about your Plex Clients and Media Servers to use within the app. For security concerns, see the 'Security' section below.
- _Can I make someone else the 'host' of a room?_
    - Yes! Double-click their avatar to make them a host.

## Issues

- _I can't log in to SyncLounge_
    - This is most likely due to Popup Blocking. If you press the "Click me" button and nothing happens, make sure that your browser isn't blocking popups for the site.
- _When trying to connect, "Unable to connect" "Try disabling your adblocker" appears even though there is no adblocker or it has been disabled._
    - This indicates that SyncLounge was unable to connect to the server properly. Here are known reasons why the connection may be blocked or not work properly:
        - An adblocker, firewall, network configuration, ISP, or some other software on your computer is blocking the connection.
        - The server owner's firewall, network configuration, ISP, or some other software is blocking the connection.
        - Remote access is not enabled on the server or it isn't working properly.
- _Client X isn't working!_
    - If you use the Plex Desktop app, you may encounter issues. Try the original [Plex Media Player application](https://forums.plex.tv/t/plex-media-player/120475/100) for Windows and MacOS. Scroll down to the newest to download.
    - If the site is running using SSL (HTTPS), due to the way some of the Plex clients have been made they can only operate using HTTP. If the site allows for HTTP use, like the [hosted Synclounge does](http://app.synclounge.tv/) then try that to see if it will work.
    - If you are using the new Plex Player, Plex changed the way it operates. Try changing back to the "old player" and see if it works.
    - SyncLounge tries to maintain support as many clients as possible. However, changes to implementation on Plex's or the client's side can cause them to no longer work properly.
- _Someone in my room is getting "the quota has been exceeded" error_
    - Lower the bitrate (aka streaming quality) on the client.

If any of the above don't answer your question or address your issue, check the [Issue Tracker](https://github.com/samcm/synclounge/issues) and [Discord](https://discord.gg/fKQB3yt) to see if your issue has been reported already. If not, let us know!

## Security

- _Won't you have access to my username, password?_
    - No. SyncLounge uses Plex's OAuth to log in, so your username and password are never seen by SyncLounge.
- _Won't you have access to my Plex Account?_
    - All details provided by Plex are stored client side (in your browser). Absolutely none of your **confidential** data is sent to our server. You can verify this by inspecting the Network tab within Chrome developer tools. If you would like, you can [host SyncLounge yourself](/self-hosted/getting-started/).
- _What is sent then?_
    - When you've connected to a SyncLounge room, a few details are sent back and forth to the SyncLounge Server to enable syncing. The data sent contains the following:
        - Plex Username
        - Plex User Thumbnail URL
        - Content playing title (Eg. Lord of the Rings: The Fellowship of the Ring)
        - Current timestamp (Eg. 00:35:02)
        - Maximum timestamp (Eg. 03:48:18)
            - Host content ratingKey
            - Host machineIdentifier
        - Playerstate (Eg. paused, stopped, playing)
        - Client response time (Ping time between you and your Plex Client)
    - SL Server address, SL Server Room and SL Server Room Password are sent to the WebApp when you join a room to create shortened invite links.
- _What about the public server provided by SyncLounge? Is my data safe?_
    - As noted above, SyncLounge gets none of your **confidential** data and we log absolutely nothing to disk. Data is kept within the room instance until you leave or the server restarts. We have enabled SSL on our public servers but if privacy is a concern for you we strongly suggest [running your own server](/self-hosted/getting-started/).
- _Speaking of SSL, why isn't the site served over HTTPS?_
    - By default SyncLounge is served via HTTP. While we do offer HTTPS, doing so forces modern browsers in to blocking all HTTP connections. This effectively stops all communication with some Plex Clients that only operate using HTTP.