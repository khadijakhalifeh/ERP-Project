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
    userId: null
  });

  //dispaly data in the data grid
  useEffect(() => {
    dispatch(retrieveUser()).then((response) => {
      if(response.payload){
        setRows(response.payload.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email,
        })))
      }
    });
  }, [dispatch])


  const columns = [
    { field: "username", headerName: 'Username', width: 400 },
    { field: "email", headerName: 'Email', width: 400 },
    { field: "action", headerName: 'Action', width: 400 ,
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
            style={{marginRight: 8 }}
          >
            Delete 
          </Button>
        </>
      )
    },
  ];

  const handleOpenModal = (type, user) => {
    setModalState({
      open: true,
      type: type,
      userId: user ? user.id : null
    });
  };

  const handleCloseModel = () => {
    setModalState({
      open: false,
      type: null,
      userId: null
    });
  };

  //refresh the list of users after a creation
  // const handleUserCreated = () => {
  //   dispatch(retrieveUser()).then((response) => {
  //     if (response.payload) {
  //       setRows(response.payload.map((row) => ({
  //         id: row.id,
  //         username: row.username,
  //         email: row.email,
  //         postIds: row.postIds
  //       })));
  //     }
  //   });
  // };

  // const handleUserDeleted = () => {
  //   dispatch(deleteUser(modalState.userId)).then(() => {
  //     dispatch(retrieveUser()).then((response) => {
  //       if(response.payload){
  //         setRows(response.payload.map((row) => ({
  //           id: row.id,
  //           username: row.username,
  //           email: row.email,
  //           postIds: row.postIds
  //         })));
  //       }
  //     });
  //   });
  //   handleCloseModel();
  // };

  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
    <div style= {{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px'}}>
    <Button 
    variant="contained" 
    color="primary" 
    startIcon={<AddIcon />}
    onClick={() => handleOpenModal('add')}
    style={{ height: '100%' }}>
    Add User
  </Button>
  <AddUserModal 
  open={modalState.open && modalState.type === 'add'} 
  onClose={handleCloseModel} 
  /*onUserCreated={handleUserCreated}*/
  />

  <DeleteUserModal 
  open={modalState.open && modalState.type === 'delete'}
  onClose={handleCloseModel}
  userId={modalState.userId}
  /*onUserDeleted={handleUserDeleted}*/
  />
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
    </>
  )
}
