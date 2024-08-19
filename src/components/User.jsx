import React, { useEffect, useState } from 'react'
import  Box  from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';  
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {createUser, updateUser, deleteUser, retrieveUser} from '../redux/userSlicer';
import AddUserModal from '../model/userModel/AddUserModel';
import {useTheme} from '../theme/ThemeContext';
import { dataGridStyles } from '../styles/dataGridStyles ';
export default function User() {

  const { darkMode } = useTheme(); 
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);

  const columns = [
    { field: "username", headerName: 'Username', width: 400 },
    { field: "email", headerName: 'Email', width: 400 },
    { field: "action", headerName: 'Action', width: 400 ,
      renderCell: (params) => (
        <>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleOpenModel('update', params.row)}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete
          </Button>
        </>
      )
    },
  ]

const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(retrieveUser()).then((response) => {
      if(response.payload){
        setRows(response.payload.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email
        })))
      }
    });
  }, [dispatch])

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleUserCreated = () => {
    dispatch(retrieveUser()).then((response) => {
      if (response.payload) {
        setRows(response.payload.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email
        })));
      }
    });
  };

  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
    <div style= {{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px'}}>
    <Button 
    variant="contained" 
    color="primary" 
    startIcon={<AddIcon />}
    onClick={handleClickOpen}
    style={{ height: '100%' }}>
    Add User
  </Button>
  <AddUserModal open={open} onClose={handleClickClose} onUserCreated={handleUserCreated} />
    </div>

    <DataGrid
    columns={columns}
    rows={rows}
    getRowId={(row) => row.id} 
    slotProps={{
      loadingOverlay: {
        variant: 'skeleton',
        noRowsVariant: 'skeleton'
      }
    }}
    sx={dataGridStyles(darkMode)}

    />
    </Box>
  
    {/* {modelType === 'add' && (
      <AddUserModal open = {modelType === 'add'} handleClose={handleCloseModel} handleSave={handleAddUser} />
    )} */}

    {/* {modelType === 'update' && (
      <UpdateUserModal open = {modelType === 'update'} handleClose={handleCloseModel} handleSave={handleUpdateUser} user = {selectedUser} />    
      )}

    {modelType === 'delete' && (
      <DeleteUserModal open = {modelType === 'delete'} handleClose={handleCloseModel} handelSave={handleDeleteUser} user = {selectedUser} />
    )} */}
    </>
  )
}
