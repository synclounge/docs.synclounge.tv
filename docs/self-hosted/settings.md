# Settings

## Arguments and ENV variables

The following can be used to change some of the settings in the application. Arguments are passed to the application by using `--<argument>=<value>` when running the application. ENV variables are mostly for Docker but can be set locally on your system.

| Argument | ENV | Description |
| ------ | ------ | ------ |
| webroot | WEB_ROOT | Change the base URL of the web app. Ex - `/lounge` |
| webapp_port | WEB_PORT | Change the port the web app uses. Defaults to `8088` |
| accessUrl | WEB_ACCESSURL | Set the URL the web app uses for things like invites. Ex - `http://mysynclounge.com` |
| autoJoin | AUTOJOIN_ENABLED | Set to `true` to enable auto joining. Defaults to `false` |
| autoJoinServer | AUTOJOIN_SERVERURL | Set this to the server URL you want the user to auto join. Required if auto join is enabled. Ex - `http://mysynclounge.com/slserver` |
| autoJoinRoom | AUTOJOIN_ROOM | Set this to the room name in the server that you want the users to auto join. Optional |
| autoJoinPassword | AUTOJOIN_PASSWORD | Set this to the room's password, if it has one. Optional |
| authentication | AUTHENTICATION | Configure authentication for the server. See below for more information. Optional |
| customServer | CUSTOM_SERVER | Override the custom server entry in the servers list. See below for more information. Optional |
| servers | SERVERS | Set your own servers list. See below for more information. Optional |
| serverroot | SERVER_ROOT | Change the base URL of the server app. Ex - `/server`. Defaults to `/slserver` |
| server_port | SERVER_PORT | Change the port the server app uses. Defaults to `8089` |

## Authentication

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

- `mechanism` specifies how SyncLounge should authenticate a user. This is mostly for future-proofing to allow other authentication mechanisms to be provided. Defaults to `none`.
- `type` is mechanism dependent. Since `plex` is the only one currently, either or both `server` and `user` can be specified.
  - `server` checks against the plex server machine ID (`PLEX_SERVER_MACHINE_ID`). If the user has access to a server matching any of the IDs in the `authorized` list, they will be granted access.
  - `user` checks against the user's email (`PLEX_USER_EMAIL`) or username (`PLEX_USER_NAME`). If either matches a value in the `authorized` list, they will be granted access.
- `authorized` is a list of information for who is authorized.

## Customize the server list

### Customize the Custom Server entry

Adding this to your settings will override the the custom server in the server list.

```json
"customServer": {
  "name": "Custom Server 1",
  "location": "Custom Location",
  "url": "https://mycustomserver.com/server",
  "logo": "https://mycustomserver.com/logo.png"
}
```

![Custom Server Example](https://user-images.githubusercontent.com/1524443/76433720-19a3f180-638b-11ea-8c20-1997728e8325.png)

### Customize servers list

The servers list can be modified with your own list of servers. If this setting is provided, it will ignore the `customServer` setting above. Also, if only one server is provided, it will automatically join it! A server entry can also handle a default Room, with or without password. If set, SyncLounge will attempt to auto-join the room when the server is selected by the user.

```json
"servers": [
  {
    "name": "Custom Server 1",
    "location": "Custom Location",
    "url": "https://1.mycustomserver.com/server",
    "logo": "https://mycustomserver.com/logo.png"
  },
  {
    "name": "Custom Server 2",
    "location": "Custom Location",
    "url": "https://2.mycustomserver.com/server",
    "logo": "https://mycustomserver.com/logo-2.png",
    "defaultRoom": "DefaultRoom"
  },
  {
    "name": "Custom Server 3",
    "location": "Custom Location",
    "url": "https://3.mycustomserver.com/server",
    "logo": "https://mycustomserver.com/logo-3.png",
    "defaultRoom": "DefaultRoom",
    "defaultPassword": "DefaultPassword123"
  }
]
```

![Custom Server List Example](https://user-images.githubusercontent.com/1524443/76433958-6daed600-638b-11ea-9cf6-41ea79182dbc.png)
