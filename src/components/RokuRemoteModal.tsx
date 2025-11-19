import { Dialog, DialogTitle, DialogContent, Box, IconButton } from '@mui/material';
import type { DeviceType } from './DevicePickerModal';
import { useEntity } from '@hakit/core';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon2 from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
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
                textAlign: 'center',
            }}>
                Roku Remote
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    py: 3,
                }}>
                    {/* Top row: Home and Back */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={sendRokuCommand("home")}
                            sx={{
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                },
                            }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            onClick={sendRokuCommand("back")}
                            sx={{
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                },
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>

                    {/* D-pad with OK in center */}
                    <Box sx={{
                        position: 'relative',
                        width: 220,
                        height: 220,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Up */}
                        <IconButton
                            onClick={sendRokuCommand("up")}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'translateX(-50%) scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'translateX(-50%) scale(0.95)',
                                },
                            }}
                        >
                            <ArrowUpwardIcon />
                        </IconButton>

                        {/* Left */}
                        <IconButton
                            onClick={sendRokuCommand("left")}
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'translateY(-50%) scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'translateY(-50%) scale(0.95)',
                                },
                            }}
                        >
                            <ArrowBackIcon2 />
                        </IconButton>

                        {/* OK button in center */}
                        <IconButton
                            onClick={sendRokuCommand("select")}
                            sx={{
                                width: 64,
                                height: 64,
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)',
                                border: '2px solid rgba(99, 102, 241, 0.5)',
                                color: '#818cf8',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.3) 100%)',
                                    border: '2px solid rgba(99, 102, 241, 0.8)',
                                    color: '#a5b4fc',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                },
                            }}
                        >
                            OK
                        </IconButton>

                        {/* Right */}
                        <IconButton
                            onClick={sendRokuCommand("right")}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'translateY(-50%) scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'translateY(-50%) scale(0.95)',
                                },
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>

                        {/* Down */}
                        <IconButton
                            onClick={sendRokuCommand("down")}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 56,
                                height: 56,
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                color: 'rgba(148, 163, 184, 0.9)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid rgba(99, 102, 241, 0.6)',
                                    color: '#818cf8',
                                    transform: 'translateX(-50%) scale(1.05)',
                                },
                                '&:active': {
                                    transform: 'translateX(-50%) scale(0.95)',
                                },
                            }}
                        >
                            <ArrowDownwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
