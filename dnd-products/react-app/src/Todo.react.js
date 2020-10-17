import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

export default function Todo({ task, onUpdate, onDelete }) {
  return (
    <>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.status === "done"}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": task.id }}
          onChange={() =>
            onUpdate(
              task.id,
              task.description,
              task.status === "pending" ? "done" : "pending"
            )
          }
        />
      </ListItemIcon>
      <ListItemText primary={task.description} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
}
