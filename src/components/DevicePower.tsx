import { Box, Button, Stack } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import useMediaPlayer from '../hooks/useMediaPlayer';

export default function DevicePower() {
  const {
    value: receiverPower,
    togglePower: setReceiverPower,
    loadingValue: loadingReceiver,
  } = useMediaPlayer('media_player.rx_v6a_bf8066');
  const {
    value: projectorPower,
    togglePower: setProjectorPower,
    loadingValue: loadingProjectorPower,
  } = useMediaPlayer('media_player.epson_5050ub');
  const { value: mvPower, togglePower: setMVPower, loadingValue: loadingMVPower } = useSelectEntityMode('switch.orei_uhd_401mv_power');

  const devices = [
    {
      id: 'all',
      label: 'All',
      isOn: !(receiverPower === 'off' || projectorPower === 'off' || mvPower === 'off'),
      loading: loadingReceiver || loadingProjectorPower || loadingMVPower,
    },
    { id: 'receiver', label: 'Receiver', isOn: receiverPower !== 'off', loading: loadingReceiver, togglePower: setReceiverPower },
    { id: 'projector', label: 'Projector', isOn: projectorPower !== 'off', loading: loadingProjectorPower, togglePower: setProjectorPower },
    { id: 'multiview', label: 'Multiview', isOn: mvPower !== 'off', loading: loadingMVPower, togglePower: setMVPower },
  ];

  const handleClick = (device: any) => {
    // Toggle local on/off state for the button and log the new state
    if (device.id === 'all') {
      // if all devices are  on, turn them all off
      if (devices.every(d => d.isOn)) {
        devices.forEach(d => {
          if (d.togglePower && d.isOn) {
            d.togglePower();
          }
        });
      } else {
        //turn on any device that is off
        devices.forEach(d => {
          if (d.togglePower && !d.isOn) {
            d.togglePower();
          }
        });
      }
    } else {
      device.togglePower();
    }
  };

  return (
    // container that stretches full width and centers the vertical button stack at the top
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 0, width: '100%', maxWidth: '100%' }}>
        <Stack direction='row' spacing={1.5} flexWrap='nowrap' useFlexGap sx={{ width: '100%' }}>
          {devices.map(b => {
            return (
              <Button
                key={b.id}
                variant={b.isOn ? 'contained' : 'outlined'}
                loading={b.loading !== ''}
                loadingPosition='start'
                size='large'
                onClick={() => handleClick(b)}
                startIcon={<PowerSettingsNewIcon sx={{ flexShrink: 0 }} />}
                sx={{
                  flex: 1,
                  minWidth: { xs: 0, sm: 120 },
                  maxWidth: { xs: '25%', sm: 'none' },
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.95rem' },
                  boxShadow: (theme: any) => (b.isOn ? theme.palette.custom.shadowPrimary : 'none'),
                  overflow: 'hidden',
                  '& .MuiButton-startIcon': {
                    marginRight: { xs: 0.5, sm: 1 },
                  },
                  '&:hover': {
                    boxShadow: (theme: any) => (b.isOn ? theme.palette.custom.shadowPrimaryHover : theme.palette.custom.shadowSecondary),
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  {b.label}
                </Box>
              </Button>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
