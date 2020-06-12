# Settings

The following can be used to change some of the settings in the application via command-line arguments, environment variables (ENV), or the `settings.json` file.  
Arguments are passed to the application by using `--<argument>=<value>` when running the application.  
ENV variables are mostly for Docker but can be set locally on your system.
The `settings.json` file, found in the root of your SyncLounge folder, is used by both the Server and Webapp. When modifying this file, you should make sure that it is valid by using something like [JSONLint](https://jsonlint.com/).

NOTE: Argument and ENV should be able to be used interchangeably. If you have issues with the ENV, use the argument value in its place.

## Server

| Argument | ENV | Description |
| ------ | ------ | ------ |
| servers | SERVERS | Set your own servers list. See below for more information.<br>Optional |
| serverroot | SERVER_ROOT | Change the base URL of the server app.<br>Ex - `/server`.<br>Defaults to `/slserver` |
| server_port | SERVER_PORT | Change the port the server app uses.<br>Defaults to `8089` |

## Webapp

| Argument | ENV | Description |
| ------ | ------ | ------ |
| webroot | WEB_ROOT | Change the base URL of the web app.<br>Ex - `/lounge` |
| webapp_port | WEB_PORT | Change the port the web app uses.<br>Defaults to `8088` |
| accessUrl | WEB_ACCESSURL | Set the URL the web app uses for things like invites.<br>Examples:<br>`http(s)://IP:8088`<br>`http(s)://mysynclounge.com`<br>If `webroot` is set<br>`http(s)://IP:8088/<webroot>`<br>`http(s)://mysynclounge.com/<webroot>` |
| autoJoin | AUTOJOIN_ENABLED | Set to `true` to enable auto joining.<br>Defaults to `false` |
| autoJoinServer | AUTOJOIN_SERVERURL | Set this to the server URL you want the user to auto join.<br>Required if auto join is enabled.<br>Examples:<br>`http(s)://IP:8089/slsever`<br>`http(s)://mysynclounge.com/slsever`<br>If `serveroot` or `server_port` are set<br>`http(s)://IP:SERVER_PORT/<serverroot>`<br>`http(s)://mysynclounge.com/<serverroot>` |
| autoJoinRoom | AUTOJOIN_ROOM | Set this to the room name in the server that you want the users to auto join.<br>Optional |
| autoJoinPassword | AUTOJOIN_PASSWORD | Set this to the room's password, if it has one.<br>Optional |
| authentication | AUTHENTICATION | Configure authentication for the server. See below for more information.<br>Optional |
| customServer | CUSTOM_SERVER | Override the custom server entry in the servers list. See below for more information.<br>Optional |

### Authentication

To enable authentication, the following setting and format is used

```json
"authentication": {
    "mechanism": "plex",
    "type": ["server", "user"],
    "authorized": [
      "PLEX_SERVER_MACHINE_ID",
      "PLEX_USER_EMAIL",
      "PLEX_USER_NAME",
    ]
  }
```

| Field | Description |
| ------ | ------ |
| mechanism | Specifies how SyncLounge should authenticate a user. This is mostly for future-proofing to allow other authentication mechanisms to be provided.<br>Values:<br>`plex` - Authenticate against Plex<br>Defaults to `none` |
| type | This determines how the mechanism provides authentication<br>Values: `server`, `user`<br>`server` checks against the plex server machine identifier (`PLEX_SERVER_MACHINE_ID`). If the user has access to a server matching any of the IDs in the `authorized` list, they will be granted access. See "Get your Plex Server's Machine Identifier" below for details.<br>`user` checks against the user's email (`PLEX_USER_EMAIL`) or username (`PLEX_USER_NAME`). If either matches a value in the `authorized` list, they will be granted access. |
| authorized | This is a list of information for who is authorized, per the above setting. |

#### Get your Plex Server's Machine Identifier

To get the Plex Server's Machine Identifier (`machineIdentifier`) for your server you will need to [get your Plex Authentication Token](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/) and put this into your browser, replacing `YourTokenGoesHere` with your token:  
`https://plex.tv/pms/servers.xml?includeHttps=1&X-Plex-Token=YourTokenGoesHere`

You should then see something like this:

```xml
<MediaContainer friendlyName="myPlex" identifier="com.plexapp.plugins.myplex" machineIdentifier="IGNORE THIS" size="1">
  <Server accessToken="X" name="SERVER NAME" address="X" port="X" version="X" scheme="http" host="X" localAddresses="X" machineIdentifier="PLEX_SERVER_MACHINE_ID" createdAt="X" updatedAt="X" owned="1" synced="0"/>
</MediaContainer>
```

In the entry that starts with `<Server` find the one that matches your server name and then find the `machineIdentifier` attribute.

If you can't get the above to work, you can get the value from your server by opening `config/Library/Application Support/Plex Media Server/Preferences.xml` and grabbing the `ProcessedMachineIdentifier` value found there.

### Customize the server list

#### Server object

The servers list can be modified with your own entry for just the Custom Server in the servers list or for the entire list of servers.

The full server object looks like this:

```json
{
    "name": "",
    "location": "",
    "url": "",
    "image": "",
    "defaultRoom": "",
    "defaultPassword": ""
  }
```

| Field | Description |
| ------ | ------ |
| name | Specifies the text for the server name. |
| location | Specifies the text for the server location. |
| url | Specifies the server url. This should match your SyncLounge server URL and will look like `http(s)://<DOMAIN or IP:PORT>/<SERVERROOT>`. |
| image | Specifies the URL of the image to use. |
| defaultRoom | Specifies the name of the room to send the user to after clicking "Connect".<br>Optional |
| defaultPassword | Specifies the password of the room, if needed.<br>Optional |

#### Customize the Custom Server entry

The Custom Server entry can be modified by adding this to your settings. This takes a single server object and will override the the custom server in the server list.

```json
"customServer": {
  "name": "Custom Server 1",
  "location": "Custom Location",
  "url": "https://mycustomserver.com/slserver",
  "image": "https://mycustomserver.com/logo.png"
}
```

![Custom Server Example](https://user-images.githubusercontent.com/1524443/76433720-19a3f180-638b-11ea-8c20-1997728e8325.png)

#### Customize the entire list

The entire servers list can be modified with your own list of servers. If this setting is provided, it will ignore the `customServer` setting above. Also, if only one server is provided, it will automatically join it!

```json
"servers": [
  {
    "name": "Custom Server 1",
    "location": "Custom Location",
    "url": "https://1.mycustomserver.com/slserver",
    "image": "https://mycustomserver.com/logo.png"
  },
  {
    "name": "Custom Server 2",
    "location": "Custom Location",
    "url": "https://2.mycustomserver.com/slserver",
    "image": "https://mycustomserver.com/logo-2.png",
    "defaultRoom": "DefaultRoom"
  },
  {
    "name": "Custom Server 3",
    "location": "Custom Location",
    "url": "https://3.mycustomserver.com/slserver",
    "image": "https://mycustomserver.com/logo-3.png",
    "defaultRoom": "DefaultRoom",
    "defaultPassword": "DefaultPassword123"
  }
]
```

![Custom Server List Example](https://user-images.githubusercontent.com/1524443/76433958-6daed600-638b-11ea-9cf6-41ea79182dbc.png)
