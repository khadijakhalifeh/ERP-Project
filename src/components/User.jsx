import React, { useEffect, useState } from 'react'
import  Box  from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';  
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveUser } from '../redux/userSlicer';
import AddUserModal from '../model/userModel/AddUserModel';
import DeleteUserModal from '../model/userModel/DeleteUserModel';
import UpdateUserModal from '../model/userModel/UpdateUserModel';
import {useTheme} from '../theme/ThemeContext';
import { dataGridStyles } from '../styles/dataGridStyles ';


export default function User() {
  const { darkMode } = useTheme(); 
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);
  const [rows, setRows] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    userId: null,
    user: null
  });

  // Fetch data and display in the DataGrid
  useEffect(() => {
    dispatch(retrieveUser()).then((response) => {
      if (response.payload) {
        const rowsData = response.payload.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email,
        }));
        console.log("Fetched Rows: ", rowsData);
        setRows(rowsData);
      }
    });
  }, [dispatch]);

  const handleOpenModal = (type, user) => {
    setModalState({
      open: true,
      type: type,
      userId: user ? user.id : null,
      user: user || null
    });
  };

  const handleCloseModal = () => {
    setModalState({
      open: false,
      type: null,
      userId: null,
      user: null
    });
  };

  const handleUserCreated = (newUser) => {
    const newRow = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    console.log("New User Created: ", newRow);
    setRows((prevRows) => [
      ...prevRows,
      newRow,
    ]);
  };

  const handleUserUpdated = (updatedUser) => {
    setRows((prevRows) => prevRows.map((row) => 
      row.id === updatedUser.id ? { ...row, ...updatedUser } : row
    ));
  };

  const handleUserDeleted = (userId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== userId));
  };

  const columns = [
    { field: "username", headerName: 'Username', width: 400 },
    { field: "email", headerName: 'Email', width: 400 },
    { field: "action", headerName: 'Action', width: 400,
      renderCell: (params) => (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<UpgradeIcon />}
            onClick={() => handleOpenModal('update', params.row)}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenModal('delete', params.row)}
            style={{ marginRight: 8 }}
          >
            Delete 
          </Button>
        </>
      )
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal('add')}
            style={{ height: '100%' }}
          >
            Add User
          </Button>
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

      <AddUserModal 
        open={modalState.open && modalState.type === 'add'} 
        onClose={handleCloseModal} 
        onUserCreated={handleUserCreated}
      />

      <DeleteUserModal 
        open={modalState.open && modalState.type === 'delete'}
        onClose={handleCloseModal}
        userId={modalState.userId}
        onUserDeleted={handleUserDeleted}
      />

      <UpdateUserModal
        open={modalState.open && modalState.type === 'update'}
        onClose={handleCloseModal}
        user={modalState.user}
        onUserUpdated={handleUserUpdated}
      />
    </>
  )
}