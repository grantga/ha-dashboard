import { ThemeProvider, CssBaseline } from '@mui/material';
import { HassConnect } from '@hakit/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasementPage from './pages/Basement';
import { darkTheme, lightTheme } from './theme';
import { useState, useMemo, createContext } from 'react';

type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext({
  mode: 'dark' as ThemeMode,
  toggleTheme: () => { },
});

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Load theme preference from localStorage or default to 'dark'
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode === 'light' || savedMode === 'dark') ? savedMode : 'dark';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

  return (
    <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
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
      </ThemeContext.Provider>
    </HassConnect>
  );
}

export default App;
