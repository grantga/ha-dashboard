import { Box, Grid, Skeleton } from '@mui/material';
import HDMIInput from './HDMIInput';
import useSelectEntityMode from '../hooks/useSelectEntityMode';

export default function MultiViewLayout({ mode, loading }: { mode: string | null; loading: boolean }) {
  const previewHeight = 280;
  const { value: audioSource, loadingValue: loadingAudioSource, setValue: setAudioSource } = useSelectEntityMode('select.orei_uhd_401mv_audio_output_source');
  if (loading) {
    return (
      <Box sx={{ height: previewHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Skeleton variant='rectangular' width='60%' height={previewHeight * 0.6} />
      </Box>
    );
  }
  //render the selected mode
  switch (mode) {
    case 'Single':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
          </Grid>
        </Box>
      );
    case 'PIP':
      return (
        <Box sx={{ height: previewHeight, mt: 2, position: 'relative' }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
          </Grid>
          <Box sx={{ position: 'absolute', right: 24, bottom: 24, width: 140, height: 90 }}>
            <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
          </Box>
        </Box>
      );
    case 'PBP':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={6}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={6}>
              <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
          </Grid>
        </Box>
      );
    case 'PBP2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={6}>
              <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={4}>
              <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
          </Grid>
        </Box>
      );
    case 'Triple':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction='column'>
                <Grid item sx={{ height: '50%' }}>
                  <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
                <Grid item sx={{ height: '50%' }}>
                  <HDMIInput windowIndex={3} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Triple2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction='column'>
                <Grid item sx={{ height: '50%' }}>
                  <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
                <Grid item sx={{ height: '50%' }}>
                  <HDMIInput windowIndex={3} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Quad':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={6}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={6}>
              <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={6}>
              <HDMIInput windowIndex={3} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={6}>
              <HDMIInput windowIndex={4} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
          </Grid>
        </Box>
      );
    case 'Quad2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}>
              <HDMIInput windowIndex={1} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
            </Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction='column'>
                <Grid item sx={{ height: '33.333%' }}>
                  <HDMIInput windowIndex={2} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
                <Grid item sx={{ height: '33.333%' }}>
                  <HDMIInput windowIndex={3} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
                <Grid item sx={{ height: '33.333%' }}>
                  <HDMIInput windowIndex={4} audioSource={audioSource} loadingAudioSource={loadingAudioSource} setAudioSource={setAudioSource} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    default:
      return null;
  }
}
