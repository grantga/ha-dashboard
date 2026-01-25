import { Box, Typography, IconButton, type Theme } from '@mui/material';
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

import { getAppIcon } from '../resources/appIcons';

export default function MovieMode() {
  const [remoteOpen, setRemoteOpen] = useState(false);

  const ROKU_ENTITIES: Record<string, { remote: EntityName; media: EntityName; activeApp: EntityName }> = {
    movie_room_4k: {
      remote: 'remote.movie_room_4k' as EntityName,
      media: 'media_player.movie_room_4k' as EntityName,
      activeApp: 'sensor.movie_room_4k_active_app' as EntityName,
    },
  };

  const selected = ROKU_ENTITIES.movie_room_4k;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rokuRemote = useEntity(selected.remote as any) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rokuMedia = useEntity(selected.media as any) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeAppSensor = useEntity(selected.activeApp as any) as any;

  const currentAppName = activeAppSensor?.state || rokuMedia?.attributes?.app_name || rokuMedia?.attributes?.source;
  const appIcon = getAppIcon(currentAppName);

  const sendRokuCommand = (value: string) => () => {
    rokuRemote.service.sendCommand({
      serviceData: { device: rokuRemote.entity_id, command: value, num_repeats: 1, delay_secs: 0, hold_secs: 0 },
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 500, md: 500, lg: 600 }, // Fixed md height typo
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Roku device background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: appIcon ? 0.4 : 0.25,
          pointerEvents: 'none',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <Box
          component='img'
          src={appIcon || rokuImg}
          alt='Roku'
          sx={(theme: Theme) => ({
            width: appIcon ? '100%' : '85%',
            height: appIcon ? '100%' : '85%',
            objectFit: appIcon ? 'cover' : 'contain',
            filter: appIcon
              ? 'none'
              : theme.palette.mode === 'dark'
                ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                : 'brightness(0) saturate(100%) invert(35%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(85%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            transition: 'all 0.5s ease-in-out',
          })}
        />
      </Box>

      {/* Device name overlay */}
      <Box
        sx={(theme: Theme) => ({
          position: 'absolute',
          bottom: { xs: 'auto', md: 0 },
          top: { xs: 16, md: 'auto' },
          left: 0,
          right: 0,
          background: { xs: 'transparent', md: theme.palette.custom.overlayGradient },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'flex-end' },
          alignItems: { xs: 'center', md: 'flex-start' },
          pb: { xs: 0, md: 4 },
          px: 4,
          zIndex: 1, // Lower zIndex so buttons are on top
          pointerEvents: 'none', // Critical: allows clicks to pass through to the remote
        })}
      >
        <Typography
          variant='h2'
          sx={(theme: Theme) => ({
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.secondary,
            textAlign: { xs: 'center', md: 'left' },
            textShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.9)' : '0 2px 8px rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '2.25rem', sm: '3.5rem', lg: '4.5rem' },
            fontWeight: 800,
            letterSpacing: '-0.02em',
          })}
        >
          Movie Room 4K
        </Typography>
      </Box>

      {/* Corner D-Pad Remote */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '55%', md: 'auto' }, // Push slightly lower than center for better layout
          left: { xs: '50%', md: 'auto' },
          bottom: { xs: 'auto', md: 32 },
          right: { xs: 'auto', md: 32 },
          transform: { xs: 'translate(-50%, -50%)', md: 'none' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          zIndex: 10, // Higher zIndex than the title overlay
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 200,
            height: 360, // Increased to accommodate the full remote button with proper alignment
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Home Button */}
          <IconButton
            onClick={sendRokuCommand('home')}
            sx={(theme: Theme) => ({
              position: 'absolute',
              top: 60, // Aligned with Up button
              left: 4, // Inset slightly
              width: 48,
              height: 48,
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
            })}
          >
            <HomeIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>

          {/* Back Button */}
          <IconButton
            onClick={sendRokuCommand('back')}
            sx={(theme: Theme) => ({
              position: 'absolute',
              top: 60, // Aligned with Up button
              right: 4, // Inset slightly
              width: 48,
              height: 48,
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
            })}
          >
            <BackIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>

          {/* Up */}
          <IconButton
            onClick={sendRokuCommand('up')}
            sx={(theme: Theme) => ({
              position: 'absolute',
              top: 60, // 48 (Home/Back) + 12 gap
              left: '50%',
              transform: 'translateX(-50%)',
              width: 56,
              height: 56,
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
              color: theme.palette.custom.iconColor,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: theme.palette.custom.buttonBackgroundHover,
                borderColor: 'primary.main',
                transform: 'translateX(-50%) scale(1.1)',
                boxShadow: theme.palette.custom.shadowPrimaryHover,
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
              top: 160, // Perfectly centered vertically relative to Up and Down
              transform: 'translateY(-50%)',
              width: 56,
              height: 56,
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
              color: theme.palette.custom.iconColor,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: theme.palette.custom.buttonBackgroundHover,
                borderColor: 'primary.main',
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: theme.palette.custom.shadowPrimaryHover,
              },
            })}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* OK button in center */}
          <IconButton
            onClick={sendRokuCommand('select')}
            sx={(theme: Theme) => ({
              position: 'absolute',
              top: 160, // Perfectly centered vertically
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 64,
              height: 64,
              background: theme.palette.custom.cardBackgroundGradient,
              border: `2px solid ${theme.palette.primary.main}`,
              color: 'white',
              fontSize: '1rem',
              fontWeight: 800,
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                boxShadow: theme.palette.custom.shadowPrimaryHover,
                filter: 'brightness(1.2)',
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
              top: 160, // Perfectly centered vertically
              transform: 'translateY(-50%)',
              width: 56,
              height: 56,
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
              color: theme.palette.custom.iconColor,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: theme.palette.custom.buttonBackgroundHover,
                borderColor: 'primary.main',
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: theme.palette.custom.shadowPrimaryHover,
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
              top: 204, // 160 (Center) + 32 (OK half) + 12 gap
              left: '50%',
              transform: 'translateX(-50%)',
              width: 56,
              height: 56,
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
              color: theme.palette.custom.iconColor,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: theme.palette.custom.buttonBackgroundHover,
                borderColor: 'primary.main',
                transform: 'translateX(-50%) scale(1.1)',
                boxShadow: theme.palette.custom.shadowPrimaryHover,
              },
            })}
          >
            <ArrowDownwardIcon />
          </IconButton>
          {/* Full Remote Control Button - Aligned with Down Button */}
          <Box
            onClick={() => setRemoteOpen(true)}
            sx={(theme: Theme) => ({
              position: 'absolute',
              top: 204, // Same as Down button for perfect horizontal alignment
              right: 0, // Aligned to the right edge of the directional area
              width: 56,
              height: 56,
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
              zIndex: 11,
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
                background: theme.palette.custom.buttonBackgroundHover,
                border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
                boxShadow: theme.palette.custom.shadowPrimaryHover,
                '& img': {
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(0) saturate(100%) invert(53%) sepia(98%) saturate(3283%) hue-rotate(225deg) brightness(102%) contrast(92%)'
                      : 'brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1613%) hue-rotate(194deg) brightness(98%) contrast(91%)',
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
                height: 28,
                width: 28,
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

      <RokuRemoteModal open={remoteOpen} device='movie_room_4k' onClose={() => setRemoteOpen(false)} />
    </Box>
  );
}
