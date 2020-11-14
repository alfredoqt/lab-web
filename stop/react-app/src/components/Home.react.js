import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import * as ROUTES from "constants/routes";

export default function Home() {
  const [name, setName] = useState("");
  const history = useHistory();
  function onSubmit(e) {
    e.preventDefault();
    if (name.length < 3) {
      return;
    }
    localStorage.setItem("player", name);
    history.replace(ROUTES.ROOM);
  }
  return (
    <form noValidate onSubmit={onSubmit} method="POST">
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Username"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Play
      </Button>
    </form>
  );
}
