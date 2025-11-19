import { Dialog, DialogTitle, DialogContent, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { DeviceType } from './DevicePickerModal';
import { useEntity } from '@hakit/core';


type Props = {
    open: boolean;
    onClose: () => void;
    onSelect?: (device: DeviceType) => void;
    device: DeviceType;
};

export default function RokuRemoteModal({ open, onClose, device }: Props) {
    const rokuRemote = useEntity(device === 'roku1' ? "remote.roku_basement_1" : "remote.roku_basement_2");


    const sendRokuCommand = (command: string) => () => {
        rokuRemote.service.sendCommand({ serviceData: { device: rokuRemote.entity_id, command: command as any, num_repeats: 1, delay_secs: 0, hold_secs: 0 } });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Roku Remote</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 3 }}>
                    {/* Top row: Home and Back */}
                    <Grid container spacing={2} justifyContent="center">
                        <Grid>
                            <Button variant="outlined" onClick={sendRokuCommand("home")}>
                                Home
                            </Button>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" onClick={sendRokuCommand("back")}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>

                    {/* D-pad + Select */}
                    <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid size={12} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={sendRokuCommand("up")} sx={{ minWidth: 64, minHeight: 48 }}>Up</Button>
                        </Grid>

                        <Grid>
                            <Button variant="contained" onClick={sendRokuCommand("left")} sx={{ minWidth: 64, minHeight: 48 }}>Left</Button>
                        </Grid>

                        <Grid sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Button variant="contained" onClick={sendRokuCommand("select")} sx={{ width: 32, height: 32, borderRadius: '25%' }}>
                                OK
                            </Button>
                        </Grid>

                        <Grid>
                            <Button variant="contained" onClick={sendRokuCommand("right")} sx={{ minWidth: 64, minHeight: 48 }}>Right</Button>
                        </Grid>

                        <Grid size={12} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={sendRokuCommand("down")} sx={{ minWidth: 64, minHeight: 48 }}>Down</Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
