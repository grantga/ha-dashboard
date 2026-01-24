import { Box, Button, Stack, type Theme } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import VideocamIcon from '@mui/icons-material/Videocam'; // Projector
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'; // Multiview
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import useMediaPlayer from '../hooks/useMediaPlayer';

export default function DevicePower({ currentMode }: { currentMode: 'movie' | 'multiview' }) {
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
      icon: PowerSettingsNewIcon,
      visible: true,
    },
    {
      id: 'receiver',
      label: 'Receiver',
      isOn: receiverPower !== 'off',
      loading: loadingReceiver,
      togglePower: setReceiverPower,
      icon: SpeakerGroupIcon,
      visible: true,
    },
    {
      id: 'projector',
      label: 'Projector',
      isOn: projectorPower !== 'off',
      loading: loadingProjectorPower,
      togglePower: setProjectorPower,
      icon: VideocamIcon,
      visible: true,
    },
    {
      id: 'multiview',
      label: 'Multiview',
      isOn: mvPower !== 'off',
      loading: loadingMVPower,
      togglePower: setMVPower,
      icon: ViewQuiltIcon,
      visible: currentMode === 'multiview',
    },
  ];

  const handleClick = (device: (typeof devices)[number]) => {
    // Toggle local on/off state for the button and log the new state
    if (device.id === 'all') {
      // if all devices are  on, turn them all off
      if (devices.every(d => d.isOn)) {
        devices.forEach(d => {
          if (d.togglePower && d.isOn && d.visible) {
            d.togglePower();
          }
        });
      } else {
        //turn on any device that is off
        devices.forEach(d => {
          if (d.togglePower && !d.isOn && d.visible) {
            d.togglePower();
          }
        });
      }
    } else {
      device.togglePower?.();
    }
  };

  return (
    // container that stretches full width and centers the vertical button stack at the top
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 0, width: '100%', maxWidth: '100%' }}>
        <Stack direction='row' spacing={1.5} flexWrap='wrap' useFlexGap sx={{ width: '100%' }}>
          {devices
            .filter(d => d.visible)
            .map(b => {
              const Icon = b.icon;
              return (
                <Button
                  key={b.id}
                  variant={b.isOn ? 'contained' : 'outlined'}
                  loading={b.loading !== ''}
                  loadingPosition='start'
                  size='large'
                  onClick={() => handleClick(b)}
                  startIcon={<Icon sx={{ flexShrink: 0 }} />}
                  sx={{
                    flex: '1 1 auto', // Allow grow and shrink, but auto basis for content adaptation
                    maxWidth: { xs: '100%', sm: 'none' },
                    mt: { xs: 1, sm: 0 }, // Add margin top for wrapped items
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.9rem' },
                    boxShadow: (theme: Theme) => (b.isOn ? theme.palette.custom.shadowPrimary : 'none'),
                    overflow: 'hidden',
                    '& .MuiButton-startIcon': {
                      marginRight: { xs: 0.5, sm: 1 },
                    },
                    '&:hover': {
                      boxShadow: (theme: Theme) =>
                        b.isOn ? theme.palette.custom.shadowPrimaryHover : theme.palette.custom.shadowSecondary,
                    },
                  }}
                >
                  <Box
                    component='span'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: { xs: 'none', sm: 'block' },
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
