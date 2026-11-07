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
    turnOn: turnReceiverOn,
    turnOff: turnReceiverOff,
    loadingValue: loadingReceiver,
  } = useMediaPlayer('media_player.rx_v6a_bf8066');
  const {
    value: projectorPower,
    togglePower: setProjectorPower,
    turnOn: turnProjectorOn,
    turnOff: turnProjectorOff,
    loadingValue: loadingProjectorPower,
  } = useMediaPlayer('media_player.epson_5050ub');
  const {
    value: mvPower,
    togglePower: setMVPower,
    turnOn: turnMVOn,
    turnOff: turnMVOff,
    loadingValue: loadingMVPower,
  } = useSelectEntityMode('switch.orei_uhd_401mv_power');

  // "All" reflects only the devices shown on screen. The Multiview switch
  // is hidden in Movie mode, so it must not vote here — when it is off
  // (the normal Movie-mode case) counting it would make All look off
  // even with the receiver and projector on.
  const allOn = receiverPower !== 'off' && projectorPower !== 'off' && (currentMode !== 'multiview' || mvPower !== 'off');

  const devices = [
    {
      id: 'all',
      label: 'All',
      isOn: allOn,
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
      turnOn: turnReceiverOn,
      turnOff: turnReceiverOff,
      icon: SpeakerGroupIcon,
      visible: true,
    },
    {
      id: 'projector',
      label: 'Projector',
      isOn: projectorPower !== 'off',
      loading: loadingProjectorPower,
      togglePower: setProjectorPower,
      turnOn: turnProjectorOn,
      turnOff: turnProjectorOff,
      icon: VideocamIcon,
      visible: true,
    },
    {
      id: 'multiview',
      label: 'Multiview',
      isOn: mvPower !== 'off',
      loading: loadingMVPower,
      togglePower: setMVPower,
      turnOn: turnMVOn,
      turnOff: turnMVOff,
      icon: ViewQuiltIcon,
      visible: currentMode === 'multiview',
    },
  ];

  const handleClick = async (device: { id: string }) => {
    if (device.id === 'all') {
      const visibleDevices = devices.filter(d => d.id !== 'all' && d.visible);
      if (visibleDevices.every(d => d.isOn)) {
        // Turn everything off, projector first, one awaited call at a
        // time. The old code fired three un-awaited toggles in the same
        // tick, so the projector's call could be lost with no error and
        // no retry. Explicit turnOff calls are deterministic regardless
        // of cached state, and each one just sends its call and moves
        // on — nothing waits for a device to report its new state.
        // A Multiview switch left on from an earlier session still
        // gets shut down even though it is hidden in Movie mode.
        const offOrder = ['projector', 'receiver', 'multiview'];
        for (const id of offOrder) {
          const d = devices.find(d => d.id === id);
          if (d && d.isOn) {
            await d.turnOff?.();
          }
        }
      } else {
        // Turn on any visible device that is off (never auto-power the
        // hidden Multiview switch when in Movie mode).
        for (const d of visibleDevices) {
          if (!d.isOn) {
            await d.turnOn?.();
          }
        }
      }
      return;
    }
    // Individual button: direct toggle, exactly as before.
    const d = devices.find(d => d.id === device.id);
    await d?.togglePower?.();
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap sx={{ width: '100%' }}>
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
                  justifyContent: 'center',
                  '& .MuiButton-startIcon': {
                    marginRight: { xs: 0, sm: 1 },
                  },
                  '&:hover': {
                    boxShadow: (theme: Theme) => (b.isOn ? theme.palette.custom.shadowPrimaryHover : theme.palette.custom.shadowSecondary),
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
  );
}
