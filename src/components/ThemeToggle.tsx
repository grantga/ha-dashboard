import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton
      onClick={toggleTheme}
      color='inherit'
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'rotate(180deg)',
        },
      }}
      aria-label='toggle theme'
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
