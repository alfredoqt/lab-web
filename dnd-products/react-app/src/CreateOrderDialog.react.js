import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function CreateOrderDialog({ open, onSave, onClose }) {
  const [name, setName] = useState("");

  function handleChangeName(e) {
    const val = e.target.value;
    setName(val);
  }

  function handleSave() {
    onSave(name);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Nueva Orden</DialogTitle>
      <DialogContent>
        <DialogContentText>Crea una nueva orden</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          onChange={handleChangeName}
          label="Nombre"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
