import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function ProductAddDialog({open, onSave, onClose}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');

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
    onSave(name, description, price);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new product
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
