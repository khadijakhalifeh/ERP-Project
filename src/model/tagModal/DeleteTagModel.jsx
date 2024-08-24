import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTag } from '../../redux/tagSlicer';

const DeleteTagModal = ({ open, onClose, tagId}) => {

  const dispatch = useDispatch(); 

  const handleDeleteTag = () => {
    if(tagId){
      console.log("Deleting tag with ID:", tagId);
      dispatch(deleteTag(tagId))
      onClose();
    }
    else{
      console.log("No tag ID provided");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Delete Tag</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this Tag?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeleteTag} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTagModal;
