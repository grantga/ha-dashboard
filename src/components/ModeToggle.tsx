import { Box, Button, type Theme } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

type ModeToggleProps = {
  currentMode: 'movie' | 'multiview';
  onModeChange: (mode: 'movie' | 'multiview') => void;
  loading?: boolean;
};

export default function ModeToggle({ currentMode, onModeChange, loading = false }: ModeToggleProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
      <Button
        variant={currentMode === 'movie' ? 'contained' : 'outlined'}
        size='large'
        onClick={() => onModeChange('movie')}
        disabled={loading}
        startIcon={<MovieIcon sx={{ flexShrink: 0 }} />}
        sx={{
          flex: 1,
          py: 1.5,
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.9rem' },
          boxShadow: (theme: Theme) => (currentMode === 'movie' ? theme.palette.custom?.shadowPrimary : 'none'),
          '&:hover': {
            boxShadow: (theme: Theme) =>
              currentMode === 'movie' ? theme.palette.custom?.shadowPrimaryHover : theme.palette.custom?.shadowSecondary,
          },
        }}
      >
        Movie Mode
      </Button>
      <Button
        variant={currentMode === 'multiview' ? 'contained' : 'outlined'}
        size='large'
        onClick={() => onModeChange('multiview')}
        disabled={loading}
        startIcon={<ViewQuiltIcon sx={{ flexShrink: 0 }} />}
        sx={{
          flex: 1,
          py: 1.5,
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.9rem' },
          boxShadow: (theme: Theme) => (currentMode === 'multiview' ? theme.palette.custom?.shadowPrimary : 'none'),
          '&:hover': {
            boxShadow: (theme: Theme) =>
              currentMode === 'multiview' ? theme.palette.custom?.shadowPrimaryHover : theme.palette.custom?.shadowSecondary,
          },
        }}
      >
        Multi Mode
      </Button>
    </Box>
  );
}
