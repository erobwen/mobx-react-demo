import { Box, Button, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { EditCopyStore } from "./EditCopyStore";
import { useStore } from "../../../general/util-mobx-react";
import { LoadingSpinner } from "../../../general/components/StyledCard";
import { textFieldStyle } from "../../../general/style/style";
import { ComponentCard } from "../../../general/components/ComponentCard";


export const EditCopy = observer(() => {
  const store = useStore(EditCopyStore);
  const { dayMenu } = store;

  return (
    <ComponentCard>
      <Typography variant="h5">Edit Copy</Typography>
      {
        store.isLoading || !dayMenu ? 
          <LoadingSpinner/>
          :
          <>
            <TextField 
              style={textFieldStyle}
              value={dayMenu.breakfast}
              onChange={(event)=> {dayMenu.breakfast = event.target.value}}
              type="text"
              label="Breakfast"
              variant="standard"
              />
            <TextField
              style={textFieldStyle}
              value={dayMenu.lunch}
              onChange={(event)=> {dayMenu.lunch = event.target.value}}
              type="text"
              label="Lunch"
              variant="standard"
              />
            <TextField 
              style={textFieldStyle}
              value={dayMenu.supper}
              onChange={(event)=> {dayMenu.supper = event.target.value}}
              type="text"
              label="Supper"
              variant="standard"
              />
            <Box style={{display: "flex", gap:"10px"}}>
              <Button
                disabled={!dayMenu.hasChanged()}
                onClick={ () => store.revert() }
                variant="contained"
              >
                Revert
              </Button>
              <Button
                disabled={!dayMenu.hasChanged()}
                onClick={() => { store.save(); console.log("Saving...") }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </>
      }
    </ComponentCard>
  );
})
