import { Box, Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { StyledCard } from "../../general/components/StyledCard";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { useObservable } from "../../general/util-mobx-react";
import { getUser, getUserStore } from "../stores/getUserStore";

export const CurrentUserCard = observer(() => {
  const state = useObservable(() => ({changePasswordDialogOpen: false}));

  const user = getUser();
  if (!user)  {
    return null;
  }

  return (
    <>
      <StyledCard name={"Logged in as"}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{user.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Username</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{user.username}</Typography>
          </Grid>
        </Grid>
        <Box style={{display: "flex", justifyContent: "end", gap: "10px"}}>
          <Button
            onClick={() => { state.changePasswordDialogOpen = true; }}
            variant="contained"
          >
            Change Password
          </Button>            
          
          <Button
            onClick={() => getUserStore().logout()}
            variant="contained"
          >
            Logout
          </Button>            
        </Box>
      </StyledCard>
      <ChangePasswordDialog 
        open={ state.changePasswordDialogOpen } 
        doClose={() => { state.changePasswordDialogOpen = false; }}
      />
    </>
  );
});