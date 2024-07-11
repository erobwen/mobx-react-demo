import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Store } from "../../general/util-mobx-react";
import { makeObservable, observable, reaction } from "mobx";
import { useGlobalStore, useStore } from "../../general/util-mobx-react";
import { textFieldStyle } from "../../general/style/style";
import { action, computed } from "mobx";
import { userClient } from "../clients/UserClient";
import { InformationDialog } from "../../general/components/CommonDialogs";
import { generatePassword } from "../../general/components/validatePassword";
import { RoleStore } from "../stores/RoleStore";
import { MultiSelectForm } from "../../general/components/MultiSelectForm";
import { synch } from "../../general/util-mobx-react";
import { getUserStore } from "../stores/getUserStore";


export class CreateUserDialogStore extends Store {
  constructor(values) {
    super(values);
    this.isLoading = false;
    this.showCreatedUserDialog = false;
    this.data = {
      username: "",
      name: "",
      email: "",
      password: "",
      roles: []
    };
    // this.data = {
    //   email: "user@test.com",
    //   name: "test test",
    //   password: ""
    // }
    this.errorMessage = "";
    makeObservable(this, {
      isLoading: observable,
      data: observable,
      errorMessage: observable,
      
      validate: computed,
      
      submit: action.bound,
      closeCreatedUserDialog: action.bound, 
    })
  }

  onCreated() {
    reaction(
      () => this.data.name, 
      (name) => {
        const names = name.split(" ");
        if (names.length > 1 && names[1].length > 0) {
          this.data.username = names[0].toLowerCase() + "." + names[1].toLowerCase(); 
          this.data.email = names[0].toLowerCase() + "." + names[1].toLowerCase() + "@test.com"; 
        }
      })
  }

  clear() {
    this.data.username = "";
    this.data.name = "";
    this.data.email = "";
    this.data.password = "";
    this.data.roles.length = 0;
  }

  async submit() {
    this.isLoading = true;
    this.data.password = generatePassword(); 
    this.showCreatedUserDialog = true; 
    try {
      await userClient.addUser({...this.data});     
      getUserStore().reloadUsers();
    } catch (error) {
      this.errorMessage = error.message;
    }

    this.isLoading = false;
  }

  async closeCreatedUserDialog() {
    if (this.errorMessage) {
      this.showCreatedUserDialog = false; 
      this.errorMessage = null;
    } else {
      this.clear();
      this.showCreatedUserDialog = false; 
      this.onClose();
    }
  }

  get validate() {
    return this.data.email !== "" && this.data.name !== "" && this.data.username !== "";
  }
}

export const CreateUserDialog = observer(({onClose, open }) => {
  const store = useStore(CreateUserDialogStore, {onClose});
  const roleStore = useGlobalStore(RoleStore);

  const { data } = store; 

  let toCopy = "";
  toCopy += "name: " + data.name + "\n";
  toCopy += "email: " + data.email + "\n";
  toCopy += "username: " + data.username + "\n";
  toCopy += "password: " + data.password + "\n";

  const usernameExists = !getUserStore().isUsernameAvailable(store.data.username);

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Create new user</DialogTitle>

        <DialogContent style={{display: "flex", flexDirection: "column", gap: 10}}>
          <TextField 
            style={textFieldStyle}
            value={store.data.name}
            onChange={(event)=> {store.data.name = event.target.value}}
            type="text"
            label="Name"
            variant="standard"
            />
          <TextField
            style={textFieldStyle}
            value={store.data.email}
            onChange={(event)=> {store.data.email = event.target.value}}
            type="text"
            label="email"
            variant="standard"
            />
          <TextField 
            style={{...textFieldStyle, ...{marginBottom: 40}}}
            value={store.data.username}
            onChange={(event)=> {store.data.username = event.target.value}}
            type="text"
            label="Username"
            variant="standard"
            error={usernameExists}
            helperText={usernameExists ? "Username already in use." : null}
            />
          <MultiSelectForm 
            title={"Roles"}
            selected={data.roles} 
            values={roleStore.availableRoles.map(role => role.name)} 
            onChange={change => {
              synch(data.roles, change.target.value);
            }}/>      
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => { store.clear(); onClose(); }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            disabled={!store.validate}
            onClick={store.submit}
            variant="contained"
          >
            Create User
          </Button>
        </DialogActions>
      </Dialog>

      <InformationDialog
        open={ store.showCreatedUserDialog }
        title={ store.errorMessage ? "Something went wrong" : "User Created" }
        loading={ store.isLoading }
        copyToClipboard={toCopy}
        copyToClipboardMessage="Copied password to clipboard"
        onOk={store.closeCreatedUserDialog }>
          {
            !store.errorMessage ? 
              <>
                <Typography>Name: {store.data.name}</Typography>
                <Typography>Email: {store.data.email}</Typography>
                <Typography>Username: {store.data.username}</Typography>
                <Typography>Password: {store.data.password}</Typography>
              </>
              :
              <Alert severity="warning">
                {store.errorMessage}
              </Alert>
          }
      </InformationDialog>
    </>
  );
});


// message={ store.errorMessage ? store.errorMessage : `Password for user ${store.data.name} was set to ${store.data.password}`} 
