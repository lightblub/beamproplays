## beam.pro plays...

This is a simple little script for interfacing with beam.pro to get a _Twitch plays Pokemon!_-like experience with your stream.

### Installation
You'll need **Node.js** and **git**.

Firstly, you need to clone this GitHub repository:
```sh
$ git clone https://github.com/lightblub/beamproplays.git
$ cd beamproplays
```

And then run **npm install** to install dependencies:
```sh
$ npm install
```

Now setup a file called `config.js` in the same format as `config.js.example`:
```js
module.exports = {
  accessToken: /* https://dev.beam.pro/tutorials/interactive.html and scroll down to get access token (click link in nodejs code snippet) */,
  channelId: /* https://beam.pro/api/v1/channels/USERNAME?fields=id */,
}
```

### Usage
Run `snes.js`!
```sh
$ node snes.js
```

Begin streaming on [beam.pro](https://beam.pro/) and hit "Go Interactive" at the bottom of your channel page (beam.pro/USERNAME). Pick "beam.pro plays" (once it has been approved by their team) and you should be good to go!

**The program will press keys on your computer.** Make sure to have the game window (i.e. ZSNES) focused!

Bindings:
- The joystick is bound to the arrow keys,
- A is bound to the `Z` key,
- B is bound to the `X` key,
- and START is bound to `enter/return`.
