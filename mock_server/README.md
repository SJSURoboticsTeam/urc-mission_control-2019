# Mock ESP32 server

Pretends to be an ESP32 server, responding to XHR requests and sending SSEs
just as a real ESP32 does.

It can support development of mission control pages without needing a physical
ESP32 plugged in.

It can also be used for prototyping new XHRs or SSEs before an ESP32 has been
programmed to handle them.

## Install dependencies

```
npm install
```

## Start the mock server

```
node .
```

## Try sending commands to the mock server

Try some XHRs on the arm server:

```
curl -X POST 'http://localhost:5000/power_on'
curl -X POST --data-binary '{base:5,shoulder:10}' 'http://localhost:5000/move'
```

Check out the SSEs from the arm server:

```
curl -X POST 'http://localhost:5000/power_on'
curl http://localhost:5000/sse
```

## Adding a new server for your subsystem

Create a new JS file in `systems/` and import `system.js`. Create a `new
system.System` and call `addXHR` and `addSSE` to add all your XHRs and SSEs.

Your new JS file will automatically be run and a server will be created that
responds to your XHRs and SSEs.

Check out `systems/arm.js` for an example.
