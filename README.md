steam-api-thing
===============

Test APP hosted on GitHub Pages using the Steam API

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

Run
`grunt build`
to build the project. Output is in `build/`.

Run
`grunt dev-test`
to get the live-reloaded test suite running.

Run
`grunt dev-server`
to get the live-reloaded application running.