import { Box, Typography } from '@mui/material';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { observer } from 'mobx-react-lite';

/**
 * Takes menus of the following format: 
 */
// const menuItems = [
//   {
//     name: "Demo",
//     path: "demo",
//     component: DemoPage,
//     icon: DemoIcon
//   },
//   {
//     name: "Admin",
//     path: "admin",
//     component: AdminPage,
//     icon: AdminIcon
//   }
// ];


export const ApplicationMenu = observer(({isMobile, menuItems, doSelectItem}) => {
  return (
    <>
      <Box style={{height: isMobile ? 56 : 64, display: "flex", alignItems:"center", justifyContent: "center", backgroundColor: "rgb(81, 21, 135)", marginRight: -1, boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"}} >
        <Typography style={{color: "white"}}>MobX React Demo</Typography>
      </Box>
      <List>      
        { menuItems.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton onClick={() => doSelectItem(item)}>
              <ListItemIcon>
                <item.icon/>
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}); 