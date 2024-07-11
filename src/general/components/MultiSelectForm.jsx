import { observer } from "mobx-react";
import { Box, Chip, MenuItem, FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";


export const MultiSelectForm = observer(({title, selected, onChange, values}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Observe for MUI component
  selected.forEach(_ => {});
  values.forEach(_ => {});

  return (
    <FormControl style={{ m: 1, width: 300 }}>
      <InputLabel id="roles">{title}</InputLabel>
      <Select
        labelId="roles"
        multiple
        value={selected}
        onChange={onChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              return <Chip key={value} label={value} />
          })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {values.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});