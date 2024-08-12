import React, { useState } from 'react';
import ModalComponent from '../ModelComponent';

const UpdateUserModal = ({ open, handleClose, handleSave, user }) => {
  const [userData, setUserData] = useState(user);

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
      title="Update User"
      handleSave={handleSaveUser}
    >
      <input name="username" value={userData.username} onChange={handleChange} />
      <input name="email" value={userData.email} onChange={handleChange} />
    </ModalComponent>
  );
};

export default UpdateUserModal;
