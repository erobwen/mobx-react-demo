import { Box, Button, Typography } from "@mui/material";
import { ComponentWithStoreStore } from "./ComponentWithStoreStore";
import { observer } from "mobx-react";
import { useStore } from "../../../general/util-mobx-react";
import { rowStyle } from "../../../general/style/style";
import { ComponentCard } from "../../../general/components/ComponentCard";

export const ComponentWithStore = observer(() => {
  const store = useStore(ComponentWithStoreStore);
  console.log(store);

  return (
    <ComponentCard>
      <Typography>valueA: {store.valueA}</Typography>
      <Typography>valueB: {store.valueB}</Typography>
      <Typography>product: {store.product}</Typography>
      <Box style={rowStyle}>
        <Button variant="contained" onClick={store.incrementAll}>
          Increase Both
        </Button>
        <Button variant="contained" onClick={()=> {store.valueA++}}>
          Increase A
        </Button>
        <Button variant="contained" onClick={()=> {store.valueB++}}>
          Increase B
        </Button>
      </Box>
    </ComponentCard>
  );
})