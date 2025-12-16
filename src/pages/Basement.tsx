import { Box, Card, CardContent, Stack, Fade, type Theme } from '@mui/material';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';
import DevicePower from '../components/DevicePower';
import MediaPlayerControl from '../components/MediaPlayerControl';
import ThemeToggle from '../components/ThemeToggle';
import LightEntityControl from '../components/LightEntityControl';

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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100%', position: 'relative' }}>
      {/* Theme Toggle - Floating in bottom-right */}
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 10 }}>
        <ThemeToggle />
      </Box>

      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Stack spacing={1}>
          <Fade in timeout={300}>
            <Card
              variant='outlined'
              sx={(theme: Theme) => ({
                background: `linear-gradient(135deg, ${theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)'} 0%, ${theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)'} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.custom.border}`,
              })}
            >
              <CardContent>
                <Stack spacing={2}>
                  <DevicePower />
                  <LightEntityControl entityId='light.h600b' controlEntityIds={['light.h600b', 'light.h600b_2']} />
                  <MediaPlayerControl entityId='media_player.rx_v6a_bf8066' />
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          <Fade in timeout={500}>
            <Card
              variant='outlined'
              sx={(theme: Theme) => ({
                background: `linear-gradient(135deg, ${theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)'} 0%, ${theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)'} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.custom.border}`,
              })}
            >
              <CardContent sx={{ p: 2.5 }}>
                <ModeSelector
                  mode={detailedMode}
                  setMode={setMode}
                  setTripleMode={setTripleMode}
                  setQuadMode={setQuadMode}
                  setPbpMode={setPbpMode}
                  loading={loadingAny}
                />
                <MultiViewLayout mode={detailedMode} loading={loadingAny} />
              </CardContent>
            </Card>
          </Fade>
        </Stack>
      </Box>
    </Box>
  );
}
