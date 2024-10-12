import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deletePost} from '../../redux/postSlicer';


const DeletePostModal = ({ open, onClose, postId}) => {

  const dispatch = useDispatch(); 

  const handleDeletePost = () => {
    if(postId){
      console.log("Deleting post with ID:", postId);
      dispatch(deletePost(postId))
      onClose();
    }
    else{
      console.log("No post ID provided");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this Post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeletePost} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostModal;

