import { observer } from "mobx-react";
import { Store } from "../../general/util-mobx-react";
import { userClient } from "../clients/UserClient";
import { useStore } from "../../general/util-mobx-react";
import { action, computed, makeObservable, observable } from "mobx";
import { DataGrid } from '@mui/x-data-grid';
import { StyledCard } from "../../general/components/StyledCard";
import { AdminEditUserDialog } from "./AdminEditUserDialog";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getUserStore } from "../stores/getUserStore";

export class UserListStore extends Store {
  constructor() {
    super();
    this.viewedUser = null;
    this.showInactive = false; 
    makeObservable(this, {
      showInactive: observable,
      viewedUser: observable,
      
      shownUsers: computed,
      isLoading: computed,

      saveUser:action.bound,
      deleteUser:action.bound,
      activateUser:action.bound,
      closeUserDialog:action.bound,
    })
  }

  onCreated() {
    getUserStore().loadUsers();
  }

  get shownUsers() {
    const users = [];
    if (!getUserStore().users) return users;
    if (this.showInactive) {
      getUserStore().users.forEach(user => {
        if (user.active === 0) {
          users.push(user);
        }
      })  
    } else {
      getUserStore().users.forEach(user => {
        if (user.active === 1) {
          users.push(user);
        }
      })
    }
    return users; 
  }

  get isLoading() {
    return !getUserStore().users;
  }

  async saveUser(postSaveAction) {
    await userClient.updateUser(this.viewedUser);
    if (postSaveAction) postSaveAction();
    this.viewedUser = null;
  }

  async deleteUser() {
    await getUserStore().deleteUser(this.viewedUser);
    this.viewedUser = null;
  }

  async activateUser() {
    await getUserStore().activateUser(this.viewedUser);
  }

  closeUserDialog() {
    this.viewedUser = null; 
  }
}

export const AdminUserListCard = observer(() => {
  const store = useStore(UserListStore);  
  return (
    <StyledCard style={{width: "", maxWidth: ""}} name="Users" loading={store.isLoading}>
      <AdminUserList userListStore={store}/>
    </StyledCard>
  );
})

export const AdminUserList = observer(({userListStore}) => {
  const store = userListStore;
  const { isLoading, viewedUser } = store;

  const columns = [
    // { field: 'active', headerName: 'Active', width: 90 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 }
  ];

  const users = store.shownUsers; 

  // Important: This step is necessary to observe all content in the list. If this is done inside DataGrid, it wont be able to respond to changes. 
  const observedData = users.map(user => ({...user}));
  // However, send the real data to the MUI grid, otherwise we will get the wrong object on select! 

  return (
    <>
      { !isLoading && 
        <>
          <DataGrid
            rows={[...users]} // Note: create a new arry, otherwise DataGrid does not understand it changed!  
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onRowClick={ (params) => { store.viewedUser = params.row } }
          />
          <ToggleButtonGroup
            color="primary"
            value={store.showInactive ? "inactive" : "active"}
            exclusive
            onChange={event => {
              store.showInactive = event.target.value !== "active"; 
            }}
            aria-label="View selection"
          >
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="inactive">Inactive</ToggleButton>
          </ToggleButtonGroup>
        </>
      }
      { store.viewedUser && (
        <AdminEditUserDialog
          abstractUser={ viewedUser }
          doClose={ store.closeUserDialog }
          doSave={ store.saveUser }
          doDelete={ store.deleteUser }
          doActivate={ store.activateUser }
        />
      )}
    </>
  );
});
