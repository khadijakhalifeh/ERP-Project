// src/layout/DrawerComponent.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import ApprovalIcon from '@mui/icons-material/Approval';
import PersonIcon from '@mui/icons-material/Person';
import TagIcon from '@mui/icons-material/Tag';

const DrawerComponent = ({ open, onClose }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Drawer anchor="left" 
    open={open} 
    onClose={onClose} 
    sx={{
      '& .MuiDrawer-paper': {
        width: 200, // Set your desired width here
      },
    }}>
      <div
        role="navigation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          <ListItem button component={Link} to="/user">
           <PersonIcon /><ListItemText primary="User" />
          </ListItem>
          <ListItem button component={Link} to="/post">
          <ApprovalIcon /><ListItemText primary="Post" />
          </ListItem> 
          <ListItem button component={Link} to="/tag">
            <TagIcon /><ListItemText primary="Tag" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark Mode" />
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              inputProps={{ 'aria-label': 'toggle dark mode' }}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;

