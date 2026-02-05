import { Box, IconButton, Select, MenuItem, FormControl, InputLabel, Typography, Stack } from '@mui/material';
import type { SelectChangeEvent, Theme } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import useMediaPlayer from '../hooks/useMediaPlayer';
import type { EntityName } from '@hakit/core';

type Props = {
  entityId: string;
};

export default function MediaPlayerControl({ entityId }: Props) {
  const { value, volume, volumeUp, volumeDown, muted, setMuted, sources, currentSource, setSource } = useMediaPlayer(
    entityId as EntityName
  );

  const disabled = value === 'off' || volume == null;

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const v = e.target.value as string;
    if (setSource && v) setSource(v);
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <IconButton
            onClick={() => setMuted && setMuted(!(muted ?? false))}
            disabled={value === 'off' || muted == null}
            aria-label='mute'
            title={muted ? 'Unmute' : 'Mute'}
            sx={(theme: Theme) => ({
              bgcolor: muted ? 'primary.main' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                bgcolor: muted ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)',
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
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderColor: theme.palette.primary.main,
              },
              width: 48,
              height: 48,
            })}
          >
            <VolumeDownIcon color={muted || disabled ? 'inherit' : 'primary'} />
          </IconButton>

          <Box sx={{ minWidth: 100, textAlign: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                color: disabled ? 'text.disabled' : 'text.primary',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                fontSize: '1.1rem',
              }}
            >
              {muted ? 'Muted' : formatDb(volume)}
            </Typography>
          </Box>

          <IconButton
            onClick={() => volumeUp()}
            disabled={disabled}
            aria-label='volume up'
            sx={(theme: Theme) => ({
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderColor: theme.palette.primary.main,
              },
              width: 48,
              height: 48,
            })}
          >
            <VolumeUpIcon color={muted || disabled ? 'inherit' : 'primary'} />
          </IconButton>
        </Stack>

        <FormControl size='small' sx={{ minWidth: 120, maxWidth: 180, flexShrink: 1 }}>
          <InputLabel id={`source-select-label-${entityId}`}>Input</InputLabel>
          <Select
            labelId={`source-select-label-${entityId}`}
            value={currentSource ?? ''}
            label='Input'
            onChange={handleSelectChange}
            disabled={!sources || value === 'off'}
            sx={(theme: Theme) => ({
              '& .MuiSelect-select': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.custom.border,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.custom.borderHover,
              },
            })}
          >
            {sources && sources.length ? (
              sources.map((s: string) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))
            ) : (
              <MenuItem value=''>No inputs</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
