import { useEffect, useState } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import HDMIInput from './HDMIInput';

export default function MultiViewLayout({ mode, loading }: { mode?: string | null; loading: boolean }) {
  const [localMode, setLocalMode] = useState<string | null | undefined>(mode);
  useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

  const previewHeight = 280;

  if (loading) {
    return (
      <Box sx={{ height: previewHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Skeleton variant="rectangular" width="60%" height={previewHeight * 0.6} />
      </Box>
    );
  }

  switch (localMode) {
    case 'Single':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12}><HDMIInput /></Grid>
          </Grid>
        </Box>
      );
    case 'PIP':
      return (
        <Box sx={{ height: previewHeight, mt: 2, position: 'relative' }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12}><HDMIInput label="Main" /></Grid>
          </Grid>
          <Box sx={{ position: 'absolute', right: 24, bottom: 24, width: 140, height: 90 }}>
            <HDMIInput />
          </Box>
        </Box>
      );
    case 'PBP':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={6}><HDMIInput /></Grid>
            <Grid item xs={6}><HDMIInput /></Grid>
          </Grid>
        </Box>
      );
    case 'PBP2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={8}><HDMIInput /></Grid>
            <Grid item xs={4}><HDMIInput /></Grid>
          </Grid>
        </Box>
      );
    case 'Triple':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}><HDMIInput /></Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction="column">
                <Grid item sx={{ height: '50%' }}><HDMIInput /></Grid>
                <Grid item sx={{ height: '50%' }}><HDMIInput /></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Triple2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}><HDMIInput /></Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction="column">
                <Grid item sx={{ height: '50%' }}><HDMIInput /></Grid>
                <Grid item sx={{ height: '50%' }}><HDMIInput /></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    case 'Quad':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={6}><HDMIInput /></Grid>
            <Grid item xs={6}><HDMIInput /></Grid>
            <Grid item xs={6}><HDMIInput /></Grid>
            <Grid item xs={6}><HDMIInput /></Grid>
          </Grid>
        </Box>
      );
    case 'Quad2':
      return (
        <Box sx={{ height: previewHeight, mt: 2 }}>
          <Grid container sx={{ height: '100%' }} spacing={1}>
            <Grid item xs={7}><HDMIInput /></Grid>
            <Grid item xs={5}>
              <Grid container sx={{ height: '100%' }} spacing={1} direction="column">
                <Grid item sx={{ height: '33.333%' }}><HDMIInput /></Grid>
                <Grid item sx={{ height: '33.333%' }}><HDMIInput /></Grid>
                <Grid item sx={{ height: '33.333%' }}><HDMIInput /></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    default:
      return null;
  }
}
