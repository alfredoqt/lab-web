# Very very simple STOP game

## Features

- Allows two players to join a game
- Selects winner randomly
- Replicates game state using WebSockets
- Tells which player stopped
- The room is only accessible by players who already have a username

## Technical Details

### Socket Messages from Server

- ROOM_STATE represents room state in the server
  - Players joined
  - Selected letter
- PLAYER_SUBMITTED_WORDS
  - Sent to the user when they submit words
  - Contains all info of players and their words
- WINNER
  - Sent ten seconds after the first user submits a Stop

### Socket Messages from Client

- PLAYER_JOINED
  - Sent when a player joins the room.
  - It renders as soon as the route in /room of the React App is rendered
- PLAYER_LEFT
  - Sent when the /room route's component is unmounted
  - Causes timeouts to be cleared and whole game to be reset
- STOP
  - Action submitted when the user enters their words
  - Only the first user is attributed as the stopper

## Install Instructions

- Go to the server folder and run npm start after installing the modules. Runs on port 4001 by default
- Go to the react-app folder and run npm start after installing the modules. Runs on port 3000 by default
