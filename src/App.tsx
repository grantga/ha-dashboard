import { ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { HassConnect } from '@hakit/core';
import BasementPage from './pages/Basement';
import { darkTheme, lightTheme } from './theme';
import { useState, useMemo, useCallback } from 'react';
import { ThemeContext, type ThemeMode } from './contexts/ThemeContext';

function ReconnectionStatus() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 3,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48 }} color='error' />
      <Typography variant='h6'>Can't connect to Home Assistant...</Typography>
      <Button variant='outlined' startIcon={<RefreshIcon />} onClick={handleRefresh}>
        Please Refresh
      </Button>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
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

  const renderError = useCallback(() => <ReconnectionStatus />, []);

  return (
    <HassConnect hassUrl={import.meta.env.VITE_HA_URL} options={{ renderError }}>
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
