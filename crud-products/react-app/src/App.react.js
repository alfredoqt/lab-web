import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
}));

export default function App() {
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const fetchResult = await fetch('http://localhost:4001/products');
      const results = await fetchResult.json();
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Productos
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <List>
        <ListItem button>
          <ListItemText primary="Trash" secondary="Jan 7, 2014" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
