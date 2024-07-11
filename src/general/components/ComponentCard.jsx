import { Card } from "@mui/material";
import { hardShadow, pagePadding, columnStyle } from "../style/style";

export const ComponentCard = ({style, children}) => {
  return (
    <Card style={{...columnStyle, maxWidth: "800px", margin: 10, padding: pagePadding, boxShadow: hardShadow, ...style}}>{children}</Card>
  );
}