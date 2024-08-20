import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userSlicer';


const DeleteUserModal = ({ open, onClose, userId/*onUserDeleted*/ }) => {

  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    if(userId){
      console.log("Deleting user with ID:", userId);
      dispatch(deleteUser(userId))
      .then(() => {
        /*onUserDeleted();*/
      })
      .catch((error) => {
        console.error('Failed to delete user:', error);
      });
      onClose();
    }
    else{
      console.log("No user ID provided");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this User?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeleteUser} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;

