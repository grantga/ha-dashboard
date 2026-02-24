import { Box, Stack, Fade, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import useMediaPlayer from '../hooks/useMediaPlayer';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';
import DevicePower from '../components/DevicePower';
import MediaPlayerControl from '../components/MediaPlayerControl';
import ThemeToggle from '../components/ThemeToggle';
import LightEntityControl from '../components/LightEntityControl';
import DashboardCard from '../components/DashboardCard';
import ModeToggle from '../components/ModeToggle';
import MovieMode from '../components/MovieMode';

export default function BasementPage() {
  const { value: mode, setValue: setMode, loadingValue: loadMode } = useSelectEntityMode('select.orei_uhd_401mv_multiview_mode');
  const {
    value: tripleMode,
    setValue: setTripleMode,
    loadingValue: loadingTriple,
  } = useSelectEntityMode('select.orei_uhd_401mv_triple_mode');
  const { value: quadMode, setValue: setQuadMode, loadingValue: loadingQuad } = useSelectEntityMode('select.orei_uhd_401mv_quad_mode');
  const { value: pbpMode, setValue: setPbpMode, loadingValue: loadingPbp } = useSelectEntityMode('select.orei_uhd_401mv_pbp_mode');

  // Receiver control for input switching
  const { setSource, value: receiverState, currentSource } = useMediaPlayer('media_player.rx_v6a_bf8066');

  // Movie vs Multiview mode state
  const [appMode, setAppMode] = useState<'movie' | 'multiview'>('movie');
  const [modeLoading, setModeLoading] = useState(false);
  const initializedRef = useRef(false);

  // Initialize app mode based on receiver's current source
  useEffect(() => {
    if (!initializedRef.current && currentSource) {
      initializedRef.current = true;
      if (currentSource === 'Movie Room') {
        setAppMode('movie');
      } else {
        setAppMode('multiview');
      }
    }
  }, [currentSource]);

  const handleModeChange = async (newMode: 'movie' | 'multiview') => {
    setModeLoading(true);
    setAppMode(newMode);

    // Switch receiver input based on mode
    if (newMode === 'movie') {
      await setSource('Movie Room');
    } else {
      await setSource('HDMI1 multi');
    }

    setModeLoading(false);
  };

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
        // Support for iOS safe areas (status bar, home indicator, notches)
        pt: {
          xs: 'calc(12px + env(safe-area-inset-top))',
          sm: 'calc(16px + env(safe-area-inset-top))',
          md: 'calc(32px + env(safe-area-inset-top))',
        },
        pb: {
          xs: 'calc(12px + env(safe-area-inset-bottom))',
          sm: 'calc(16px + env(safe-area-inset-bottom))',
          md: 'calc(32px + env(safe-area-inset-bottom))',
        },
        pl: {
          xs: 'calc(12px + env(safe-area-inset-left))',
          sm: 'calc(16px + env(safe-area-inset-left))',
          md: 'calc(32px + env(safe-area-inset-left))',
        },
        pr: {
          xs: 'calc(12px + env(safe-area-inset-right))',
          sm: 'calc(16px + env(safe-area-inset-right))',
          md: 'calc(32px + env(safe-area-inset-right))',
        },
      }}
    >
      {/* Theme Toggle - Floating in bottom-right */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom))',
          right: 'calc(24px + env(safe-area-inset-right))',
          zIndex: 100,
        }}
      >
        <ThemeToggle />
      </Box>

      <Box sx={{ maxWidth: 1400, width: '100%' }}>
        <Fade in timeout={500}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Controls Column - Shows first on mobile */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={{ xs: 2, sm: 3 }}>
                <ModeToggle currentMode={appMode} onModeChange={handleModeChange} loading={modeLoading} />
                <DashboardCard>
                  <Stack spacing={{ xs: 2, sm: 3 }}>
                    <DevicePower currentMode={appMode} />
                    <LightEntityControl
                      entityId='light.h600b'
                      controlEntityIds={['light.h600b', 'light.h600b_2', 'light.h600b_3', 'light.h6046']}
                    />
                    {receiverState !== 'off' && receiverState !== 'unknown' && <MediaPlayerControl entityId='media_player.rx_v6a_bf8066' />}
                  </Stack>
                </DashboardCard>
              </Stack>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} lg={8}>
              {appMode === 'multiview' ? (
                <DashboardCard contentPadding={{ xs: 2, sm: 3 }} noPadding={false}>
                  <ModeSelector
                    mode={detailedMode}
                    setMode={setMode}
                    setTripleMode={setTripleMode}
                    setQuadMode={setQuadMode}
                    setPbpMode={setPbpMode}
                    loading={loadingAny}
                  />
                  <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                    <MultiViewLayout mode={detailedMode} loading={loadingAny} />
                  </Box>
                </DashboardCard>
              ) : (
                <MovieMode />
              )}
            </Grid>
          </Grid>
        </Fade>
      </Box>
    </Box>
  );
}
