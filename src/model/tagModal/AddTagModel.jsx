import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import {createTag} from '../../redux/tagSlicer' 

const AddTagModal = ({ open, onClose }) => {
  const [tagData, setTagData] = useState({ name: '' });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTagData({ ...tagData, [e.target.name]: e.target.value });
  };

  const handleSaveTag = () => {
    const userPayload = {
      name: tagData.name, 
    };
    dispatch(createTag(userPayload)).then(() => {
      setTagData({name: ''});
    })
    .catch((error) => {
      console.error('Failed to create tag:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Create Tag</DialogTitle>
      <DialogContent>
        <TextField 
        margin='dense'
        label='Name'
        name='name'
        type='text'
        fullWidth
        variant='standard'
        value={tagData.name || ''}
        onChange={handleChange}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveTag}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTagModal;