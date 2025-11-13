import { Box, Button, Stack } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import useMediaPlayer from '../hooks/useMediaPlayer';

export default function DevicePower() {


    const { value: receiverPower, togglePower: setReceiverPower, loadingValue: loadingReceiver } = useMediaPlayer('media_player.rx_v6a_bf8066');
    const { value: projectorPower, togglePower: setProjectorPower, loadingValue: loadingProjectorPower } = useMediaPlayer('media_player.epson_5050ub');
    const { value: mvPower, togglePower: setMVPower, loadingValue: loadingMVPower } = useSelectEntityMode('switch.orei_uhd_401mv_power');

    const devices = [
        { id: 'all', label: 'All On', isOn: !(receiverPower === 'off' || projectorPower === 'off' || mvPower === 'off'), loading: loadingReceiver || loadingProjectorPower || loadingMVPower },
        { id: 'receiver', label: 'Receiver', isOn: receiverPower !== 'off', loading: loadingReceiver, togglePower: setReceiverPower },
        { id: 'projector', label: 'Projector', isOn: projectorPower !== 'off', loading: loadingProjectorPower, togglePower: setProjectorPower },
        { id: 'multiview', label: 'Multiview', isOn: mvPower !== 'off', loading: loadingMVPower, togglePower: setMVPower },
    ];


    const handleClick = (device: any) => {
        // Toggle local on/off state for the button and log the new state
        if (device.id === 'all') {
            devices.forEach((d) => {
                if (d.togglePower && !d.isOn) {
                    d.togglePower();
                }
            }
            );
        }
        else {
            device.togglePower();
        }
    };

    return (
        // container that stretches full width and centers the vertical button stack at the top
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 1 }}>
                <Stack direction="row" spacing={1}>
                    {devices.map((b) => {
                        return (
                            <Button
                                key={b.id}
                                variant={b.isOn ? "contained" : "outlined"}
                                loading={b.loading !== ""}
                                loadingPosition="start"
                                size="small"
                                onClick={() => handleClick(b)}
                                startIcon={
                                    <PowerSettingsNewIcon />
                                }
                            >
                                {b.label}
                            </Button>
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );
}
