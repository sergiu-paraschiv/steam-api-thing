steam-api-thing
===============

Test Application using the Steam API

Build/run configuration
-----------------------

You need a `.constants` file in the root of the project containing:
```
[
    {
        "match": "steam_api_key",
        "replacement": "YOUR STEAM API KEY"
    }
]
```
Get a Steap API Key from here: http://steamcommunity.com/dev/registerkey

Node.js > 0.10.5 is required.

Run
```
npm install
bower install
```

to get dependecies.

You'll also need to set up a web server (with PHP > 5) at `http://localhost:9002/`
with it's root in `services/`.

Run
`grunt build`
to build the project. Output is in `build/`.

Run
`grunt dev-test`
to get the live-reloaded test suite running.

Run
`grunt dev-server`
to get the live-reloaded application running.
