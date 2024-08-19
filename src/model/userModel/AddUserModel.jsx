import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/userSlicer';


const AddUserModal = ({ open, onClose, onUserCreated }) => {
  const [userData, setUserData] = useState({ username: '', email: '' });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    //console.log("submitting", userData);
    const userPayload = {
      username: userData.username, // Make sure these match the expected field names
      email: userData.email,
    };
    dispatch(createUser(userPayload)).then(() => {
      onUserCreated();
      setUserData({username: '', email: ''});
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
        label='Username'
        name='username'
        type='text'
        fullWidth
        variant='standard'
        value={userData.username || ''}
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
