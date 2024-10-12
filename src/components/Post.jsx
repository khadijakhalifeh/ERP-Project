import React, { useEffect, useState } from 'react'
import  Box  from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';  
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useDispatch, useSelector } from 'react-redux';
import { retrievePost } from '../redux/postSlicer';
import AddPostModal from '../model/postModal/AddPostModal';
import DeletePostModal from '../model/postModal/DeletePostModal';
import {useTheme} from '../theme/ThemeContext';
import { dataGridStyles } from '../styles/dataGridStyles ';

export default function Post() {

  const { darkMode } = useTheme(); 
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.posts.posts || []);

  const [rows, setRows] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    postId: null
  });

    //dispaly data in the data grid
    useEffect(() => {
      dispatch(retrievePost()).then((response) => {
        if(response.payload){
          setRows(response.payload.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
          })))
        }
      });
    }, [dispatch])

    const columns = [
      { field: "title", headerName: 'Title', width: 400 },
      { field: "description", headerName: 'Description', width: 400 },
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

    const handleOpenModal = (type, post) => {
      setModalState({
        open: true,
        type: type,
        postId: post ? post.id : null
      });
    };

    const handleCloseModel = () => {
      setModalState({
        open: false,
        type: null,
        postId: null
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
    onClick={() => handleOpenModal('add')}
    style={{ height: '100%' }}>
    Add Post
  </Button>

  <AddPostModal 
    open={modalState.open && modalState.type === 'add'} 
    onClose={handleCloseModel} 
  />

  <DeletePostModal
    open={modalState.open && modalState.type === 'delete'}
    onClose={handleCloseModel}
    postId={modalState.postId}
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

