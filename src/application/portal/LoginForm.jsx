import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { textFieldStyle } from "../../general/style/style";
import { useStore } from "../../general/util-mobx-react";
import { Store } from "../../general/util-mobx-react";
import { action, computed, makeObservable, observable } from "mobx";
import { userClient } from "../clients/UserClient";
import { StyledCard } from "../../general/components/StyledCard";
import { useNavigate } from "react-router-dom";

class LoginFormStore extends Store {
  constructor() {
    super();
    this.isLoading = false;
    const username = localStorage.getItem("username");

    this.data = {
      username: username ? username : "admin",
      password: "admin"
      // password: "P@ssw0rd123",
    }
    this.successMessage = "";
    this.errorMessage = "";
    makeObservable(this, {
      isLoading: observable,
      data: observable,
      errorMessage: observable,
      successMessage: observable,
      submit: action,
      validate: computed
    });
    this.submit = this.submit.bind(this);
  }

  useHooks() {
    this.navigate = useNavigate();
  }

  showSuccessMessage(message) {
    this.successMessage = message;
    setTimeout(() => {this.successMessage = null}, 3000);
  }
  
  showErrorMessage(message) {
    this.errorMessage = message;
    setTimeout(() => {this.errorMessage = null}, 3000);
  }

  async submit() {
    this.isLoading = true; 
    localStorage.setItem("username", this.data.username);

    try {
      const result = await userClient.login(this.data);
      this.showSuccessMessage(result.message);
      this.navigate("/");
    } catch (error) {
      this.data.password = ""; 
      this.showErrorMessage(error.message);
    }

    this.isLoading = false;
  }

  get validate() {
    return this.data.password !== "" && this.data.username !== "";
  }
}


export const LoginForm = observer(() => {
  const { data, isLoading, errorMessage, successMessage, validate, submit } = useStore(LoginFormStore)
  // return <div>Foo</div>
  return (
    <StyledCard 
      style={{width: "300px"}}
      header={
        <Box style={{display: "flex", gap: "10px", alignItems: "center", justifyContent: "start"}}>
          <Typography variant="h5">Login</Typography>
        </Box>
      } 
      loading={isLoading}> 
      {!isLoading && 
        <>
          <TextField 
            // css={textFieldCss}
            style={textFieldStyle}
            value={data.username}
            onChange={(event)=> {data.username = event.target.value}}
            type="text"
            label="Username"
            variant="standard"
            />
          <TextField 
            // css={textFieldCss}
            style={textFieldStyle}
            value={data.password}
            onChange={(event)=> {data.password = event.target.value}}
            type="password"
            label="password"
            variant="standard"
            />
          { errorMessage && 
            <Alert severity="warning">{errorMessage}</Alert>
          }
          { successMessage && 
            <Alert severity="success">{successMessage}</Alert>
          }
          <Button
            disabled={ !validate }
            onClick={ submit }
            variant="contained"
          >
            Login
          </Button>            
        </>
      }
    </StyledCard>
  );
});