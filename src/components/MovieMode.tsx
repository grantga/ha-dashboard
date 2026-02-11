import { Box, IconButton, type Theme } from '@mui/material';
import { useState } from 'react';
import rokuImg from '../resources/images/roku.svg';
import remoteImg from '../resources/images/remote.svg';
import RokuRemoteModal from './RokuRemoteModal';
import { useEntity, type EntityName } from '@hakit/core';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function MovieMode() {
  const [remoteOpen, setRemoteOpen] = useState(false);

  const ROKU_ENTITIES: Record<string, { remote: EntityName; media: EntityName }> = {
    movie_room_4k: {
      remote: 'remote.movie_room_4k' as EntityName,
      media: 'media_player.movie_room_4k' as EntityName,
    },
  };

  const selected = ROKU_ENTITIES.movie_room_4k;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rokuRemote = useEntity(selected.remote as any) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rokuMedia = useEntity(selected.media as any) as any;

  // Get app icon from Home Assistant media player entity_picture
  let appIcon = rokuMedia?.attributes?.entity_picture;

  // If the entity_picture is a relative URL, prepend the HA URL
  if (appIcon && appIcon.startsWith('/')) {
    appIcon = `${import.meta.env.VITE_HA_URL}${appIcon}`;
  }

  const sendRokuCommand = (value: string) => () => {
    rokuRemote.service.sendCommand({
      serviceData: { device: rokuRemote.entity_id, command: value, num_repeats: 1, delay_secs: 0, hold_secs: 0 },
    });
  };

  const sendRokuLaunchApp = (command: string) => () => {
    rokuMedia.service.selectSource({ serviceData: { source: command } });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Left side - D-Pad Remote (50%) */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* D-Pad Remote using flexbox layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: { xs: 160, sm: 200 }, m: { xs: 2, sm: 3 } }}>
          {/* Row 1: Home, Up, Back */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              disableRipple
              onClick={sendRokuCommand('home')}
              sx={(theme: Theme) => ({
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <HomeIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>

            <IconButton
              disableRipple
              onClick={sendRokuCommand('up')}
              sx={(theme: Theme) => ({
                width: { xs: 44, sm: 56 },
                height: { xs: 44, sm: 56 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <ArrowUpwardIcon />
            </IconButton>

            <IconButton
              disableRipple
              onClick={sendRokuCommand('back')}
              sx={(theme: Theme) => ({
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <BackIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Box>

          {/* Row 2: Left, OK, Right */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              disableRipple
              onClick={sendRokuCommand('left')}
              sx={(theme: Theme) => ({
                width: { xs: 44, sm: 56 },
                height: { xs: 44, sm: 56 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              disableRipple
              onClick={sendRokuCommand('select')}
              sx={(theme: Theme) => ({
                width: { xs: 52, sm: 64 },
                height: { xs: 52, sm: 64 },
                background: theme.palette.custom.cardBackgroundGradient,
                border: `2px solid ${theme.palette.primary.main}`,
                color: 'white',
                fontSize: '1rem',
                fontWeight: 800,
                backdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                  filter: 'brightness(1.2)',
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.cardBackgroundGradient,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              })}
            >
              OK
            </IconButton>

            <IconButton
              disableRipple
              onClick={sendRokuCommand('right')}
              sx={(theme: Theme) => ({
                width: { xs: 44, sm: 56 },
                height: { xs: 44, sm: 56 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          {/* Row 3: Empty, Down, Remote button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ width: { xs: 40, sm: 48 } }} />

            <IconButton
              disableRipple
              onClick={sendRokuCommand('down')}
              sx={(theme: Theme) => ({
                width: { xs: 44, sm: 56 },
                height: { xs: 44, sm: 56 },
                background: theme.palette.custom.buttonBackground,
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                color: theme.palette.custom.iconColor,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: theme.palette.custom.buttonBackgroundHover,
                  borderColor: 'primary.main',
                  transform: 'scale(1.1)',
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                },
                '&:focus, &:focus-visible, &.Mui-focusVisible': {
                  outline: 'none',
                  background: theme.palette.custom.buttonBackground,
                  border: `2px solid ${theme.palette.custom.buttonBorder}`,
                },
              })}
            >
              <ArrowDownwardIcon />
            </IconButton>

            <Box
              onClick={() => setRemoteOpen(true)}
              sx={(theme: Theme) => ({
                width: { xs: 44, sm: 56 },
                height: { xs: 44, sm: 56 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                background: theme.palette.custom.cardBackgroundHover,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${theme.palette.custom.buttonBorder}`,
                boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  background: theme.palette.custom.buttonBackgroundHover,
                  border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                  boxShadow: theme.palette.custom.shadowPrimaryHover,
                  '& img': {
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(1000%) hue-rotate(190deg) brightness(100%) contrast(95%)'
                        : 'brightness(0) saturate(100%) invert(45%) sepia(70%) saturate(800%) hue-rotate(190deg) brightness(95%) contrast(90%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.9)',
                },
              })}
            >
              <Box
                component='img'
                src={remoteImg}
                sx={(theme: Theme) => ({
                  height: { xs: 22, sm: 28 },
                  width: { xs: 22, sm: 28 },
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%)'
                      : 'brightness(0) saturate(100%) invert(30%) sepia(18%) saturate(1046%) hue-rotate(181deg) brightness(80%) contrast(90%)',
                  transition: 'all 0.2s ease-in-out',
                  pointerEvents: 'none',
                })}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right side - App Icon (50%) */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {appIcon && (
          <Box
            component='img'
            src={appIcon}
            alt='Current App'
            sx={{
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        )}
      </Box>

      <RokuRemoteModal open={remoteOpen} device='movie_room_4k' onClose={() => setRemoteOpen(false)} />
    </Box>
  );
}
