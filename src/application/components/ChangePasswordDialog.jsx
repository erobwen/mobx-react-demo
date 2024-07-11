import { observer } from "mobx-react";
import { action, computed, makeObservable, observable } from "mobx";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { userClient } from "../clients/UserClient";

import { Store } from "../../general/util-mobx-react";
import { LoadingSpinner, formBoxStyle } from "../../general/components/StyledCard";
import { useStore } from "../../general/util-mobx-react";
import { textFieldStyle } from "../../general/style/style";
import { PasswordField } from "../../general/components/PasswordField";
import { validatePassword } from "../../general/components/validatePassword";

class ChangePasswordDialogStore extends Store {
  constructor(props) {
    super();
    this.currentPassword = "";
    this.password = "";
    this.repeatedPassword = "";
    // this.currentPassword = "P@ssw0rd123";
    // this.password = "P@ssw0rd123";
    // this.repeatedPassword = "P@ssw0rd123";
    this.updateConstructorArguments(props);
    this.sentRequest = false;
    this.loading = false; 

    this.resultSuccess = false;
    this.resultMessage = "";

    makeObservable(this, {
      currentPassword: observable,
      password: observable,
      repeatedPassword: observable,
      sentRequest: observable,
      loading: observable,
      resultSuccess: observable, 
      resultMessage: observable,

      validate: computed,
      validatePassword: computed,
      samePasswords: computed,
      errors: computed,
      displayErrors: computed, 

      cancelChanges: action.bound,
      changePassword: action.bound,
      confirmResult: action.bound
    })
  }

  onCreated() {
    // autorun(() => {
    //   console.log("validate: " + this.validate);
    //   console.log("samePasswords: " + this.samePasswords);
    // }) 
  }

  get validate() {
    return this.validatePassword && this.samePasswords && this.currentPassword.length >= 8; 
  }
  
  get validatePassword() {
    return this.errors.length === 0;  
  }

  get samePasswords() {
    return this.password === this.repeatedPassword;
  }

  get errors() {
    return validatePassword(this.password);
  }

  get displayErrors() {
    return this.password.length >= 3;
  }

  cancelChanges() {
    this.password = "";
    this.repeatedPassword = "";
    this.doClose();
  }

  async changePassword() {
    this.sentRequest = true; 
    this.loading = true;
    try {
      await userClient.changePassword(this.currentPassword, this.password);
      this.resultSuccess = true; 
      this.resultMessage = "Successfully updated password!";
      this.loading = false; 
    } catch (error) {
      this.resultSuccess = false; 
      this.resultMessage = error.message; 
      this.loading = false; 
    }
  }

  confirmResult() {
    this.sentRequest = false; 
    this.loading = false; 
    if (this.resultSuccess) {
      this.password = "";
      this.repeatedPassword = "";
      this.doClose();
    }
  }
}

export const ChangePasswordDialog = observer((properties) => { 
  const { open, doClose } = properties;
  const store = useStore(ChangePasswordDialogStore, properties);

  return (
    <>
      <Dialog onClose={doClose} open={open} PaperProps={{style: { minWidth: 600, minHeight: 500 }}}>
        <DialogTitle>Change Password</DialogTitle>
        {!store.sentRequest ?
          <ChoosePasswordContent store={store}/>
          :
          <ResponseInformation store={store}/>
        }
      </Dialog>
    </>
  );
});

const ChoosePasswordContent = observer(({store}) => {
  const { currentPassword, password, repeatedPassword, changePassword, cancelChanges, samePasswords, validate, validatePassword, errors, displayErrors } = store;
  return (
    <>
      <DialogContent>
        <Box style={formBoxStyle}>
          <PasswordField
            style={textFieldStyle}
            value={currentPassword}
            onChange={(event)=> {store.currentPassword = event.target.value}}
            type="password"
            label="Current Password"
            variant="standard"
            />
          <PasswordField
            style={textFieldStyle}
            value={password}
            onChange={(event)=> {store.password = event.target.value}}
            type="password"
            label="New Password"
            variant="standard"
            />
          <TextField
            error={!samePasswords && displayErrors}
            style={textFieldStyle}
            value={repeatedPassword}
            onChange={(event)=> {store.repeatedPassword = event.target.value}}
            type="password"
            label="Repeat password"
            helperText={ (!samePasswords && store.repeatedPassword !== "" && displayErrors) ? "Passwords must match" : null }
            variant="standard"
            />
        </Box>
        { !validatePassword && displayErrors && 
          <Alert severity="warning">
            {errors.map(error => <Typography key={error}>{error}</Typography>)}
          </Alert>
        }
      </DialogContent>
      <DialogActions>
        <Button 
          disabled={ !validate } 
          onClick={ changePassword }>
            Change Password
        </Button>
        <Button onClick={ cancelChanges }>Cancel</Button>
      </DialogActions>
    </>
  );
})

const ResponseInformation = observer(({store}) => {
  
  const { confirmResult, resultMessage, resultSuccess } = store; 

  if (store.loading) return <LoadingSpinner/>; 

  return (
    <>
      <DialogContent>
        <Alert severity={resultSuccess ? "success" : "warning"}>{ resultMessage }</Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={ confirmResult }>Ok</Button>
      </DialogActions>
    </>
  );
});