import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
  InputLabel, FormControl, Select, MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/postSlicer';
import { retrieveTag } from '../../redux/tagSlicer';
import { retrieveUser } from '../../redux/userSlicer';

const AddPostModal = ({ open, onClose }) => {
  const [postData, setPostData] = useState({ title: '', description: '', userId: '', tagIds: [] });
  const users = useSelector((state) => state.users.users || []);
  const tags = useSelector((state) => state.tags.tags || []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (open) {
      dispatch(retrieveUser());
      dispatch(retrieveTag());
    }
  }, [open, dispatch]);

  // Log to check if data is fetched correctly
  useEffect(() => {
    console.log("Users: ", users);
    console.log("Tags: ", tags);
  }, [users, tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSavePost = () => {
    const postPayload = {
      title: postData.title, 
      description: postData.description,
      userId: postData.userId,
      tagIds: postData.tagIds
    };
    dispatch(createPost(postPayload))
      .then(() => {
        setPostData({ title: '', description: '', userId: '', tagIds: [] });
      })
      .catch((error) => {
        console.error('Failed to create post:', error);
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <TextField 
          margin='dense'
          label='Title'
          name='title'
          type='text'
          fullWidth
          variant='standard'
          value={postData.title}
          onChange={handleChange}
        />

        <TextField 
          margin='dense'
          label='Description'
          name='description'
          type='text'
          fullWidth
          variant='standard'
          value={postData.description}
          onChange={handleChange}
        />
        
        <FormControl fullWidth margin='dense'>
          <InputLabel>User</InputLabel>
          <Select
            name='userId'
            value={postData.userId}
            onChange={handleChange}
            variant='standard'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense'>
          <InputLabel>Tag</InputLabel>
          <Select
            name='tagIds'
            value={postData.tagIds}
            onChange={handleChange}
            multiple
            variant='standard'
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSavePost}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostModal;
