import { ThemeProvider, CssBaseline } from '@mui/material';
import { HassConnect } from '@hakit/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasementPage from './pages/Basement';
import { theme } from './theme';

function App() {
  return (
    <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* When the app is served from a subpath (for example /local/ha-dashboard),
      set the router basename so routes resolve correctly. Prefer Vite's
      BASE_URL, then VITE_BASE, and finally fall back to '/local/ha-dashboard'. */}
        <BrowserRouter basename={(import.meta as any).env.BASE_URL || (import.meta as any).env.VITE_BASE || '/local/ha-dashboard'}>
          <Routes>
            <Route path='/' element={<BasementPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HassConnect>
  );
}

export default App;
