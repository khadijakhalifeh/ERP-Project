import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/userSlicer';


const AddUserModal = ({ open, onClose, /*onUserCreated*/ }) => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    const userPayload = {
      name: userData.name, 
      email: userData.email,
    };
    dispatch(createUser(userPayload)).then(() => {
      onUserCreated();
      setUserData({name: '', email: ''});
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Create User</DialogTitle>
      <DialogContent>
        <TextField 
        margin='dense'
        label='Name'
        name='name'
        type='text'
        fullWidth
        variant='standard'
        value={userData.name || ''}
        onChange={handleChange}
        />

        <TextField 
        margin='dense'
        label='Email'
        name='email'
        type='email'
        fullWidth
        variant='standard'
        value={userData.email || ''}
        onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveUser}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
