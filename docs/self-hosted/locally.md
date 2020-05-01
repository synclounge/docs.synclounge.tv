
# Running Locally

## Requirements

- Git
- Node v8.4.0+

## First steps

1. Clone the repo: `git clone https://github.com/samcm/SyncLounge`
1. Change to the directory: `cd synclounge`
1. Install packages and dependencies: `npm install`

### Running the webapp

1. Build the webapp: `npm run build`

    Notes: This must be done anytime you change the `webroot` setting

1. Run the webapp using `node webapp.js`

    Don't forget that you need to set Access URL as described in [Getting Started](/self-hosted/getting-started/).

    The SL web app will be running at `http://ip:8088/` or `http://ip:8088/WEBROOT` if you set `webroot`.

### Running the server

- Run the server using `npm run server`

    The SL server will be running at `http://ip:8089/slserver`.
