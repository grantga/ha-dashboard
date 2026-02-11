import { Box, IconButton, type Theme } from '@mui/material';
import { useEntity, type EntityName } from '@hakit/core';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function MovieMode() {
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
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      {/* Top row - Remote and App Icon */}
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

            <Box sx={{ width: { xs: 40, sm: 48 } }} />
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
      </Box>

      {/* Bottom section - App Launch Icons */}
      <Box
        sx={(theme: Theme) => ({
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(4, 1fr)',
          },
          gap: 1.5,
          width: '100%',
          borderRadius: 2,
          p: 2,
          background: theme.palette.custom.cardBackground,
          border: `1px solid ${theme.palette.custom.border}`,
        })}
      >
        <IconButton
          onClick={sendRokuLaunchApp('ESPN')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          ESPN
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('Xfinity Stream')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          Xfinity
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('Disney Plus')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          Disney+
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('Netflix')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          Netflix
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('FOX Sports')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          FOX Sports
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('Prime Video')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          Prime Video
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('YouTube TV')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          YouTube TV
        </IconButton>
        <IconButton
          onClick={sendRokuLaunchApp('Apple TV')}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
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
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          Apple TV
        </IconButton>
      </Box>
    </Box>
  );
}
