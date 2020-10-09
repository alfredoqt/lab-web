import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import TodoList from "./TodoList.react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  createButton: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
  },
  creation: {
    display: "flex",
    alignItems: "center",
    padding: 16,
  },
}));

export default function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:4001/tasks")
      .then((response) => response.json())
      .then((json) => {
        setTasks(json.data);
        setLoading(false);
      });
  }, [setTasks, setLoading]);

  function handleAdd(newDescription) {
    fetch("http://localhost:4001/tasks", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ description: newDescription }),
    })
      .then((response) => response.json())
      .then((json) => {
        setTasks([...tasks, json.data]);
      });
  }

  function handleUpdate(id, newDescription, status) {
    fetch(`http://localhost:4001/tasks/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        description: newDescription,
        status,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedId = json.data.id;
        const indexFound = tasks.findIndex((p) => p.id === updatedId);
        if (indexFound !== -1) {
          setTasks([
            ...tasks.slice(0, indexFound),
            json.data,
            ...tasks.slice(indexFound + 1),
          ]);
        }
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:4001/tasks/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedId = json.data.id;
        const indexFound = tasks.findIndex((p) => p.id === updatedId);
        if (indexFound !== -1) {
          setTasks([
            ...tasks.slice(0, indexFound),
            ...tasks.slice(indexFound + 1),
          ]);
        }
      });
  }

  function handleCreateSubmit(event) {
    event.preventDefault();
    if (description.length !== 0) {
      handleAdd(description);
    }
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  return (
    <div>
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tasks
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <form onSubmit={handleCreateSubmit}>
            <div className={classes.creation}>
              <TextField
                id="todo-description"
                label="New Todo"
                variant="outlined"
                onChange={handleDescriptionChange}
                value={description}
              />
              <Button
                type="submit"
                className={classes.createButton}
                variant="outlined"
                color="primary"
              >
                Create task
              </Button>
            </div>
          </form>
          <TodoList
            tasks={tasks}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
