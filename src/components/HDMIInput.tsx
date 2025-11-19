import { Box, Typography } from '@mui/material';
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

export default function HDMIInput({ windowIndex, audioSource, loadingAudioSource, setAudioSource, }: HDMIInputProps) {
    const { value: hdmiValue, loadingValue: loadingHdmiValue, setValue: setHdmiValue } = useSelectEntityMode(`select.orei_uhd_401mv_window_${windowIndex}_input`);
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

    const isCurrentAudioSrc = (() => {
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

    const isFlashingAudio = loadingAudioSource !== '' && isCurrentAudioSrc();
    const isFlashingDevice = loadingHdmiValue !== '' && (device !== setDevice);

    function setUserSelectedDevice(device: DeviceType): void {
        const hdmi = inferHdmi(device);
        setHdmiValue(hdmi);
    }

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleSelectAudio}
            sx={(theme: any) => ({
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isCurrentAudioSrc() ? 'primary.main' : 'divider',
                boxShadow: isCurrentAudioSrc() ? `0 0 0 2px ${theme.palette.primary.light}` : 'none',
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
                animation: isFlashingAudio ? 'flashBorder 1s ease-in-out infinite' : 'none',
            })}
        >
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={(_: any) => ({
                        width: 80,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // animate the full image area's opacity when a device update is in-flight
                        '@keyframes flashDeviceImg': {
                            '0%': { opacity: 1, transform: 'scale(1)' },
                            '40%': { opacity: 0.4, transform: 'scale(0.98)' },
                            '100%': { opacity: 1, transform: 'scale(1)' },
                        },
                        animation: isFlashingDevice ? 'flashDeviceImg 900ms ease-in-out infinite' : 'none',
                    })}
                >
                    <Box
                        component="img"
                        src={device === 'roku1' || device === 'roku2' ? rokuImg : device === 'switch' ? switchImg : xboxImg}
                        alt={String(device)}
                        tabIndex={0}
                        onClick={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
                                e.nativeEvent.stopImmediatePropagation();
                            }
                            setPickerOpen(true);
                        }}
                        sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'fill', cursor: 'pointer' }}
                    />

                    {(device === 'roku1' || device === 'roku2') ? (
                        <>
                            <Typography variant='h4' paddingLeft={2} paddingRight={1} sx={{ color: '#6D2077', fontWeight: 700 }}>
                                {device === 'roku1' ? '1' : '2'}
                            </Typography>
                            <Box
                                component="img"
                                sx={{ height: 25 }}
                                src={remoteImg}
                                tabIndex={1}
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
                                        e.nativeEvent.stopImmediatePropagation();
                                    }
                                    setRemoteOpen(true);
                                }}
                            />
                        </>
                    ) : null}
                </Box>
                <DevicePickerModal
                    open={pickerOpen}
                    onClose={() => setPickerOpen(false)}
                    onSelect={(d: PickerDeviceType) => setUserSelectedDevice(d as DeviceType)}
                />
                <RokuRemoteModal
                    open={remoteOpen}
                    device={device}
                    onClose={() => setRemoteOpen(false)}
                />
            </Box>
        </Box>
    );
}
