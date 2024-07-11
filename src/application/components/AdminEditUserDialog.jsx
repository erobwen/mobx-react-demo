import { observer } from "mobx-react";
import { useGlobalStore, useStore } from "../../general/util-mobx-react";
import { LoadingSpinner, formBoxStyle } from "../../general/components/StyledCard";
import { Alert, Box, Button,  Dialog,  DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { textFieldStyle } from "../../general/style/style";
import { Store } from "../../general/util-mobx-react";
import {  action, computed, makeObservable, observable } from "mobx";
import { userClient } from "../clients/UserClient";
import { copyForEdit, synch } from "../../general/util-mobx-react";
import { ConfirmationDialog, InformationDialog } from "../../general/components/CommonDialogs";
import { MultiSelectForm } from "../../general/components/MultiSelectForm";
import { generatePassword } from "../../general/components/validatePassword";
import { RoleStore } from "../stores/RoleStore";

export class AdminEditUserDialogStore extends Store {
  constructor({abstractUser, doClose, doDelete, doActivate}) {
    super();
    this.updateConstructorArguments({abstractUser, doClose, doDelete, doActivate});
    this.confirmDeleteOpen = false;
    this.activateUserOpen = false; 

    this.deletingUser = false; 

    this.saveUserErrorMessage = null; 

    this.newPassword = null;
    this.newPasswordErrorMessage = null;
    this.sendingNewPassword = false; 

    makeObservable(this, {
      confirmDeleteOpen: observable,
      activateUserOpen: observable,
      abstractUser: observable,
      user: observable,
      userCopy: observable,

      deletingUser: observable,

      saveUserErrorMessage: observable,

      newPassword: observable,
      newPasswordErrorMessage: observable,
      sendingNewPassword: observable,

      hasChanges: computed,

      saveUser: action.bound,
      setNewRandomPassword: action.bound,
      closeShowNewPasswordOpen: action.bound, 
      deleteUser: action.bound,
      cancelChanges: action.bound,
      closeConfirmDelete: action.bound,
      openConfirmDelete: action.bound,
      openActivateUser: action.bound, 
      closeActivateUser: action.bound,
    })
  }
  
  updateConstructorArguments(values) {
    Object.assign(this, values);
    this.user = null;
    this.userCopy = null;
    this.loadUser();
  }

  onCreated() {
    // autorun(() => {
    //   console.group("Changes");
    //   console.log(JSON.stringify(this.user, 2));
    //   console.log(JSON.stringify(this.userCopy, 2));
    //   console.groupEnd();
    // });
  }

  async loadUser() {
    this.user = await userClient.getUser(this.abstractUser.id);
    this.userCopy = copyForEdit(this.user);
  }

  async saveUser() {
    this.userCopy.submit();
    try {
      await userClient.updateUser(this.user);
      synch(this.abstractUser, this.user, {dontAddProperties: true});
      this.doClose();
    } catch(error) {
      this.saveUserErrorMessage = error.message;
      setTimeout(() => {
        this.saveUserErrorMessage = null;
      }, 3000)
    }
  }

  get hasChanges() {
    return this.userCopy ? !this.userCopy.hasChanged() : false;
  }

  async setNewRandomPassword() {
    const newRandomPassword = generatePassword(); 
    try {
      this.sendingNewPassword = true; 
      this.newPassword = newRandomPassword;
      await userClient.adminChangePassword(this.user.id, newRandomPassword);
      console.log("Set random password: " + newRandomPassword);
      this.sendingNewPassword = false; 
    } catch (error) {
      this.sendingNewPassword = false; 
      this.newPassword = null;
      this.newPasswordErrorMessage = error.message; 
    }
  }
  
  closeShowNewPasswordOpen() {
    this.newPassword = null;
    this.newPasswordErrorMessage = null;
  }

  openConfirmDelete() {
    this.confirmDeleteOpen = true; 
  }

  closeConfirmDelete() {
    this.confirmDeleteOpen = false; 
  }

  async deleteUser() {
    this.deletingUser = true;
    await this.doDelete();
    this.userCopy.active = 0; // TODO: Have the copy for edit respond to changes in the original. 
    this.doClose();
    this.confirmDeleteOpen = false; 
  }

  openActivateUser() {
    this.activateUserOpen = true; 
    this.activateUser();
  }

  closeActivateUser() {
    this.activateUserOpen = false;
  }

  async activateUser() {
    console.log("activateUser")
    await this.doActivate();
    this.userCopy.active = 1;
    this.activateUserOpen = false; 
  }

  cancelChanges() {
    this.userCopy.revert();
    this.userCopy = null;
    this.user = null;
    this.doClose();
  }
}

export const AdminEditUserDialog = observer(({abstractUser, doClose, doDelete, doActivate}) => {
  const store = useStore(AdminEditUserDialogStore, {abstractUser, doClose, doDelete, doActivate}); 
  const { userCopy, saveUser, cancelChanges, newPassword, sendingNewPassword, newPasswordErrorMessage, closeShowNewPasswordOpen, deleteUser, setNewRandomPassword, hasChanges, confirmDeleteOpen, deletingUser, closeConfirmDelete, openConfirmDelete } = store;  
  const roleStore = useGlobalStore(RoleStore);

  let toCopy = "";
  if (userCopy) {
    toCopy += "name: " + userCopy.name + "\n";
    toCopy += "email: " + userCopy.email + "\n";
    toCopy += "username: " + userCopy.username + "\n";
    toCopy += "password: " + newPassword + "\n";
  }

  return (
    <>
      <Dialog onClose={doClose} open={abstractUser !== null}
        PaperProps={{style: { minWidth: 500 }}}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <Box style={formBoxStyle}>
            { !userCopy || !roleStore.availableRoles ? 
              <LoadingSpinner/>
              :
              <>
                <TextField 
                  style={textFieldStyle}
                  value={userCopy.name}
                  onChange={(event)=> {userCopy.name = event.target.value}}
                  type="text"
                  label="Name"
                  variant="standard"
                  />
                <TextField
                  style={textFieldStyle}
                  value={userCopy.email}
                  onChange={(event)=> {userCopy.email = event.target.value}}
                  type="text"
                  label="Email"
                  variant="standard"
                  />
                <TextField
                  style={textFieldStyle}
                  value={userCopy.username}
                  onChange={(event)=> {userCopy.username = event.target.value}}
                  type="text"
                  label="Username"
                  variant="standard"
                  />
                <MultiSelectForm 
                  title={"Roles"}
                  selected={userCopy.roles} 
                  values={roleStore.availableRoles.map(role => role.name)} 
                  onChange={change => {
                    synch(userCopy.roles, change.target.value);
                  }}/>      
              </>
            }   
            {store.saveUserErrorMessage && 
              <Alert severity="warning">{store.saveUserErrorMessage}</Alert>
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ setNewRandomPassword }>Reset Password</Button>
          {
            userCopy && userCopy.active === 1 ? 
              <Button onClick={ openConfirmDelete }>Deactivate User</Button>
              :
              <Button onClick={ store.openActivateUser }>Activate User</Button>
          }
          <Button 
            disabled={ hasChanges } 
            onClick={ saveUser }>
              Save
          </Button>
          <Button onClick={ cancelChanges }>Cancel</Button>
        </DialogActions>
      </Dialog> 
      <ConfirmationDialog 
        open={ confirmDeleteOpen }
        loading={ deletingUser }
        message="Really inactivate user?" 
        onCancel={ closeConfirmDelete } 
        onOk={ deleteUser } 
        />
      <InformationDialog 
        open={store.activateUserOpen}
        loading={true}
        title={"Activating user"} />      
      {userCopy &&       
        <InformationDialog
          open={ !!newPasswordErrorMessage || !!newPassword }
          title={ newPasswordErrorMessage ? "Something went wrong" : "Password was reset"}
          loading={ sendingNewPassword }
          copyToClipboard={toCopy}
          copyToClipboardMessage="Copied password to clipboard"
          onOk={ closeShowNewPasswordOpen }>
            {
              !newPasswordErrorMessage ? 
                <>
                  <Typography>Name: {userCopy.name}</Typography>
                  <Typography>Email: {userCopy.email}</Typography>
                  <Typography>Username: {userCopy.username}</Typography>
                  <Typography>Password: {newPassword}</Typography>
                </>
                :
                <Alert severity="warning">
                  {newPasswordErrorMessage}
                </Alert>
            }
        </InformationDialog>
      }
    </>
  );
});

