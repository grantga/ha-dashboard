import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { HassConnect } from '@hakit/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import HomePage from './pages/Home';
import BasementPage from './pages/Basement';
import LivingRoomPage from './pages/LivingRoom';

const theme = createTheme({
  palette: { mode: 'light' },
});

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
            <Route path="/" element={<Dashboard />}>
              <Route index element={<HomePage />} />
              <Route path="basement" element={<BasementPage />} />
              <Route path="living-room" element={<LivingRoomPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HassConnect>
  );
}

export default App;