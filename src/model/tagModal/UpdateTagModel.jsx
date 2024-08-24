import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTag } from '../../redux/tagSlicer';
import { retrievePost } from '../../redux/postSlicer';

const UpdateTagModal = ({ open, onClose }) => {
  const [tagData, setTagData] = useState({ name: '', postIds: []});
  const posts = useSelector((state) => state.posts || []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(open){
      dispatch(retrievePost());
    }
  },[open, dispatch])

  const handleChange = (e) => {
    setTagData({ ...tagData, [e.target.name]: e.target.value });
  };

  const handleUpdateTag = () => {
    const userPayload = {
      name: tagData.nane, 
      postIds: tagData.postIds
    };
    dispatch(updateTag(userPayload)).then(() => {
      setUserData({name: '', postIds: ''});
    })
    .catch((error) => {
      console.error('Failed to update tag:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Update tag</DialogTitle>
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

<FormControl fullWidth margin='dense'>
          <InputLabel>Post</InputLabel>
          <Select
            name='postId'
            value={tagData.postIds || ''}
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
