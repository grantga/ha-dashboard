import { Dialog, DialogTitle, DialogContent, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(15, 23, 42, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                }
            }}
        >
            <DialogTitle sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                pb: 2,
            }}>
                Change Input
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
                <Grid container spacing={2} mt={2}>
                    {devices.map((d) => (
                        <Grid size={6} key={d.key}>
                            <Box
                                role="button"
                                tabIndex={0}
                                onClick={() => handlePick(d.key)}
                                sx={{
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    borderColor: 'rgba(148, 163, 184, 0.2)',
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: 160,
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%)',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    },
                                }}
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
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={d.img}
                                        alt={d.label}
                                        sx={{
                                            width: '85%',
                                            height: '85%',
                                            objectFit: 'contain',
                                            filter: d.key === 'switch'
                                                ? 'brightness(1.2) saturate(0.8) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                                                : 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    />
                                </Box>

                                {/* Bottom gradient overlay with device name */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.85) 40%, transparent 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        pb: 2,
                                        px: 2,
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'white',
                                            textAlign: 'left',
                                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                                            fontSize: '2rem',
                                            fontWeight: 700,
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {d.label}
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
