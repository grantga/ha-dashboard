import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Skeleton, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconSingle, IconPIP, IconPBP, IconPBPAlt, IconTripleA, IconTripleB, IconQuadA, IconQuadB } from './MultiviewIcons';

const MODES = [
  { key: 'Single', label: 'Single', Icon: IconSingle },
  { key: 'PIP', label: 'PIP', Icon: IconPIP },
  { key: 'PBP', label: 'PBP', Icon: IconPBP },
  { key: 'PBP2', label: 'PBP2', Icon: IconPBPAlt },
  { key: 'Triple', label: 'Triple', Icon: IconTripleA },
  { key: 'Triple2', label: 'Triple2', Icon: IconTripleB },
  { key: 'Quad', label: 'Quad', Icon: IconQuadA },
  { key: 'Quad2', label: 'Quad2', Icon: IconQuadB },
];

export default function ModeSelector({
  mode,
  setMode,
  setTripleMode,
  setQuadMode,
  setPbpMode,
  loading,
}: {
  mode: string;
  setMode: (m: string) => void;
  loading: boolean;
  setPbpMode: (m: string) => void;
  setTripleMode: (m: string) => void;
  setQuadMode: (m: string) => void;
}) {
  if (mode === 'unavailable') {
    return null;
  }
  return (
    <Box {...(loading ? { 'aria-busy': true } : {})}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => {
          setSelectedMode(v);
        }}
        aria-label='display mode'
        sx={{ width: '100%', justifyContent: 'center' }}
      >
        <Grid container spacing={1.5} sx={{ p: 0, justifyContent: 'center' }}>
          {MODES.map(m => {
            const IconComp = m.Icon;
            return (
              <Grid key={m.key}>
                {loading ? (
                  <Skeleton
                    variant='rectangular'
                    sx={(theme: Theme) => ({
                      minWidth: 64,
                      height: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      px: 1,
                      borderRadius: 2,
                      background: theme.palette.custom.shimmerGradient,
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 6s infinite',
                      '@keyframes shimmer': {
                        '0%': {
                          backgroundPosition: '200% 0',
                        },
                        '100%': {
                          backgroundPosition: '-200% 0',
                        },
                      },
                    })}
                  />
                ) : (
                  <Tooltip title={m.label} placement='top' arrow>
                    <ToggleButton
                      value={m.key}
                      sx={(theme: Theme) => ({
                        height: 80,
                        minWidth: 64,
                        px: 1.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.palette.custom.shadowPrimary,
                        },
                        '&.Mui-selected': {
                          transform: 'scale(1.05)',
                          boxShadow: theme.palette.custom.shadowPrimary,
                        },
                      })}
                    >
                      <Box sx={{ color: 'text.primary' }}>
                        <IconComp />
                      </Box>
                    </ToggleButton>
                  </Tooltip>
                )}
              </Grid>
            );
          })}
        </Grid>
      </ToggleButtonGroup>
    </Box>
  );

  function setSelectedMode(v: string | null) {
    if (v === 'Single') {
      setMode('Single');
    }
    if (v === 'PIP') {
      setMode('PIP');
    }
    if (v === 'PBP2') {
      setMode('PBP');
      setPbpMode('PBP mode 2');
    } else if (v === 'PBP') {
      setMode('PBP');
      setPbpMode('PBP mode 1');
    }
    if (v === 'Triple2') {
      setMode('Triple');
      setTripleMode('Triple mode 2');
    } else if (v === 'Triple') {
      setMode('Triple');
      setTripleMode('Triple mode 1');
    }
    if (v === 'Quad2') {
      setMode('Quad');
      setQuadMode('Mode 2');
    } else if (v === 'Quad') {
      setMode('Quad');
      setQuadMode('Mode 1');
    }
  }
}
