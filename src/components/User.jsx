import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {createUser, updateUser, deleteUser, retrieveUser} from '../redux/userSlicer';
import AddUserModal from '../model/userModel/AddUserModel';
import UpdateUserModal from '../model/userModel/UpdateUserModel';
import DeleteUserModal from '../model/userModel/DeleteUserModel';
export default function User() {

  const [modelType, setModelType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);


  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(retrieveUser());
  }, [dispatch])

  const handleOpenModel = (type, user = null) => {
    setSelectedUser(user),
    setModelType(type);
  };

  const handleCloseModel = () => {
    setModelType(null);
    setSelectedUser(null);
  };

  const handleAddUser = (userData) => {
    dispatch(createUser(userData));
  }

  const handleUpdateUser = (userData) => {
    dispatch(updateUser(userData));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
    <div style= {{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px'}}>
    <Button 
    variant="contained" 
    color="primary" 
    startIcon={<AddIcon />}
    onClick={handleOpenModel('add')}
    style={{ height: '100%' }}>
    Add Post
  </Button>
    </div>

 <TableContainer component={Paper} style={{ marginTop: '0', height: '350px' }}>
      <Table
        sx={{
          minWidth: 1000,
          fontSize: '1rem', // Base font size
          border: '1px solid black',
          '@media (max-width: 600px)': {
            fontSize: '0.8rem', // Smaller font on small screens
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 'inherit', border: '1px bold black' }}>
              Name
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: 'inherit', border: '1px bold black' }}>
              Email
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: 'inherit', border: '1px bold black' }}  colSpan={2} >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                fontSize: 'inherit', // Inherit font size for body cells
                 border: '1px solid black'
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: 'inherit',  border: '1px solid black' }}>
                {user.name} 
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 'inherit', border: '1px solid black', }}>
              {user.email}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 'inherit', border: '1px solid black', }}>
              <Button onClick={() => handleOpenModel('update', user)}>Update</Button>
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 'inherit', border: '1px solid black', }}>
              <Button onClick={() => handleOpenModel('delete', user)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {modelType === 'add' && (
      <AddUserModal open = {modelType === 'add'} handleClose={handleCloseModel} handleSave={handleAddUser} />
    )}

    {modelType === 'update' && (
      <UpdateUserModal open = {modelType === 'update'} handleClose={handleCloseModel} handleSave={handleUpdateUser} user = {selectedUser} />    
      )}

    {modelType === 'delete' && (
      <DeleteUserModal open = {modelType === 'delete'} handleClose={handleCloseModel} user = {selectedUser} />
    )}
    </>
  )
}
