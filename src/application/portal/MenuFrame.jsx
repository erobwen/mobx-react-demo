import * as React from 'react';
import { action, makeObservable, observable } from 'mobx';
import {  useStore } from '../../general/util-mobx-react';

import { observer } from 'mobx-react-lite';
import { Store } from '../../general/util-mobx-react';
import { ApplicationMenuFrame } from '../../general/components/ApplicationMenuFrame';
import { ApplicationMenu } from '../../general/components/ApplicationMenu';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MainToolbar } from './MainToolbar';
class MenuFrameStore extends Store {
  constructor(values) {
    super(values);
    this.isUserMenuOpen = false; 

    makeObservable(this, {
      isUserMenuOpen: observable,
      selectItem: action.bound
    })  
  }

  useHooks() {
    this.navigate = useNavigate();
  }

  selectItem(item) {
    this.navigate(item.path);
  }
}


export const MenuFrame = observer(({menuItems}) => {
  const store = useStore(MenuFrameStore); 
  const { selectItem } = store; 

  return (
    <ApplicationMenuFrame 
      DrawerContentComponent={ApplicationMenu} drawerContentProperties={{menuItems, doSelectItem: selectItem}} 
      AppBarContentComponent={MainToolbar} appBarContentProperties={{store, menuItems}}>
      <Outlet/>
    </ApplicationMenuFrame>
  ); 
})

