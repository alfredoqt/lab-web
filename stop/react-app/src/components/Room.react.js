import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useSocketSubscription from "hooks/useSocketSubscription";
import useSocketClient from "hooks/useSocketClient";

export default function Room() {
  const username = localStorage.getItem("player");
  const [gameState, setGameState] = useState("WAITING");
  const roomState = useSocketSubscription(["ROOM_STATE"]);
  const submittedWords = useSocketSubscription(["PLAYER_SUBMITTED_WORDS"]);
  const winner = useSocketSubscription(["WINNER"]);
  const [fields, setFields] = useState({
    name: "",
    color: "",
    fruit: "",
  });
  const socket = useSocketClient();

  useEffect(() => {
    // Tell the server I joined in the first render
    socket.emit(
      "message",
      JSON.stringify({ type: "PLAYER_JOINED", payload: { username } })
    );
    // Tell the server we left when it unmounts
    return function () {
      socket.emit(
        "message",
        JSON.stringify({ type: "PLAYER_LEFT", payload: { username } })
      );
    };
  }, [socket, username]);

  // Here's a two hardcoded. Sorry about that
  if (
    roomState != null &&
    Object.keys(roomState.players).length > 1 &&
    gameState === "WAITING"
  ) {
    setGameState("ALL_JOINED");
  }

  // In case someone leaves
  if (
    roomState != null &&
    Object.keys(roomState.players).length <= 0 &&
    gameState !== "WAITING"
  ) {
    setGameState("WAITING");
  }

  if (submittedWords != null && gameState === "ALL_JOINED") {
    console.log(submittedWords);
    const playerSubmittedWords = Object.keys(submittedWords).find(
      (player) => player === username
    );
    if (playerSubmittedWords != null) {
      if (submittedWords[playerSubmittedWords].stopped != null) {
        setGameState("SUBMITTED_WORDS_AND_STOPPED");
      } else {
        setGameState("SUBMITTED_WORDS");
      }
    }
  }

  if (
    winner != null &&
    (gameState === "SUBMITTED_WORDS_AND_STOPPED" ||
      gameState === "SUBMITTED_WORDS")
  ) {
    if (winner.id === username) {
      setGameState("WON");
    } else {
      setGameState("LOST");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    socket.emit(
      "message",
      JSON.stringify({ type: "STOP", payload: { username, words: fields } })
    );
  }

  if (gameState === "ALL_JOINED") {
    return (
      <div>
        <span>{`Letter: ${roomState.letter}`}</span>
        <form noValidate onSubmit={onSubmit} method="POST">
          <TextField
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            label="Name"
            variant="outlined"
          />
          <TextField
            value={fields.color}
            onChange={(e) => setFields({ ...fields, color: e.target.value })}
            label="Color"
            variant="outlined"
          />
          <TextField
            value={fields.fruit}
            onChange={(e) => setFields({ ...fields, fruit: e.target.value })}
            label="Fruit"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            STOP
          </Button>
        </form>
      </div>
    );
  } else if (gameState === "WON") {
    return <div>You won</div>;
  } else if (gameState === "LOST") {
    return <div>You lost</div>;
  } else if (gameState === "SUBMITTED_WORDS_AND_STOPPED") {
    return <div>You submitted and stopped! Congratulations!</div>;
  } else if (gameState === "SUBMITTED_WORDS") {
    return <div>You submitted but didn't stopped!</div>;
  } else {
    return <div>Waiting for other players to join</div>;
  }
}
