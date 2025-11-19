import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Skeleton } from '@mui/material';
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

export default function ModeSelector({ mode, setMode, setTripleMode, setQuadMode, setPbpMode, loading }: { mode: string; setMode: (m: string) => void; loading: boolean; setPbpMode: (m: string) => void; setTripleMode: (m: string) => void; setQuadMode: (m: string) => void; }) {
  if (mode === "unavailable") {
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
        <Grid container spacing={1} sx={{ p: 1, justifyContent: 'center' }}>
          {MODES.map(m => {
            const IconComp = m.Icon;
            return (
              <Grid key={m.key}>
                {loading ? (
                  <Skeleton
                    variant='rectangular'
                    sx={{ minWidth: 56, height: 72, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1 }}
                  />
                ) : (
                  <Tooltip title={m.label} placement='top'>
                    <ToggleButton
                      value={m.key}
                      sx={{ height: 72, minWidth: 56, px: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
    </Box >
  );

  function setSelectedMode(v: any) {
    if (v === "Single") {
      setMode("Single");
    }
    if (v === "PIP") {
      setMode("PIP");
    }
    if (v === "PBP2") {
      setMode("PBP");
      setPbpMode("PBP mode 2");
    } else if (v === "PBP") {
      setMode("PBP");
      setPbpMode("PBP mode 1");
    }
    if (v === "Triple2") {
      setMode("Triple");
      setTripleMode("Triple mode 2");
    } else if (v === "Triple") {
      setMode("Triple");
      setTripleMode("Triple mode 1");
    }
    if (v === "Quad2") {
      setMode("Quad");
      setQuadMode("Mode 2");
    } else if (v === "Quad") {
      setMode("Quad");
      setQuadMode("Mode 1");
    }
  }
}
