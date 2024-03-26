import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  Link
} from "react-router-dom";
const sidebar = () => {
  const drawerWidth = 240;
  const items = [
    {
      "value": "Vendor",
      "to":"/"
    },
      {
      "value": "Vendor Type",
      "to":"vendor-types"
    },
      {
      "value": "Vendor Class",
      "to":"vendor-class"
    },
  ]
 

  return (
  <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {items.map((item, index) => (
            <Link to={item.to} key={index}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.value} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      
   
      </Drawer>
    </Box>
  );
};

export default sidebar;
