import { AppBar, Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { makeObservable, observable } from 'mobx';
import { useStore } from '../util-mobx-react/useStore';

import { observer } from 'mobx-react-lite';
import { Store } from '../util-mobx-react/Store';


class ApplicationMenuFrameStore extends Store {
  constructor() {
    super();
    this.isMobileDrawerOpen = false;
    makeObservable(this, {
      isMobileDrawerOpen: observable
    })  
  }
}

export const ApplicationMenuFrame = observer(({children, DrawerContentComponent, drawerContentProperties, AppBarContentComponent, appBarContentProperties}) => {
  const store = useStore(ApplicationMenuFrameStore); 

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const container = window !== undefined ? () => window.document.body : undefined;


  /**
   * Note: regarding use of style over sx. For some reason the current version of MUI seems to crash when I try to combine
   * the use of theme and sx. To avoid this, I simply choose to use style directly. 
   */
  const drawerWidth = 240;

  const drawerPaperProps = {
    style: {
      overflow: "visible",
      boxSizing: 'border-box', width: drawerWidth
    }
  }

  return (
    <>
      <Box style={{ display: 'flex', overflow:"hidden" }}>

        {/* Application Menu */}
        <Drawer
          container={container}
          variant="temporary"
          open={store.isMobileDrawerOpen}
          onClose={() => { store.isMobileDrawerOpen = false }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          style={{
            width: drawerWidth,
            display: isMobile ? 'block' : 'none'
          }}
          PaperProps={drawerPaperProps}
          >
            <DrawerContentComponent isMobile={isMobile} {...drawerContentProperties}/>
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          style={{
            overflow: "visible",
            flex: "0 0 auto",
            width: drawerWidth,
            display: isMobile ? 'none' : 'block'
          }}
          PaperProps={drawerPaperProps}
        >
          <DrawerContentComponent isMobile={isMobile}  {...drawerContentProperties}/>
        </Drawer>

        {/* Right side of screen */}
        <Box style={{
          position: "relative",
          flex: "1 1 0"
        }}>

          {/* Application Bar */}
          <AppBar
            style={{ position: "fixed", width: "100vw-" + drawerWidth + "px", backgroundImage: "linear-gradient(to right, rgb(81, 21, 135), rgb(130, 96, 161))" }}
          >
            <AppBarContentComponent drawerWidth={drawerWidth} isMobile={isMobile} doOpenDrawer={() => {store.isMobileDrawerOpen = true;}} {...appBarContentProperties}/>
          </AppBar>
          {children}
        </Box>
      </Box>
    </>
  );
})