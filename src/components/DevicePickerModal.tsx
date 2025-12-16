import { Dialog, DialogTitle, DialogContent, Box, Typography, type Theme } from '@mui/material';
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
  { key: 'switch', label: 'Switch 2', img: switchImg },
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
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: (theme: Theme) => ({
          background: theme.palette.custom.modalBackground,
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: `1px solid ${theme.palette.custom.modalBorder}`,
          boxShadow: theme.palette.custom.modalShadow,
        }),
      }}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          fontSize: '1.5rem',
          fontWeight: 700,
          borderBottom: `1px solid ${theme.palette.custom.modalBorder}`,
          pb: 2,
        })}
      >
        Change Input
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2} mt={2}>
          {devices.map(d => (
            <Grid size={6} key={d.key}>
              <Box
                role='button'
                tabIndex={0}
                onClick={() => handlePick(d.key)}
                sx={(theme: Theme) => ({
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: theme.palette.custom.border,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  height: 160,
                  background: theme.palette.custom.cardBackground,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.05)',
                    boxShadow: theme.palette.custom.shadowPrimary,
                    background: theme.palette.custom.cardBackgroundGradientHover,
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                })}
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
                    component='img'
                    src={d.img}
                    alt={d.label}
                    sx={(theme: Theme) => ({
                      width: '85%',
                      height: '85%',
                      objectFit: 'contain',
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0) saturate(100%) invert(74%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(95%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                          : 'brightness(0) saturate(100%) invert(35%) sepia(12%) saturate(896%) hue-rotate(185deg) brightness(85%) contrast(87%) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                      transition: 'all 0.3s ease-in-out',
                    })}
                  />
                </Box>

                {/* Bottom gradient overlay with device name */}
                <Box
                  sx={(theme: Theme) => ({
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: theme.palette.custom.overlayGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    pb: 2,
                    px: 2,
                    pointerEvents: 'none',
                  })}
                >
                  <Typography
                    variant='h6'
                    sx={(theme: Theme) => ({
                      color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.secondary,
                      textAlign: 'left',
                      textShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.9)' : '0 2px 8px rgba(255, 255, 255, 0.8)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                    })}
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
