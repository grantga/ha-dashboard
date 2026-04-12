import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import InputIcon from '@mui/icons-material/Input';
import useMediaPlayer from '../hooks/useMediaPlayer';
import type { EntityName } from '@hakit/core';
import InputSourceModal from './InputSourceModal';

type Props = {
  entityId: string;
};

export default function MediaPlayerControl({ entityId }: Props) {
  const { value, volume, volumeUp, volumeDown, muted, setMuted, setVolume, sources, currentSource, setSource } = useMediaPlayer(
    entityId as EntityName
  );
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [pendingVolume, setPendingVolume] = useState<number | null>(volume);
  const [waitingForVolume, setWaitingForVolume] = useState(false);
  const waitingRef = useRef(false);
  const volumeAtSendRef = useRef<number | null>(null);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!waitingRef.current) setPendingVolume(volume);
  }, [volume]);

  // Unblock once HA reports a volume different from what it was when we sent the command
  useEffect(() => {
    if (volumeAtSendRef.current === null || volume === null) return;
    if (Math.abs(volume - volumeAtSendRef.current) > 0.01) {
      volumeAtSendRef.current = null;
      waitingRef.current = false;
      setWaitingForVolume(false);
    }
  }, [volume]);

  const disabled = value === 'off' || volume == null;

  const handleVolumePointer = (clientX: number) => {
    const el = volumeBarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const level = x / rect.width;
    setPendingVolume(level);
    volumeAtSendRef.current = volume;
    waitingRef.current = true;
    setWaitingForVolume(true);
    setVolume(level);
  };

  const onVolumeClick = (e: React.MouseEvent) => {
    if (disabled || waitingRef.current) return;
    handleVolumePointer(e.clientX);
  };

  // Helper to format dB value.
  // MusicCast typically uses -80.5 to +16.5 dB.
  // Home Assistant maps this to 0..1 volume_level.
  // 0.8 is roughly 0dB.
  const formatDb = (vol: number | null) => {
    if (vol === null) return '-- dB';
    // Formula for many Yamaha receivers in HA:
    // (vol * (max_db - min_db)) + min_db
    // For V6A: -80.5 to +16.5
    const db = vol * 97 - 80.5;
    return `${db.toFixed(1)} dB`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
        <IconButton
          onClick={() => setMuted && setMuted(!(muted ?? false))}
          disabled={value === 'off' || muted == null}
          aria-label='mute'
          title={muted ? 'Unmute' : 'Mute'}
          sx={(theme: Theme) => ({
            bgcolor: muted ? 'primary.main' : theme.palette.custom.buttonBackground,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              bgcolor: muted ? 'primary.dark' : theme.palette.custom.buttonBackgroundHover,
              borderColor: theme.palette.primary.main,
            },
            transition: 'all 0.2s',
            width: 48,
            height: 48,
          })}
        >
          <VolumeOffIcon color={muted ? 'inherit' : 'inherit'} />
        </IconButton>

        <IconButton
          onClick={() => volumeDown()}
          disabled={disabled}
          aria-label='volume down'
          sx={(theme: Theme) => ({
            bgcolor: theme.palette.custom.buttonBackground,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              bgcolor: theme.palette.custom.buttonBackgroundHover,
              borderColor: theme.palette.primary.main,
            },
            width: 48,
            height: 48,
          })}
        >
          <VolumeDownIcon color={muted || disabled ? 'inherit' : 'primary'} />
        </IconButton>

        <Box
          ref={volumeBarRef}
          onClick={onVolumeClick}
          sx={(theme: Theme) => ({
            flex: 1,
            position: 'relative',
            height: 48,
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: theme.palette.custom.buttonBackground,
            border: `1px solid ${theme.palette.divider}`,
            cursor: disabled || waitingForVolume ? 'not-allowed' : 'pointer',
            opacity: waitingForVolume ? 0.5 : 1,
            transition: 'opacity 0.15s',
          })}
        >
          {/* Volume fill bar */}
          <Box
            sx={(theme: Theme) => ({
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${muted ? 0 : Math.round((pendingVolume ?? 0) * 100)}%`,
              bgcolor: muted ? 'transparent' : theme.palette.primary.main,
              opacity: disabled ? 0.3 : 0.6,
              transition: 'width 0.1s ease-out',
            })}
          />
          {/* Text overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {muted ? (
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  color: 'text.disabled',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  fontSize: '1.1rem',
                }}
              >
                Muted
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 'bold',
                    color: disabled ? 'text.disabled' : 'text.primary',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap',
                    fontSize: '1.25rem',
                    lineHeight: 1.2,
                  }}
                >
                  {pendingVolume !== null ? `${Math.round(pendingVolume * 100)}%` : '--%'}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                  }}
                >
                  {formatDb(pendingVolume)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={() => volumeUp()}
          disabled={disabled}
          aria-label='volume up'
          sx={(theme: Theme) => ({
            bgcolor: theme.palette.custom.buttonBackground,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              bgcolor: theme.palette.custom.buttonBackgroundHover,
              borderColor: theme.palette.primary.main,
            },
            width: 48,
            height: 48,
          })}
        >
          <VolumeUpIcon color={muted || disabled ? 'inherit' : 'primary'} />
        </IconButton>

        <IconButton
          onClick={() => setInputModalOpen(true)}
          disabled={!sources || value === 'off'}
          aria-label='select input'
          title={currentSource ?? 'Select input'}
          sx={(theme: Theme) => ({
            ml: 'auto',
            bgcolor: theme.palette.custom.buttonBackground,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              bgcolor: theme.palette.custom.buttonBackgroundHover,
              borderColor: theme.palette.primary.main,
            },
            width: 48,
            height: 48,
          })}
        >
          <InputIcon color={value === 'off' ? 'inherit' : 'primary'} />
        </IconButton>
      </Box>

      <InputSourceModal
        open={inputModalOpen}
        onClose={() => setInputModalOpen(false)}
        sources={sources?.filter(s => s === 'HDMI1 multi' || s === 'Movie Room') ?? null}
        currentSource={currentSource}
        onSelect={source => setSource && setSource(source)}
      />
    </Box>
  );
}
