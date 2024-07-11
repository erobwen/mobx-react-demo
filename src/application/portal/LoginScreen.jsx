import { LoginForm } from "./LoginForm";
import { observer } from "mobx-react";
import { Box } from "@mui/system";

export const LoginScreen = observer(() => {
  return (
    <Box style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "rgba(50,50,50)"}}>
      <LoginForm/>
    </Box>
  );
});