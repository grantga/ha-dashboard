import { Box, type Theme } from '@mui/material';
import { useState } from 'react';
import rokuImg from '../resources/images/roku.svg';
import remoteImg from '../resources/images/remote.svg';
import RokuRemoteModal from './RokuRemoteModal';
import { Typography } from '@mui/material';

export default function MovieMode() {
  const [remoteOpen, setRemoteOpen] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={(theme: Theme) => ({
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          borderRadius: 3,
          overflow: 'hidden',
          border: '2px solid',
          borderColor: 'custom.border',
          background: theme.palette.custom.cardBackground,
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.custom.shadowPrimary,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: theme.palette.custom.shadowPrimaryHover,
          },
        })}
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
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        >
          <Box
            component='img'
            src={rokuImg}
            alt='Roku'
            sx={(theme: Theme) => ({
              width: '85%',
              height: '85%',
              objectFit: 'contain',
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                  : 'brightness(0) saturate(100%) invert(35%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(85%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
              transition: 'all 0.3s ease-in-out',
            })}
          />
        </Box>

        {/* Device name overlay */}
        <Box
          sx={(theme: Theme) => ({
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: theme.palette.custom.overlayGradient,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            pb: 3,
            px: 3,
          })}
        >
          <Typography
            variant='h4'
            sx={(theme: Theme) => ({
              color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.secondary,
              textAlign: 'left',
              textShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.9)' : '0 2px 8px rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 700,
              letterSpacing: '-0.01em',
            })}
          >
            Roku
          </Typography>
        </Box>

        {/* Remote control button */}
        <Box
          onClick={() => setRemoteOpen(true)}
          sx={(theme: Theme) => ({
            position: 'absolute',
            top: 24,
            right: 24,
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '50%',
            background: theme.palette.custom.cardBackgroundHover,
            backdropFilter: 'blur(10px)',
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease-in-out',
            zIndex: 10,
            '&:hover': {
              transform: 'scale(1.1)',
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
              transform: 'scale(0.95)',
            },
          })}
        >
          <Box
            component='img'
            src={remoteImg}
            sx={(theme: Theme) => ({
              height: 36,
              width: 36,
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

      <RokuRemoteModal open={remoteOpen} device='roku1' onClose={() => setRemoteOpen(false)} />
    </Box>
  );
}
