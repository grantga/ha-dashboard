import React, { useState } from 'react';
import { Slider, Box, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import useMediaPlayer from '../hooks/useMediaPlayer';

type Props = {
    entityId: string;
};

export default function MediaPlayerControl({ entityId }: Props) {
    const { value, volume, setVolume, volumeUp, volumeDown, muted, setMuted, sources, currentSource, setSource } = useMediaPlayer(entityId as any) as any;
    // slider shows 0..100
    const [local, setLocal] = useState<number | null>(() => (typeof volume === 'number' ? Math.round(volume * 100) : null));

    // update local when external volume changes
    React.useEffect(() => {
        if (typeof volume === 'number') setLocal(Math.round(volume * 100));
    }, [volume]);

    const disabled = value === 'off' || volume == null;

    const handleChange = (_: Event, newValue: number | number[]) => {
        const v = Array.isArray(newValue) ? newValue[0] : newValue;
        setLocal(v);
    };

    const handleCommit = (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
        const v = Array.isArray(newValue) ? newValue[0] : newValue;
        if (typeof v === 'number') {
            // convert to 0..1
            setVolume(v / 100);
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const v = e.target.value as string;
        if (setSource && v) setSource(v);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}>
                <IconButton
                    onClick={() => setMuted && setMuted(!(muted ?? false))}
                    disabled={value === 'off' || muted == null}
                    aria-label="mute"
                    title={muted ? 'Unmute' : 'Mute'}
                    sx={(theme: any) => ({
                        bgcolor: muted ? 'primary.main' : 'transparent',
                        '&:hover': { bgcolor: muted ? 'primary.dark' : theme.palette.action.hover },
                        transition: 'all 0.2s',
                    })}
                >
                    <VolumeOffIcon color={muted ? 'inherit' : 'inherit'} />
                </IconButton>

                <IconButton
                    onClick={() => volumeDown()}
                    disabled={disabled}
                    aria-label="volume down"
                    sx={(theme: any) => ({
                        '&:hover': { bgcolor: theme.palette.action.hover },
                    })}
                >
                    <VolumeDownIcon color={muted || disabled ? 'inherit' : 'primary'} />
                </IconButton>

                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 1 }}>
                    <Slider
                        value={local ?? 0}
                        onChange={handleChange}
                        onChangeCommitted={handleCommit}
                        disabled={disabled || (muted === true)}
                        aria-label="volume"
                        min={0}
                        max={100}
                        sx={(theme: any) => ({
                            '& .MuiSlider-thumb': {
                                width: 16,
                                height: 16,
                                transition: '0.2s',
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0 0 0 8px ${theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.16)' : 'rgba(25, 118, 210, 0.16)'}`,
                                },
                            },
                            '& .MuiSlider-track': {
                                height: 4,
                            },
                            '& .MuiSlider-rail': {
                                height: 4,
                                opacity: 0.3,
                            },
                        })}
                    />
                </Box>

                <IconButton
                    onClick={() => volumeUp()}
                    disabled={disabled}
                    aria-label="volume up"
                    sx={(theme: any) => ({
                        '&:hover': { bgcolor: theme.palette.action.hover },
                    })}
                >
                    <VolumeUpIcon color={muted || disabled ? 'inherit' : 'primary'} />
                </IconButton>
            </Box>

            <FormControl size="small" >
                <InputLabel id={`source-select-label-${entityId}`}>Input</InputLabel>
                <Select
                    labelId={`source-select-label-${entityId}`}
                    value={currentSource ?? ''}
                    label="Input"
                    onChange={handleSelectChange}
                    disabled={!sources || value === 'off'}
                    sx={(theme: any) => ({
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
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">No inputs</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>

    );
}
