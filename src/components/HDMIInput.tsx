import { Box, Typography, type Theme } from '@mui/material';
import rokuImg from '../resources/images/roku.svg';
import switchImg from '../resources/images/switch.svg';
import xboxImg from '../resources/images/xbox.svg';
import remoteImg from '../resources/images/remote.svg';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import { useEntity, type EntityName } from '@hakit/core';
import DevicePickerModal from './DevicePickerModal';
import type { DeviceType as PickerDeviceType } from './DevicePickerModal';
import { useState, useEffect } from 'react';
import RokuRemoteModal from './RokuRemoteModal';

type DeviceType = 'roku1' | 'roku2' | 'switch' | 'xbox' | 'default';

type HDMIInputProps = {
  windowIndex: number;
  audioSource: string;
  loadingAudioSource: string;
  setAudioSource: (key: string) => Promise<void>;
};

export default function HDMIInput({ windowIndex, audioSource, loadingAudioSource, setAudioSource }: HDMIInputProps) {
  const {
    value: hdmiValue,
    loadingValue: loadingHdmiValue,
    setValue: setHdmiValue,
  } = useSelectEntityMode(`select.orei_uhd_401mv_window_${windowIndex}_input`);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [remoteOpen, setRemoteOpen] = useState(false);
  const [xboxImageFailed, setXboxImageFailed] = useState(false);

  const inferDevice = (val: unknown): DeviceType => {
    // Try to extract the HDMI/input number first
    const digits = (String(val).match(/\d+/) || [])[0];
    const n = digits ? Number(digits) : undefined;
    if (n === 1) return 'roku1';
    if (n === 2) return 'roku2';
    if (n === 3) return 'switch';
    if (n === 4) return 'xbox';
    return 'default';
  };

  const inferHdmi = (val: DeviceType): string => {
    if (val === 'roku1') return 'HDMI 1';
    if (val === 'roku2') return 'HDMI 2';
    if (val === 'switch') return 'HDMI 3';
    if (val === 'xbox') return 'HDMI 4';
    return 'Unknown';
  };

  const getDeviceName = (val: DeviceType): string => {
    if (val === 'roku1') return 'Roku 1';
    if (val === 'roku2') return 'Roku 2';
    if (val === 'switch') return 'Switch 2';
    if (val === 'xbox') return 'Xbox';
    return 'Unknown';
  };

  const setDevice: DeviceType = inferDevice(hdmiValue);
  const loadingDevice: DeviceType = inferDevice(loadingHdmiValue);
  const device: DeviceType = loadingHdmiValue !== '' ? loadingDevice : setDevice;

  const mediaPlayerEntity =
    device === 'roku1' || device === 'roku2'
      ? ((device === 'roku1' ? 'media_player.roku_basement_1' : 'media_player.roku_basement_2') as EntityName)
      : ('media_player.roku_basement_1' as EntityName);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rokuMedia = useEntity(mediaPlayerEntity as any) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xboxImage = useEntity('image.gstar00_now_playing' as any) as any;
  const xboxEntityPicture = xboxImage?.attributes?.entity_picture;

  // Reset xbox image failed state when the entity_picture URL changes
  useEffect(() => {
    setXboxImageFailed(false);
  }, [xboxEntityPicture]);

  // Get app icon from Home Assistant media player entity_picture
  let appIcon: string | null = null;
  if (device === 'roku1' || device === 'roku2') {
    appIcon = rokuMedia?.attributes?.entity_picture ?? null;
  } else if (device === 'xbox' && !xboxImageFailed) {
    // Only show Xbox now playing if the entity is available and image hasn't failed
    const xboxState = xboxImage?.state;
    if (xboxState && xboxState !== 'unavailable' && xboxState !== 'unknown') {
      appIcon = xboxEntityPicture ?? null;
    }
  }

  // If the entity_picture is a relative URL, prepend the HA URL
  if (appIcon && appIcon.startsWith('/')) {
    appIcon = `${import.meta.env.VITE_HA_URL}${appIcon}`;
  }

  const handleSelectAudio = async () => {
    if (pickerOpen || remoteOpen) return;
    // Convert HDMI value (e.g. 'HDMI 3' or '3') to the select option label 'Input 3'
    const digits = (String(hdmiValue).match(/\d+/) || [String(windowIndex)])[0];
    const target = `Input ${digits}`;
    await setAudioSource(target);
  };

  const isCurrentAudioSrc = () => {
    //match the window's hdmi value to the audio source
    if (!audioSource || !hdmiValue || loadingDevice !== 'default') return false;
    const hdmi = (String(hdmiValue).match(/\d+/) || [String(hdmiValue)])[0];
    let audio;
    if (loadingAudioSource != '') {
      audio = (String(loadingAudioSource).match(/\d+/) || [String(loadingAudioSource)])[0];
    } else {
      audio = (String(audioSource).match(/\d+/) || [String(audioSource)])[0];
    }
    return audio && hdmi && Number(audio) === Number(hdmi);
  };

  const isFlashingAudio = loadingAudioSource !== '' && isCurrentAudioSrc();
  const isFlashingDevice = loadingHdmiValue !== '' && device !== setDevice;

  function setUserSelectedDevice(device: DeviceType): void {
    const hdmi = inferHdmi(device);
    setHdmiValue(hdmi);
  }

  return (
    <Box
      className='hdmi-input-container'
      role='button'
      tabIndex={0}
      onClick={handleSelectAudio}
      sx={(theme: Theme) => ({
        cursor: 'pointer',
        border: '2px solid',
        borderColor: isCurrentAudioSrc() ? 'primary.main' : 'custom.border',
        boxShadow: isCurrentAudioSrc() ? `0 0 0 3px ${theme.palette.custom.buttonBorder}` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        background: isCurrentAudioSrc() ? theme.palette.custom.cardBackgroundGradient : theme.palette.custom.cardBackground,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'scale(1.02)',
          boxShadow: theme.palette.custom.shadowPrimary,
          background: theme.palette.custom.cardBackgroundGradientHover,
        },
        // Disable container hover when hovering over device name or remote button
        '&:has(.device-name-box:hover), &:has(.remote-button:hover)': {
          borderColor: isCurrentAudioSrc() ? 'primary.main' : 'custom.border',
          transform: 'none',
          boxShadow: isCurrentAudioSrc() ? `0 0 0 3px ${theme.palette.custom.buttonBorder}` : 'none',
          background: isCurrentAudioSrc() ? theme.palette.custom.cardBackgroundGradient : theme.palette.custom.cardBackground,
        },
        // define a local keyframe for flashing border
        '@keyframes flashBorder': {
          '0%': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 6px ${theme.palette.custom.buttonBorder}`,
          },
          '50%': {
            borderColor: theme.palette.custom.border,
            boxShadow: 'none',
          },
          '100%': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 6px ${theme.palette.custom.buttonBorder}`,
          },
        },
        animation: isFlashingAudio ? 'flashBorder 1s ease-in-out infinite' : 'none',
      })}
    >
      {/* Background image - positioned right for devices with app icon, centered for others */}
      <Box
        sx={(theme: Theme) => ({
          position: 'absolute',
          top: 0,
          // For devices with app icon: align to right. For others: center
          ...(appIcon
            ? {
                right: 0,
                width: '75%',
                justifyContent: 'flex-end',
              }
            : {
                left: '50%',
                transform: 'translateX(-50%)',
                justifyContent: 'center',
              }),
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          opacity: appIcon ? (theme.palette.mode === 'dark' ? 0.5 : 0.45) : 0.25,
          pointerEvents: 'none',
          transition: 'all 0.5s ease-in-out',
          // Gradient mask only for devices with app icons
          maskImage: appIcon ? 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.3) 15%, rgba(0, 0, 0, 1) 33%)' : 'none',
          WebkitMaskImage: appIcon ? 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.3) 15%, rgba(0, 0, 0, 1) 33%)' : 'none',
          // animate the full image area's opacity when a device update is in-flight
          '@keyframes flashDeviceImg': {
            '0%': { opacity: 0.25, transform: 'scale(1)' },
            '40%': { opacity: 0.15, transform: 'scale(0.98)' },
            '100%': { opacity: 0.25, transform: 'scale(1)' },
          },
          animation: isFlashingDevice ? 'flashDeviceImg 900ms ease-in-out infinite' : 'none',
        })}
      >
        <Box
          component='img'
          src={appIcon || (device === 'roku1' || device === 'roku2' ? rokuImg : device === 'switch' ? switchImg : xboxImg)}
          alt={String(device)}
          onError={() => {
            if (device === 'xbox') setXboxImageFailed(true);
          }}
          sx={(theme: Theme) => ({
            width: appIcon ? '100%' : '70%',
            height: appIcon ? '100%' : '70%',
            objectFit: appIcon ? 'cover' : 'contain',
            // With app icon: align right, others: center
            objectPosition: appIcon ? 'center right' : 'center',
            // Apply theme color using filter - converts to blue/slate color scheme
            filter: appIcon
              ? theme.palette.mode === 'dark'
                ? 'brightness(1.1) contrast(1.05) saturate(1.1) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5))'
                : 'brightness(0.95) contrast(1.1) saturate(1.05) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))'
              : isCurrentAudioSrc()
                ? 'brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(1000%) hue-rotate(190deg) brightness(100%) contrast(95%) drop-shadow(0 4px 12px rgba(96, 165, 250, 0.5))'
                : theme.palette.mode === 'dark'
                  ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                  : 'brightness(0) saturate(100%) invert(35%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(85%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            transition: 'all 0.5s ease-in-out',
          })}
        />
      </Box>

      {/* Bottom gradient overlay with device name - now clickable */}
      <Box
        className='device-name-box'
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
            e.nativeEvent.stopImmediatePropagation();
          }
          setPickerOpen(true);
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          pb: { xs: 1.5, sm: 2 },
          px: { xs: 1.5, sm: 2 },
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            '& .device-name': {
              color: 'primary.main',
              transform: 'translateX(4px)',
            },
          },
        }}
      >
        <Typography
          className='device-name'
          variant='h5'
          sx={(theme: Theme) => ({
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.secondary,
            textAlign: 'left',
            textShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.9)' : '0 2px 8px rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '1.25rem', sm: '2rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            transition: 'all 0.2s ease-in-out',
          })}
        >
          {getDeviceName(device)}
        </Typography>
      </Box>

      {/* Remote control icon for Roku devices */}
      {(device === 'roku1' || device === 'roku2') && (
        <Box
          className='remote-button'
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
              e.nativeEvent.stopImmediatePropagation();
            }
            setRemoteOpen(true);
          }}
          sx={(theme: Theme) => ({
            position: 'absolute',
            top: { xs: 12, sm: 16 },
            right: { xs: 12, sm: 16 },
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
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
                    ? 'brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(1000%) hue-rotate(190deg) brightness(100%) contrast(95%)'
                    : 'brightness(0) saturate(100%) invert(45%) sepia(70%) saturate(800%) hue-rotate(190deg) brightness(95%) contrast(90%)',
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
              height: { xs: 24, sm: 28 },
              width: { xs: 24, sm: 28 },
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%)'
                  : 'brightness(0) saturate(100%) invert(30%) sepia(18%) saturate(1046%) hue-rotate(181deg) brightness(80%) contrast(90%)',
              transition: 'all 0.2s ease-in-out',
              pointerEvents: 'none',
            })}
          />
        </Box>
      )}

      <DevicePickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(d: PickerDeviceType) => setUserSelectedDevice(d as DeviceType)}
      />
      <RokuRemoteModal open={remoteOpen} device={device} onClose={() => setRemoteOpen(false)} />
    </Box>
  );
}
