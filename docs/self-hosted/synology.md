Here's how you set up on SyncLounge with Docker on Synology NAS.

[jacobmix](https://gist.github.com/jacobmix) made this awesome how-to for Synology!
The original gist can be found [here](https://gist.github.com/jacobmix/32003649e06d5588dba35e5edafa5d7b)

---

First make sure you got the Docker Hub in your registry:
![Registry](https://user-images.githubusercontent.com/5995327/77686804-6398f400-6f95-11ea-97a4-693afb538c70.png)

Download the latest SyncLounge image:
![Image](https://user-images.githubusercontent.com/5995327/77686898-86c3a380-6f95-11ea-8544-bc711cec406e.png)

Launch the image, and go to advanced settings:
![Create Container](https://user-images.githubusercontent.com/5995327/77686989-abb81680-6f95-11ea-8f9e-c01ddece89d0.png)

Enable auto-restart, and make a shortcut if you want:
![Advanced Settings](https://user-images.githubusercontent.com/5995327/77687107-e0c46900-6f95-11ea-89ef-6d34b7bd3b36.png)

You can edit settings later by clicking the container, and pressing 'Edit' if it's not running.

Configure the network, and ports to use:
![Port Settings](https://user-images.githubusercontent.com/5995327/77687283-0d788080-6f96-11ea-9b5f-6b970c737b68.png)
![Network](https://user-images.githubusercontent.com/5995327/77687294-12d5cb00-6f96-11ea-9aaa-b454bd75d9c6.png)

Just use the same network as Docker, and leave them as default if you can.

Set the environment variables:
![Environment](https://user-images.githubusercontent.com/5995327/77687414-41ec3c80-6f96-11ea-9713-18c82d4a3e82.png)

Click Apply, finish the setup, an start it. It will take 20-30 minutes to start every time.

If you wanna update the container you have to re-download/overwrite the image.

Then clear the container, and restart it:
![Clear](https://user-images.githubusercontent.com/5995327/77687545-78c25280-6f96-11ea-83bd-c1bb77090513.png)

Hope this good enough to get you through the setup.

Now if you want to actually use SyncLounge:

1. Connect with `IP:PORT1/slweb`
1. Log-in with you Plex account
1. Choose your player.
1. Select Custom Server.
1. Enter `IP:PORT2/slserver`
1. Type in the room name, and password.

Then you should be good to go! You can invite people with the button at the top.
![invite](https://user-images.githubusercontent.com/5995327/77689611-e1f79500-6f99-11ea-9de0-cae30564776f.png)

Other people need access to the same episode/movie/video on their/your/someones Plex server.

You can invite people to your Plex like this:
![Plex invite](https://user-images.githubusercontent.com/5995327/77689675-f9cf1900-6f99-11ea-9da8-66114901d51b.png)

They need a Plex account before you can share your server with them. You just need to run the server, and forward the ports.

Some notes:

- You can use the `SyncLounge Player (BETA)` player in your browser.
