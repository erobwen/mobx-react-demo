import { observer } from 'mobx-react-lite';
import { MenuFrame } from './MenuFrame';
import { UserStore } from '../stores/UserStore';
import { LoginScreen } from './LoginScreen';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useGlobalStoreDefinition } from '../../general/util-mobx-react';
import { getUser, loggedIn } from '../stores/getUserStore';
import { isValidElement } from 'react';

export const Router = observer((props) => (
  <BrowserRouter>
    <RouterContent {...props}/>
  </BrowserRouter>
));

export const RouterContent = observer(({menuItems}) => {
  useGlobalStoreDefinition(UserStore);
  
  const user = getUser(); 
  
  let allowedMenuItems = menuItems.filter(item => {
    // Only show fully visible items before user has loaded
    if (!user) {
      return !item.roles;
    }

    // Show items that has a role matching a role of the user
    let access = false; 
    if (!item.roles) {
      access = true; 
    } else {
      item.roles.forEach(role => {
        if (user.roles.includes(role)) {
          access = true; 
        }
      })
    }
    return access; 
  });

  return (
    <Routes>
      <Route path="/" element={
        !loggedIn() ? 
          <Navigate to="/login" replace/> 
          : 
          <Navigate to={"/" + allowedMenuItems[0].path} replace/>}
      />
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/*" element={<MenuFrame menuItems={allowedMenuItems}/>}>
        { allowedMenuItems.map(item => (
          <Route 
            key={item.path} 
            path={item.path} 
            element={isValidElement(item.Component) ? item.Component : <item.Component/>}/>
        )) }
      </Route>
    </Routes>
  );
});
