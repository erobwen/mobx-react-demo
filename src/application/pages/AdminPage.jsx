import { Button, Grid, Typography } from "@mui/material";
import { AdminUserList, UserListStore } from "../components/AdminUserList";
import { observer } from "mobx-react";
import { Store } from "../../general/util-mobx-react";
import { makeObservable, observable } from "mobx";
import { useGlobalStoreDefinition, useStore } from "../../general/util-mobx-react";
import { pageMargin, pagePadding } from "../../general/style/style";
import { Box } from "@mui/system";
import { CreateUserDialog } from "../components/CreateUserDialog";
import { RoleStore } from "../stores/RoleStore";


class AdminPageStore extends Store {
  constructor() {
    super();
    this.openNewUserDialog = false;
    makeObservable(this, {
      openNewUserDialog: observable
    });
  }
}

export const AdminPage = observer(() => {
  const store = useStore(AdminPageStore);
  const userListStore = useStore(UserListStore);
  useGlobalStoreDefinition(RoleStore);

  return (
    <Box style={{padding: pagePadding, margin: pageMargin, display: "flex", gap: 10, flexDirection: "column"}}>
      <Typography variant="h5">Users</Typography>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 5, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <AdminUserList userListStore={userListStore}/>
        </Grid>
        <Grid item xs={12}>
          <Box style={{display: "flex", justifyContent: "end"}}>
            <Button variant="contained" onClick={() => { store.openNewUserDialog = true; }}>New User</Button>
          </Box>
        </Grid>
      </Grid>
      <CreateUserDialog open={store.openNewUserDialog} onClose={() => { store.openNewUserDialog = false; }}/>
    </Box>
  );
});
