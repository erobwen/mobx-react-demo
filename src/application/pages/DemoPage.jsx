import { Box, Typography } from "@mui/material";
import { pageMargin } from "../../general/style/style";

export const DemoPage = () => {
  return (
    <Box style={{height: "100vh", margin: pageMargin, display: "flex", justifyContent: "space-around", alignItems: "center"}}>
      <Typography>Demo Page!</Typography>
    </Box>
  );
};