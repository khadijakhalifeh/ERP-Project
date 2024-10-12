import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlicer';
import { retrievePost } from '../../redux/postSlicer';

const UpdateUserModal = ({ open, onClose, user, onUserUpdated }) => {
  const [userData, setUserData] = useState({ name: '', email: '', postIds: [] });
  const posts = useSelector((state) => state.posts.posts || []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (open) {
      dispatch(retrievePost());
      if (user) {
        setUserData({
          name: user.username,
          email: user.email,
          postIds: user.postIds || []
        });
      }
    }
  }, [open, user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: name === 'postIds' ? Array.isArray(value) ? value : [value] : value
    }));
  };

  const handleUpdateUser = () => {
    const userPayload = {
      id: user.id,
      name: userData.name, 
      email: userData.email,
      postIds: userData.postIds
    };
    console.log('Updating user with payload:', userPayload);
    dispatch(updateUser(userPayload)).then((response) => {
      if (response.payload) {
        console.log('User updated successfully');
        onUserUpdated(response.payload);
        setUserData({ name: '', email: '', postIds: [] });
        onClose();
      }
    })
    .catch((error) => {
      console.error('Failed to update user:', error);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
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
          <InputLabel>Posts</InputLabel>
          <Select
            name='postIds'
            multiple
            value={userData.postIds}
            onChange={handleChange}
            variant='standard'
          >
            {posts.map((post) => (
              <MenuItem key={post.id} value={post.id}>
                {post.title} {/* Assuming post has a 'title' property */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateUser}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
