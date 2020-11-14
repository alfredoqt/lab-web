const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Allow only the ws transport
// io.set("transports", ["websocket"]);

// Stores players and their words
let players = {};
let timeout;
let roomState = {};
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickAWinner(playersInGame) {
  // Just select the first one...
  const playersWithWordsSubmitted = Object.keys(playersInGame).reduce(
    (acc, curr) => {
      if (playersInGame[curr].words != null) {
        acc[curr] = playersInGame[curr];
        return acc;
      }
      return acc;
    },
    {}
  );
  return playersWithWordsSubmitted[Object.keys(playersWithWordsSubmitted)[0]];
}

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    const dataParsed = JSON.parse(data);
    if (dataParsed.type === "PLAYER_JOINED") {
      const username = dataParsed.payload.username;
      players = { ...players, [username]: { id: username } };
      roomState = {};
      io.emit(
        "message",
        JSON.stringify({
          type: "ROOM_STATE",
          payload: {
            players,
            letter: alphabet[getRandomInt(0, alphabet.length)],
          },
        })
      );
    }
    if (dataParsed.type === "PLAYER_LEFT") {
      const username = dataParsed.payload.username;
      const { [username]: _, ...withoutUser } = players;
      players = { ...withoutUser };
      io.emit(
        "message",
        JSON.stringify({ type: "ROOM_STATE", payload: { players } })
      );
      // Restart the game and clear any timeouts there might be
      if (timeout) {
        clearTimeout(timeout);
      }
      players = {};
    }
    if (dataParsed.type === "STOP") {
      const username = dataParsed.payload.username;
      const words = dataParsed.payload.words;
      // Check if there is already a player that stopped
      const stoppedFind = Object.keys(players).find(
        (player) => players[player].stopped != null
      );
      if (stoppedFind != null) {
        players = {
          ...players,
          [username]: { id: username, words },
        };
      } else {
        players = {
          ...players,
          [username]: { id: username, words, stopped: true },
        };
      }

      const playersWithWordsSubmitted = Object.keys(players).reduce(
        (acc, curr) => {
          if (players[curr].words != null) {
            acc[curr] = players[curr];
            return acc;
          }
          return acc;
        },
        {}
      );
      io.emit(
        "message",
        JSON.stringify({
          type: "PLAYER_SUBMITTED_WORDS",
          payload: playersWithWordsSubmitted,
        })
      );
      timeout = setTimeout(() => {
        io.emit(
          "message",
          JSON.stringify({
            type: "WINNER",
            payload: pickAWinner(players),
          })
        );
      }, 10 * 1000);
    }
  });
});

const PORT = process.env.PORT || 4001;
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
