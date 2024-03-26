import React from 'react'
import Sidebar from '../sidebar'
import Box from '@mui/material/Box';

const index = ({children}) => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>
      <Box
        component="main"
        sx={{flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
 
            {children}
      </Box>
    </Box>
    </>
  )
}

export default index