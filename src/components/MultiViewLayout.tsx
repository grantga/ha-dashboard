import { Box, Skeleton, Typography, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HDMIInput from './HDMIInput';
import useSelectEntityMode from '../hooks/useSelectEntityMode';

export default function MultiViewLayout({ mode, loading }: { mode: string | null; loading: boolean }) {
  const previewHeight = 280;
  const {
    value: audioSource,
    loadingValue: loadingAudioSource,
    setValue: setAudioSource,
  } = useSelectEntityMode('select.orei_uhd_401mv_audio_output_source');
  if (loading) {
    return (
      <Box sx={{ height: previewHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Skeleton
          variant='rectangular'
          width='60%'
          height={previewHeight * 0.6}
          sx={(theme: Theme) => ({
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
      </Box>
    );
  }
  //render the selected mode
  switch (mode) {
    case 'Single':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid size={12}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 'PIP':
      return (
        <Box sx={{ height: previewHeight, mt: 2, position: 'relative' }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid size={12}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
          </Grid>
          <Box sx={{ position: 'absolute', right: 24, bottom: 24, width: 180, height: 140 }}>
            <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
          </Box>
        </Box>
      );
    case 'PBP':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={2}>
            <Grid size={6}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={6}>
              <HDMIInput
                windowIndex={2}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 'PBP2':
      return (
        <Box sx={{ height: previewHeight, width: '100%', mt: 2 }}>
          <Grid container sx={{ height: '100%', justifyContent: 'center' }} spacing={2}>
            <Grid size={6}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={4}>
              <HDMIInput
                windowIndex={2}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 'Triple':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%', justifyContent: 'center' }} spacing={2}>
            <Grid size={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container sx={{ height: '60%', width: '100%' }} spacing={1} direction='column' justifyContent='center'>
                <HDMIInput
                  windowIndex={1}
                  audioSource={audioSource}
                  loadingAudioSource={loadingAudioSource}
                  setAudioSource={setAudioSource}
                />
              </Grid>
            </Grid>
            <Grid size={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction='column'>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={2}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={3}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Triple2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={2}>
            <Grid size={7}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction='column'>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={2}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={3}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Quad':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={2}>
            <Grid size={6}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={6}>
              <HDMIInput
                windowIndex={2}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={6}>
              <HDMIInput
                windowIndex={3}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={6}>
              <HDMIInput
                windowIndex={4}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 'Quad2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={2}>
            <Grid size={7}>
              <HDMIInput
                windowIndex={1}
                audioSource={audioSource}
                loadingAudioSource={loadingAudioSource}
                setAudioSource={setAudioSource}
              />
            </Grid>
            <Grid size={5}>
              <Grid container direction='column' spacing={1} sx={{ height: '100%' }}>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={2}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={3}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
                <Grid sx={{ flex: 1 }}>
                  <HDMIInput
                    windowIndex={4}
                    audioSource={audioSource}
                    loadingAudioSource={loadingAudioSource}
                    setAudioSource={setAudioSource}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    default:
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant='h6' sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Multiview is off.
          </Typography>
        </Box>
      );
  }
}
