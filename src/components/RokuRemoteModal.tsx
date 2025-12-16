import { Dialog, DialogTitle, DialogContent, Box, IconButton, type Theme } from '@mui/material';
import type { DeviceType } from './DevicePickerModal';
import { useEntity } from '@hakit/core';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon2 from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect?: (device: DeviceType) => void;
  device: DeviceType;
};

export default function RokuRemoteModal({ open, onClose, device }: Props) {
  const rokuRemote = useEntity(device === 'roku1' ? 'remote.roku_basement_1' : 'remote.roku_basement_2');
  const rokuMediaPlayer = useEntity(device === 'roku1' ? 'media_player.roku_basement_1' : 'media_player.roku_basement_2');

  const sendRokuCommand = (command: string) => () => {
    rokuRemote.service.sendCommand({
      serviceData: { device: rokuRemote.entity_id, command: { value: command }, num_repeats: 1, delay_secs: 0, hold_secs: 0 },
    });
  };

  const sendRokuLaunchApp = (command: string) => () => {
    rokuMediaPlayer.service.selectSource({ serviceData: { source: command } });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      PaperProps={{
        sx: (theme: Theme) => ({
          background: theme.palette.custom.modalBackground,
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: `1px solid ${theme.palette.custom.modalBorder}`,
          boxShadow: theme.palette.custom.modalShadow,
        }),
      }}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          fontSize: '1.5rem',
          fontWeight: 700,
          borderBottom: `1px solid ${theme.palette.custom.modalBorder}`,
          pb: 2,
          textAlign: 'center',
        })}
      >
        Roku Remote
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            py: 3,
          }}
        >
          {/* Top row: Home and Back */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              onClick={sendRokuCommand('home')}
              sx={(theme: Theme) => ({
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              })}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              onClick={sendRokuCommand('back')}
              sx={(theme: Theme) => ({
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              })}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          {/* D-pad with OK in center */}
          <Box
            sx={{
              position: 'relative',
              width: 220,
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Up */}
            <IconButton
              onClick={sendRokuCommand('up')}
              sx={(theme: Theme) => ({
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'translateX(-50%) scale(1.05)',
                },
                '&:active': {
                  transform: 'translateX(-50%) scale(0.95)',
                },
              })}
            >
              <ArrowUpwardIcon />
            </IconButton>

            {/* Left */}
            <IconButton
              onClick={sendRokuCommand('left')}
              sx={(theme: Theme) => ({
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'translateY(-50%) scale(1.05)',
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
              })}
            >
              <ArrowBackIcon2 />
            </IconButton>

            {/* OK button in center */}
            <IconButton
              onClick={sendRokuCommand('select')}
              sx={(theme: Theme) => ({
                width: 64,
                height: 64,
                background: theme.palette.custom.cardBackgroundGradient,
                border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                color: theme.palette.custom.iconColorHover,
                fontSize: '0.875rem',
                fontWeight: 700,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.cardBackgroundGradientHover,
                  border: `2px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.light,
                  transform: 'scale(1.05)',
                  boxShadow: theme.palette.custom.shadowPrimary,
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              })}
            >
              OK
            </IconButton>

            {/* Right */}
            <IconButton
              onClick={sendRokuCommand('right')}
              sx={(theme: Theme) => ({
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'translateY(-50%) scale(1.05)',
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
              })}
            >
              <ArrowForwardIcon />
            </IconButton>

            {/* Down */}
            <IconButton
              onClick={sendRokuCommand('down')}
              sx={(theme: Theme) => ({
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 56,
                height: 56,
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  color: theme.palette.custom.iconColorHover,
                  transform: 'translateX(-50%) scale(1.05)',
                },
                '&:active': {
                  transform: 'translateX(-50%) scale(0.95)',
                },
              })}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>

          {/* 2x2 App Launch Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 96px)',
              gridTemplateRows: 'repeat(2, 48px)',
              gap: 1,
              justifyContent: 'center',
              alignItems: 'center',
              m: 2,
            }}
          >
            <IconButton onClick={sendRokuLaunchApp('ESPN')} sx={getSendCommandButtonStyle()}>
              ESPN
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('Xfinity Stream')} sx={getSendCommandButtonStyle()}>
              Xfinity
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('Disney Plus')} sx={getSendCommandButtonStyle()}>
              Disney+
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('Netflix')} sx={getSendCommandButtonStyle()}>
              Netflix
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('FOX Sports')} sx={getSendCommandButtonStyle()}>
              FOX Sports
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('Prime Video')} sx={getSendCommandButtonStyle()}>
              Prime Video
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('YouTube TV')} sx={getSendCommandButtonStyle()}>
              YouTube TV
            </IconButton>
            <IconButton onClick={sendRokuLaunchApp('Apple TV')} sx={getSendCommandButtonStyle()}>
              Apple TV
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  function getSendCommandButtonStyle() {
    return (theme: Theme) => ({
      width: 96,
      height: 48,
      background: theme.palette.custom.buttonBackground,
      border: `2px solid ${theme.palette.custom.buttonBorder}`,
      color: theme.palette.custom.iconColor,
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: 8,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        background: theme.palette.custom.buttonBackgroundHover,
        border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
        color: theme.palette.custom.iconColorHover,
        transform: 'scale(1.05)',
      },
      '&:active': {
        transform: 'scale(0.95)',
      },
    });
  }
}
