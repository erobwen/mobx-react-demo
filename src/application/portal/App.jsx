import { ThemeProvider } from '@mui/material/styles';
import { loginTheme } from "../../general/style/theme";
import { Router } from './Router';
import { menuItems } from './menuItems';

/**
 * Application
 */
export const App = () => {
  return (
    <ThemeProvider theme={loginTheme}>
      <Router menuItems={menuItems}/>
    </ThemeProvider>
  );
}

// Note: Do NOT use useStrict! We do not need it when we use MobX and it confusingly runs render twice for every component in develop mode.