hide_nav_left: true
hide_nav_right: true

# FAQ

## General

- _Do I have to have a Plex account to use SyncLounge?_

    Yes.

- _Why do I have to log in with my Plex account?_

    SyncLounge uses your Plex account to fetch details about your Plex Clients and Media Servers to use within the app. For security concerns, see the 'Security' section below.

- _Do the other users in my room need access to my Plex Server?_

    You don't have to share your Plex server if they have access to the same media on their own or another Plex server. If they don't have access to a Plex server with the same media, you will need to share your Plex server with them.

- _What clients are supported?_

    SyncLounge tries to maintain support as many clients as possible. However, changes to implementation on Plex's or the client's side can cause them to no longer work properly. Below are the supported clients and some known issues and solutions, where possible. If a solution doesn't work, an update probably broke its compatibility.

      - If the site is running using SSL (HTTPS), due to the way some of the Plex clients have been made they can only operate using HTTP. If the site allows for HTTP use, like the [hosted Synclounge does](http://app.synclounge.tv/) then try that to see if it will work.
      - **Plex Media Player**: The original [Plex Media Player](https://forums.plex.tv/t/plex-media-player/120475/100) for Windows and MacOS is, as of writing this, still supported. Follow the link and scroll down to the newest to download.
      - **Plex Desktop app**: You may encounter issues using this. Try the original Plex Media Player application above for better results.
      - **New Plex Player**: If you are using the new Plex Player, Plex changed the way it operates. Try changing back to the "old player" and see if it works.
      - **Android based players (Roku, Android TV, Fire TV, etc.)**: These players can't remote start media properly. Some have had success starting the media and pausing it, then having the host start the media.
      - **AppleTV**: Plex must be open before trying to connect.
      - **Plex Home Theater**
      - **OpenPHT**
      - **Rasplex**
      - **iOS (iPhone & iPad)**

    Unsupported or Broken:

      - **Smart TVs**
      - **Plex Web Player (Chrome/Safari/Firefox)**
      - **Xbox**
      - **Playstation**

- _How do I do X when using SyncLounge?_

    If you are trying to figure out how to do something when *using* SyncLounge, check the [how-to](/how-tos/how-tos/) section of the documentation. This will show you how to change hosts, user Party Pausing, etc.

    If you are trying to figure out how to do something when *running* SyncLounge, check the [how-to](/how-tos/how-tos/) and [Self-hosting](/self-hosted/getting-started/) sections. This will tell you how to setup and configure your servers.

## Common Issues

- _I can't log in to SyncLounge_

    This is most likely due to Popup Blocking or an Adblocker. If you press the "Click me" button and nothing happens, make sure that your browser isn't blocking popups for the site. If you get a new window with the Plex logo, but nothing else happens, make sure that you don't have an AdBlocker or other plugin that is interfering with Plex completing the OAuth request.

- _My client isn't working!_

    See _What clients are supported?_ for information.

- _When trying to connect to my server, "Unable to connect" "Try disabling your adblocker" appears even though there is no adblocker or it has been disabled._

    This indicates that SyncLounge was unable to connect to the server properly. Here are known reasons why the connection may be blocked or not work properly:

      - An adblocker, firewall, network configuration, ISP, or some other software on your computer is blocking the connection.
      - The server owner's firewall, network configuration, ISP, or some other software is blocking the connection.
      - Remote access is not enabled on the server or it isn't working properly. To enable remote access or to check if remote access is enabled succesfully, see the [Plex's Remote Access article](https://support.plex.tv/articles/200289506-remote-access/)

- _Someone in my room is getting "the quota has been exceeded"_
- _The SyncLounge player is continually buffering_
- _I'm getting the message `Failed to execute 'appendBuffer' on 'SourceBuffer': The SourceBuffer is full, and cannot free space to append additional buffers.`

    Lower the bitrate (aka streaming quality) on the client. If you are using the SyncLounge Player, you can do this by clicking the settings cog in the upper-right of the player.

- _The media could not be loaded, either because the server or network failed or because the format is not supported_

    Turn off force transcode by going to the menu in the top left > synclounge settings > force transcode

- _Someone in my room is getting "Failed to find a compatible copy of `<MEDIA_NAME>`. If you have access to the content try manually playing it."_

    SyncLounge is unable to retrieve information for the currently selected media on the server the user has access to. This is usually caused by the user not having access to the media that the host is playing. See _Do the other users in my room need access to my Plex Server?_ for more information.

If any of the above don't answer your question or address your issue, see the How-to: [Report an Issue](/how-tos/report-an-issue/) page.

## Security

- _Won't you have access to my username, password?_

    No. SyncLounge uses Plex's OAuth to log in, so your username and password are never seen by SyncLounge.

- _Won't you have access to my Plex Account?_

    All details provided by Plex are stored client side (in your browser). Absolutely none of your **confidential** data is sent to our server. You can verify this by inspecting the Network tab within Chrome developer tools. If you would like, you can [host SyncLounge yourself](/self-hosted/getting-started/).

- _What is sent then?_

    When you've connected to a SyncLounge room, a few details are sent back and forth to the SyncLounge Server to enable syncing. The data sent contains the following:

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

    As noted above, SyncLounge gets none of your **confidential** data and we log absolutely nothing to disk. Data is kept within the room instance until you leave or the server restarts. We have enabled SSL on our public servers but if privacy is a concern for you we strongly suggest [running your own server](/self-hosted/getting-started/).

- _Speaking of SSL, why isn't the site served over HTTPS?_

    By default SyncLounge is served via HTTP. While we do offer HTTPS, doing so forces modern browsers in to blocking all HTTP connections. This effectively stops all communication with some Plex Clients that only operate using HTTP.
