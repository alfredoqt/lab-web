import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ProductDialog({open, onSave, onClose, id}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { return; }
    function fetchData() {
      fetch(`http://localhost:4001/products/${id}`)
        .then(response => response.json())
        .then(json => {
          setLoading(false);
          setName(json.data.name);
          setDescription(json.data.description);
          setPrice(json.data.price.toString());
        });
    }
    fetchData();
  }, [id]);

  function handleChange(type) {
    return function (e) {
      const val = e.target.value;
      switch (type) {
        case 'name':
          setName(val);
          break;
        case 'description':
          setDescription(val);
          break;
        case 'price':
          setPrice(val);
          break;
        default:
          break;
      }
    }
  }

  function handleSave() {
    onSave(id, name, description, price);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Product</DialogTitle>
      <DialogContent>
        {loading ? <CircularProgress /> :
        (
          <>
            <DialogContentText>
              Update product
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={name}
              onChange={handleChange('name')}
              label="Name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={description}
              onChange={handleChange('description')}
              label="Description"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={price}
              onChange={handleChange('price')}
              label="Price"
              type="number"
              fullWidth
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={!loading} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button disabled={!loading} onClick={handleSave} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
