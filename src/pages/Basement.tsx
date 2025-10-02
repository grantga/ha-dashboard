import { Container, Typography, Box, Grid, ToggleButton, ToggleButtonGroup, Tooltip, Skeleton, CircularProgress } from '@mui/material';
import useMultiviewMode from '../hooks/useMultiviewMode';
import { IconSingle, IconPIP, IconPBP, IconPBPAlt, IconTripleA, IconTripleB, IconQuadA, IconQuadB } from '../components/MultiviewIcons';

// ...existing code...

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

function ModeSelector() {
  const { mode, setMode, loading } = useMultiviewMode();

  if (loading) {
    return (
      <Box aria-busy>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <CircularProgress size={28} />
        </Box>
        <Grid container spacing={1} sx={{ p: 1 }}>
          {MODES.map((m) => (
            <Grid item xs={3} key={m.key}>
              <Box sx={{ width: '100%', height: 72, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={40} height={28} />
                <Skeleton variant="text" width={48} sx={{ mt: 0.5 }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => { if (v) setMode(v); }}
        aria-label="display mode"
        sx={{ width: '100%' }}
      >
        <Grid container spacing={1} sx={{ p: 1 }}>
          {MODES.map((m) => (
            <Grid item xs={3} key={m.key}>
              <Tooltip title={m.label} placement="top">
                <ToggleButton value={m.key} sx={{ width: '100%', height: 72, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{ color: 'text.primary' }}><m.Icon /></Box>
                  <Typography variant="caption" sx={{ mt: 0.5 }}>{m.label}</Typography>
                </ToggleButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </ToggleButtonGroup>
    </Box>
  );
}

export default function BasementPage() {
  return (
    <Container>
      <ModeSelector />
    </Container>
  );
}
