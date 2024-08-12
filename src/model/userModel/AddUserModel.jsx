import React, { useState } from 'react';
import ModalComponent from '../ModelComponent';

const AddUserModal = ({ open, handleClose, handleSave }) => {
  const [userData, setUserData] = useState({ username: '', email: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    handleSave(userData);
    handleClose();
  };

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Add User"
      handleSave={handleSaveUser}
    >
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
    </ModalComponent>
  );
};

export default AddUserModal;
