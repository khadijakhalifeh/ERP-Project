export const dataGridStyles = (darkMode) => ({
    '& .MuiDataGrid-root': {
      backgroundColor: darkMode ? '#000000' : '#ffffff',  
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',  
      color: darkMode ? '#ffffff' : '#000000',  
    },
    '& .MuiDataGrid-row': {
      backgroundColor: darkMode ? '#000000' : '#ffffff',  
      color: darkMode ? '#ffffff' : '#000000',  
    },
    '& .MuiDataGrid-cell': {
      borderBottomColor: darkMode ? '#333333' : '#cccccc',  
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',  
      color: darkMode ? '#ffffff' : '#000000',  
    },
  });