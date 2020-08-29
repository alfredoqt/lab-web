import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductAddDialog from './ProductAddDialog.react';
import ProductDialog from './ProductDialog.react';

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
}));

export default function App() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:4001/products')
        .then(response => response.json())
        .then(json => {
          setProducts(json.data);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  function handleClickOpenAdd() {
    setAddOpen(true);
  }

  function handleClickCloseAdd() {
    setAddOpen(false);
  }

  function handleClickCloseUpdate() {
    setUpdateOpen(false);
  }

  function handleAdd(name, description, price) {
    setAddOpen(false);
    fetch('http://localhost:4001/products', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, description, price}),
    })
    .then(response => response.json())
    .then(json => {
      setProducts([...products, json.data]);
    });
  }

  function handleUpdate(id, name, description, price) {
    setAddOpen(false);
    fetch(`http://localhost:4001/products/${id}`, {
      method: 'put',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, description, price}),
    })
    .then(response => response.json())
    .then(json => {
      const updatedId = json.data.id;
      const indexFound = products.findIndex(p => p.id === updatedId);
      if (indexFound !== -1) {
        setProducts([
          ...products.slice(indexFound),
          json.data,
          ...products.slice(indexFound + 1),
        ]);
      }
    });
  }

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
      {loading ?
        <CircularProgress />
      : (
        <div>
          <Button className={classes.createButton} variant="outlined" color="primary" onClick={handleClickOpenAdd}>
            Create product
          </Button>
          <List>
            {products.map(product => (
              <ListItem button key={product.id}>
                <ListItemText primary={product.name} secondary={product.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <ProductAddDialog
        open={addOpen}
        onClose={handleClickCloseAdd}
        onSave={handleAdd} />
      <ProductDialog
        id={selectedId}
        open={updateOpen}
        onClose={handleClickCloseUpdate}
        onSave={handleUpdate} />
    </div>
  );
}
