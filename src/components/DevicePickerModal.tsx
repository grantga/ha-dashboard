import { Dialog, DialogTitle, DialogContent, Grid, Box, Typography } from '@mui/material';
import rokuImg from '../resources/images/roku.svg';
import switchImg from '../resources/images/switch.svg';
import xboxImg from '../resources/images/xbox.svg';

export type DeviceType = 'roku1' | 'roku2' | 'switch' | 'xbox' | 'default';

type Props = {
    open: boolean;
    onClose: () => void;
    onSelect?: (device: DeviceType) => void;
    current?: DeviceType;
};

const devices: { key: DeviceType; label: string; img: string }[] = [
    { key: 'roku1', label: 'Roku 1', img: rokuImg },
    { key: 'roku2', label: 'Roku 2', img: rokuImg },
    { key: 'switch', label: 'Switch', img: switchImg },
    { key: 'xbox', label: 'Xbox', img: xboxImg },
];

export default function DevicePickerModal({ open, onClose, onSelect }: Props) {
    const handlePick = (d: DeviceType) => {
        if (onSelect) onSelect(d);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Select device</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    {devices.map((d) => (
                        <Grid item xs={6} key={d.key}>
                            <Box
                                role="button"
                                tabIndex={0}
                                onClick={() => handlePick(d.key)}
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 1,
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ width: 96, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box component="img" src={d.img} alt={d.label} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    <Typography variant="h4" sx={{ paddingLeft: 2, color: '#6D2077', fontWeight: 700 }}>
                                        {d.key === 'roku1' ? '1' : ''}
                                        {d.key === 'roku2' ? '2' : ''}
                                    </Typography>
                                </Box>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
