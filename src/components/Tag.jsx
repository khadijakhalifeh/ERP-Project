import React, { useEffect, useState } from 'react'
import  Box  from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';  
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveTag } from '../redux/tagSlicer';
import AddTagModal from '../model/tagModal/AddTagModel';
import DeleteTagModel from '../model/tagModal/DeleteTagModel';
import {useTheme} from '../theme/ThemeContext';
import { dataGridStyles } from '../styles/dataGridStyles ';

export default function Tag() {

  const { darkMode } = useTheme(); 
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags || []);

  const [rows, setRows] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    tagId: null
  });

    //dispaly data in the data grid
    useEffect(() => {
      dispatch(retrieveTag()).then((response) => {
        if(response.payload){
          setRows(response.payload.map((row) => ({
            id: row.id,
            name: row.name,
          })))
        }
      });
    }, [dispatch])

    const columns = [
      { field: "name", headerName: 'Name', width: 400 },
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

    const handleOpenModal = (type, tag) => {
      setModalState({
        open: true,
        type: type,
        tagId: tag ? tag.id : null
      });
    };

    const handleCloseModel = () => {
      setModalState({
        open: false,
        type: null,
        tagId: null
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
    Add Tag
  </Button>

  <AddTagModal 
    open={modalState.open && modalState.type === 'add'} 
    onClose={handleCloseModel} 
  />

  <DeleteTagModel 
    open={modalState.open && modalState.type === 'delete'}
    onClose={handleCloseModel}
    tagId={modalState.tagId}
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
