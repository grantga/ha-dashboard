import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { HassConnect } from '@hakit/core';
import Dashboard from './Dashboard';

const theme = createTheme({
  palette: { mode: 'light' },
});

function App() {
  return (
    <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </HassConnect>
  );
}

export default App;