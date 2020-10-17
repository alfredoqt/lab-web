import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Todo from "./Todo.react";

export default function TodoList({ tasks, onUpdate, onDelete }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Todo task={task} onUpdate={onUpdate} onDelete={onDelete} />
        </ListItem>
      ))}
    </List>
  );
}
