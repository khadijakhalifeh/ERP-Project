import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser, retrieveUser } from '../../redux/userSlicer';

const AddUserModal = ({ open, onClose, onUserCreated }) => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    setLoading(true);
    const userPayload = {
      name: userData.name, 
      email: userData.email,
    };
    dispatch(createUser(userPayload)).then((response) => {
      if (response.payload) {
        console.log('User Created: ', response.payload);
        onUserCreated(response.payload);
        setUserData({ name: '', email: '' });
        dispatch(retrieveUser());
        onClose();
      }
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
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
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSaveUser} disabled={loading}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;