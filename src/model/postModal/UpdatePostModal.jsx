import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../redux/postSlicer';
import { retrieveTag } from '../../redux/tagSlicer';
import { retrieveUser } from '../../redux/userSlicer';

const UpdatePostModal = ({ open, onClose }) => {
  const [postData, setPostData] = useState({ title: '', description: '', tagIds: []});
  const tags = useSelector((state) => state.tags.tags || []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(open){
      dispatch(retrieveTag());
    }
  },[open, dispatch])

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleUpdatePost = () => {
    const userPayload = {
      title: postData.title, 
      description: postData.description,
      tagIds: postData.tagIds
    };
    dispatch(updatePost(userPayload)).then(() => {
      setUserData({title: '', description: '', tagIds: ''});
    })
    .catch((error) => {
      console.error('Failed to update post:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Update Post</DialogTitle>
      <DialogContent>
        <TextField 
        margin='dense'
        label='Title'
        name='title'
        type='text'
        fullWidth
        variant='standard'
        value={postData.title || ''}
        onChange={handleChange}
        />

        <TextField 
        margin='dense'
        label='Description'
        name='description'
        type='text'
        fullWidth
        variant='standard'
        value={postData.description || ''}
        onChange={handleChange}
        />

        <FormControl fullWidth margin='dense'>
          <InputLabel>Tag</InputLabel>
          <Select
            name='tagId'
            value={postData.tagId || ''}
            onChange={handleChange}
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
        <Button onClick={handleUpdatePost}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePostModal;
