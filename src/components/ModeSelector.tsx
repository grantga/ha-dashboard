import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Skeleton, type Theme } from '@mui/material';
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
    <Box
      {...(loading ? { 'aria-busy': true } : {})}
      sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        mx: { xs: -2, sm: -3 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => {
          setSelectedMode(v);
        }}
        aria-label='display mode'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 0.5, sm: 1 },
          width: 'max-content',
          minWidth: '100%',
          justifyContent: 'flex-start',
          '& .MuiToggleButtonGroup-grouped': {
            border: 'none',
            '&:not(:first-of-type)': {
              borderLeft: 'none',
              marginLeft: 0,
            },
          },
        }}
      >
        {MODES.map(m => {
          const IconComp = m.Icon;
          return loading ? (
            <Skeleton
              key={m.key}
              variant='rectangular'
              sx={(theme: Theme) => ({
                minWidth: { xs: 48, sm: 60 },
                minHeight: { xs: 48, sm: 60 },
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                background: theme.palette.custom.shimmerGradient,
                backgroundSize: '200% 100%',
                animation: 'shimmer 6s infinite',
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              })}
            />
          ) : (
            <Tooltip key={m.key} title={m.label} placement='top' arrow>
              <ToggleButton
                value={m.key}
                sx={(theme: Theme) => ({
                  minWidth: { xs: 48, sm: 60 },
                  minHeight: { xs: 48, sm: 60 },
                  flexShrink: 0,
                  px: { xs: 0.5, sm: 1 },
                  py: { xs: 0.5, sm: 1 },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    '& .mode-icon': {
                      color: theme.palette.primary.main,
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                })}
              >
                <Box
                  className='mode-icon'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  <IconComp />
                </Box>
              </ToggleButton>
            </Tooltip>
          );
        })}
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
