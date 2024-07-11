import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { observer } from "mobx-react"
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useObservable } from "../util-mobx-react";

export const PasswordField = observer((properties) => {
  const { style, value, onChange, label, variant} = properties; 

  const state = useObservable(() => ({ showPassword: false }));
  const { showPassword } = state;
  
  const handleClickShowPassword = () => { state.showPassword = !state.showPassword; };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl style={style} variant={variant}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Input
        value={value}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
});


