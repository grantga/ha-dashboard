import { Box, Stack, Fade, Grid } from '@mui/material';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';
import DevicePower from '../components/DevicePower';
import MediaPlayerControl from '../components/MediaPlayerControl';
import ThemeToggle from '../components/ThemeToggle';
import LightEntityControl from '../components/LightEntityControl';
import DashboardCard from '../components/DashboardCard';

export default function BasementPage() {
  const { value: mode, setValue: setMode, loadingValue: loadMode } = useSelectEntityMode('select.orei_uhd_401mv_multiview_mode');
  const {
    value: tripleMode,
    setValue: setTripleMode,
    loadingValue: loadingTriple,
  } = useSelectEntityMode('select.orei_uhd_401mv_triple_mode');
  const { value: quadMode, setValue: setQuadMode, loadingValue: loadingQuad } = useSelectEntityMode('select.orei_uhd_401mv_quad_mode');
  const { value: pbpMode, setValue: setPbpMode, loadingValue: loadingPbp } = useSelectEntityMode('select.orei_uhd_401mv_pbp_mode');

  const loadingAny = loadMode !== '' || loadingTriple !== '' || loadingQuad !== '' || loadingPbp !== '';
  //handle the alt pbp, triple and quad modes
  let detailedMode = mode;
  if (mode == 'PBP' && pbpMode == 'PBP mode 2') {
    detailedMode = 'PBP2';
  } else if (mode == 'Triple' && tripleMode == 'Triple mode 2') {
    detailedMode = 'Triple2';
  } else if (mode == 'Quad' && quadMode == 'Mode 2') {
    detailedMode = 'Quad2';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        position: 'relative',
        p: { xs: 2, md: 4 }, // Responsive padding
      }}
    >
      {/* Theme Toggle - Floating in bottom-right */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
        <ThemeToggle />
      </Box>

      <Box sx={{ maxWidth: 1400, width: '100%' }}>
        <Fade in timeout={500}>
          <Grid container spacing={4}>
            {/* Left Column: Controls (Power, Media, Lights) */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                <DashboardCard>
                  <Stack spacing={3}>
                    <DevicePower />
                    <MediaPlayerControl entityId='media_player.rx_v6a_bf8066' />
                  </Stack>
                </DashboardCard>

                <DashboardCard>
                  <LightEntityControl entityId='light.h600b' controlEntityIds={['light.h600b', 'light.h600b_2']} />
                </DashboardCard>
              </Stack>
            </Grid>

            {/* Right Column: Main Multiview Interface */}
            <Grid item xs={12} lg={8}>
              <DashboardCard contentPadding={3}>
                <ModeSelector
                  mode={detailedMode}
                  setMode={setMode}
                  setTripleMode={setTripleMode}
                  setQuadMode={setQuadMode}
                  setPbpMode={setPbpMode}
                  loading={loadingAny}
                />
                <Box sx={{ mt: 3 }}>
                  <MultiViewLayout mode={detailedMode} loading={loadingAny} />
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Fade>
      </Box>
    </Box>
  );
}
