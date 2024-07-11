import { Box, Toolbar, Typography, IconButton, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import { useObservable } from '../../general/util-mobx-react';

import { observer } from 'mobx-react-lite';
import { CurrentUserCard } from '../components/CurrentUserCard';
import { useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { getUser } from '../stores/getUserStore';

export const MainToolbar = observer(({drawerWidth, isMobile, doOpenDrawer, ...appBarContentProperties}) => {
  const { store, menuItems } = appBarContentProperties; 
  const state = useObservable(() => ({isUserMenuOpen: false}));
  const userButtonRef = React.useRef(null);

  const location = useLocation();
  const selectedItem = menuItems.find(item => ("/" + item.path) === location.pathname);

  return(
    <>
      <Toolbar style={{display: "flex", flexDirection: "row", gap: "10px"}}> 
        {!isMobile && <Box style={{width: drawerWidth}}/>}
        {isMobile && (
          <IconButton style={{color: "white", flex: "0 0 auto"}} onClick={doOpenDrawer}>
            <MenuIcon/>
          </IconButton>
        )}
        <Box style={{flex: "0 0 auto"}}>
          <Typography>{selectedItem ? selectedItem.name : ""}</Typography>
        </Box>
        <Box style={{flex: "1 1 0"}}/>
        <Box style={{flex: "0 0 auto"}}>
          <IconButton disabled={!getUser()} ref={userButtonRef} style={{color: "white", opacity: getUser() ? 1 : 0.5}} onClick={() => {state.isUserMenuOpen = true; }} >
            <PersonIcon/>
          </IconButton>
        </Box>
      </Toolbar>
      <Popover
        open={state.isUserMenuOpen}
        anchorEl={userButtonRef.current}
        onClose={() => { state.isUserMenuOpen = false }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <CurrentUserCard/>
      </Popover>
    </>
  );
});