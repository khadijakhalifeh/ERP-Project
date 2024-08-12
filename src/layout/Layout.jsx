
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import MainContent from './MainContent';
import User from '../components/User';
import Post from '../components/Post';
import Tag from '../components/Tag';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Router>
      <div>
        {/* App Bar */}
        <AppBarComponent onMenuClick={toggleDrawer(true)} />

        {/* Drawer */}
        <DrawerComponent open={drawerOpen} onClose={toggleDrawer(false)} />

        {/* Main Content */}
        <div>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/user" element={<User />} />
            <Route path="/post" element={<Post />} />
            <Route path="/tag" element={<Tag />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
