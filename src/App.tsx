import { ThemeProvider, CssBaseline } from '@mui/material';
import { HassConnect } from '@hakit/core';
import BasementPage from './pages/Basement';
import { darkTheme, lightTheme } from './theme';
import { useState, useMemo } from 'react';
import { ThemeContext, type ThemeMode } from './contexts/ThemeContext';

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Load theme preference from localStorage or default to 'dark'
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'light' || savedMode === 'dark' ? savedMode : 'dark';
  });

  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BasementPage />
        </ThemeProvider>
      </ThemeContext.Provider>
    </HassConnect>
  );
}

export default App;
