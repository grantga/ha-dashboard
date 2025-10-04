import { Box, Typography } from '@mui/material';
import { TVIcon } from './MultiviewIcons';
import useSelectEntityMode from '../hooks/useSelectEntityMode';

type DeviceType = 'roku' | 'switch' | 'xbox' | 'default';

type HDMIInputProps = {
    windowIndex: number;
};

export default function HDMIInput({ windowIndex }: HDMIInputProps) {
    const { value: hdmiValue } = useSelectEntityMode(`select.orei_uhd_401mv_window_${windowIndex}_input`);
    const { value: audioSource, loading: isAudioLoading, setValue: setAudioSource } = useSelectEntityMode('select.orei_uhd_401mv_audio_output_source');

    const inferDevice = (val: unknown): DeviceType => {
        // Try to extract the HDMI/input number first
        const digits = (String(val).match(/\d+/) || [])[0];
        const n = digits ? Number(digits) : undefined;
        if (n === 1 || n === 2) return 'roku';
        if (n === 3) return 'switch';
        if (n === 4) return 'xbox';
        return 'default';
    };

    const device: DeviceType = inferDevice(hdmiValue ?? windowIndex);

    const displayName = (() => {
        if (device !== 'default') return device === 'roku' ? 'Roku' : device === 'switch' ? 'Switch' : 'Xbox';
        if (hdmiValue) return String(hdmiValue);
        return `Window ${windowIndex}`;
    })();

    const handleSelectAudio = async () => {
        // Convert HDMI value (e.g. 'HDMI 3' or '3') to the select option label 'Input 3'
        const digits = (String(hdmiValue).match(/\d+/) || [String(windowIndex)])[0];
        const target = `Input ${digits}`;
        await setAudioSource(target);
    };

    const isAudio = (() => {
        //match the window's hdmi value to the audio source
        if (!audioSource || !hdmiValue || isAudioLoading) return false;
        const a = (String(audioSource).match(/\d+/) || [String(audioSource)])[0];
        const v = (String(hdmiValue).match(/\d+/) || [String(hdmiValue)])[0];
        return a && v && Number(a) === Number(v);
    });

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleSelectAudio}
            sx={{
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isAudio() ? 'primary.main' : 'divider',
                boxShadow: isAudio() ? (theme: any) => `0 0 0 2px ${theme.palette.primary.light}` : 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                {device !== 'default' && (
                    <Box sx={{ position: 'absolute', top: 6, left: 6, px: 0.75, py: 0.25, borderRadius: 1, fontSize: 11, color: 'common.white', bgcolor: device === 'roku' ? 'secondary.main' : device === 'switch' ? 'success.main' : 'info.main' }}>
                        {device === 'roku' ? 'Roku' : device === 'switch' ? 'Switch' : 'Xbox'}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
