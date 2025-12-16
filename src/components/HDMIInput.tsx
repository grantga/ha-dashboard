import { Box, Typography, type Theme } from '@mui/material';
import rokuImg from '../resources/images/roku.svg';
import switchImg from '../resources/images/switch.svg';
import xboxImg from '../resources/images/xbox.svg';
import remoteImg from '../resources/images/remote.svg';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import DevicePickerModal from './DevicePickerModal';
import type { DeviceType as PickerDeviceType } from './DevicePickerModal';
import { useState } from 'react';
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
      {/* Full-bleed SVG background */}
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
          // animate the full image area's opacity when a device update is in-flight
          '@keyframes flashDeviceImg': {
            '0%': { opacity: 0.25, transform: 'scale(1)' },
            '40%': { opacity: 0.15, transform: 'scale(0.98)' },
            '100%': { opacity: 0.25, transform: 'scale(1)' },
          },
          animation: isFlashingDevice ? 'flashDeviceImg 900ms ease-in-out infinite' : 'none',
        }}
      >
        <Box
          component='img'
          src={device === 'roku1' || device === 'roku2' ? rokuImg : device === 'switch' ? switchImg : xboxImg}
          alt={String(device)}
          sx={(theme: Theme) => ({
            width: '85%',
            height: '85%',
            objectFit: 'contain',
            // Apply theme color using filter - converts to indigo/slate color scheme
            filter: isCurrentAudioSrc()
              ? 'brightness(0) saturate(100%) invert(53%) sepia(98%) saturate(3283%) hue-rotate(225deg) brightness(102%) contrast(92%) drop-shadow(0 4px 12px rgba(99, 102, 241, 0.6))'
              : theme.palette.mode === 'dark'
                ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                : 'brightness(0) saturate(100%) invert(35%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(85%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            transition: 'all 0.3s ease-in-out',
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
          pb: 2,
          px: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            background: theme.palette.custom.overlayGradientHover,
            '& .device-name': {
              color: 'primary.main',
              transform: 'translateX(4px)',
            },
          },
        })}
      >
        <Typography
          className='device-name'
          variant='h5'
          sx={(theme: Theme) => ({
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.secondary,
            textAlign: 'left',
            textShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.9)' : '0 2px 8px rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '1.5rem', sm: '2rem' },
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
            top: 16,
            right: 16,
            width: 48,
            height: 48,
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
