import React from 'react';
import ModalComponent from '../ModelComponent';

const DeleteUserModal = ({ open, handleClose, handleDelete, user }) => {
  const handleDeleteUser = () => {
    handleDelete(user.id);
    handleClose();
  };

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Delete User"
      handleSave={handleDeleteUser}
    >
      <p>Are you sure you want to delete {user.username}?</p>
    </ModalComponent>
  );
};

export default DeleteUserModal;
