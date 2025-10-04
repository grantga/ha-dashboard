import { Box, Typography } from '@mui/material';
import rokuImg from '../resources/images/roku.svg';
import switchImg from '../resources/images/switch.svg';
import xboxImg from '../resources/images/xbox.svg';
import useSelectEntityMode from '../hooks/useSelectEntityMode';

type DeviceType = 'roku1' | 'roku2' | 'switch' | 'xbox' | 'default';

type HDMIInputProps = {
    windowIndex: number;
};

export default function HDMIInput({ windowIndex }: HDMIInputProps) {
    const { value: hdmiValue } = useSelectEntityMode(`select.orei_uhd_401mv_window_${windowIndex}_input`);
    const { value: audioSource, loadingValue: loadingAudioSource, setValue: setAudioSource } = useSelectEntityMode('select.orei_uhd_401mv_audio_output_source');

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

    const device: DeviceType = inferDevice(hdmiValue ?? windowIndex);

    const handleSelectAudio = async () => {
        // Convert HDMI value (e.g. 'HDMI 3' or '3') to the select option label 'Input 3'
        const digits = (String(hdmiValue).match(/\d+/) || [String(windowIndex)])[0];
        const target = `Input ${digits}`;
        await setAudioSource(target);
    };

    const isAudio = (() => {
        //match the window's hdmi value to the audio source
        if (!audioSource || !hdmiValue) return false;
        const hdmi = (String(hdmiValue).match(/\d+/) || [String(hdmiValue)])[0];
        let audio;
        if (loadingAudioSource != "") {
            audio = (String(loadingAudioSource).match(/\d+/) || [String(loadingAudioSource)])[0];
        } else {
            audio = (String(audioSource).match(/\d+/) || [String(audioSource)])[0];
        }
        return audio && hdmi && Number(audio) === Number(hdmi);
    });

    // when there's a loadingAudioSource and it matches this window, flash the border
    const isFlashing = loadingAudioSource !== '' && isAudio();

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleSelectAudio}
            sx={(theme: any) => ({
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isAudio() ? 'primary.main' : 'divider',
                boxShadow: isAudio() ? `0 0 0 2px ${theme.palette.primary.light}` : 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                // define a local keyframe for flashing border
                '@keyframes flashBorder': {
                    '0%': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 6px ${theme.palette.primary.light}`,
                    },
                    '50%': {
                        borderColor: theme.palette.divider,
                        boxShadow: 'none',
                    },
                    '100%': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 6px ${theme.palette.primary.light}`,
                    },
                },
                animation: isFlashing ? 'flashBorder 1s ease-in-out infinite' : 'none',
            })}
        >
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 80, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src={device === 'roku1' || device === 'roku2' ? rokuImg : device === 'switch' ? switchImg : xboxImg}
                        alt={device}
                        sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                    {device === 'roku1' ? (
                        <Typography variant='h4' paddingLeft={2} sx={{ color: '#6D2077', fontWeight: 700 }}>
                            1
                        </Typography>
                    ) : null}
                    {device === 'roku2' ? (
                        <Typography variant='h4' paddingLeft={2} sx={{ color: '#6D2077', fontWeight: 700 }}>
                            2
                        </Typography>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
}
