import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlicer';
import { retrievePost } from '../../redux/postSlicer';

const UpdateUserModal = ({ open, onClose }) => {
  const [userData, setUserData] = useState({ name: '', email: '', postIds: []});
  const posts = useSelector((state) => state.posts || []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(open){
      dispatch(retrievePost());
    }
  },[open, dispatch])

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = () => {
    const userPayload = {
      name: userData.nane, 
      email: userData.email,
      postIds: userData.postIds
    };
    dispatch(updateUser(userPayload)).then(() => {
      setUserData({name: '', email: '', postIds: ''});
    })
    .catch((error) => {
      console.error('Failed to update user:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Update user</DialogTitle>
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

        <FormControl fullWidth margin='dense'>
          <InputLabel>Post</InputLabel>
          <Select
            name='postId'
            value={userData.postIds || ''}
            onChange={handleChange}
            variant='standard'
          >
            {posts.map((post) => (
              <MenuItem key={post.id} value={post.id}>
                {post.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdatePost}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTagModal;

