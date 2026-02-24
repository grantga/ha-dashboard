import { Dialog, DialogTitle, DialogContent, Box, type Theme } from '@mui/material';
import { useRef, useState } from 'react';

interface ColorPickerModalProps {
  open: boolean;
  onClose: () => void;
  currentHue: number | null;
  currentColorTemp: number | null;
  onColorChange: (rgb: { r: number; g: number; b: number }) => void;
  onColorTempChange: (temp: number) => void;
}

const WHITE_COLOR_TEMP = 310;

// convert H (0..360), S (0..1), L (0..1) to RGB 0..255
function hslToRgb(h: number, s: number, l: number) {
  h = h / 360;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export default function ColorPickerModal({
  open,
  onClose,
  currentHue,
  currentColorTemp,
  onColorChange,
  onColorTempChange,
}: ColorPickerModalProps) {
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [localHue, setLocalHue] = useState<number | null>(currentHue);

  // Sync local hue when modal opens
  const handleEnter = () => {
    setLocalHue(currentHue);
  };

  const isWhiteSelected = currentColorTemp === WHITE_COLOR_TEMP && currentHue === null;

  const handlePointer = (clientX: number) => {
    const el = gradientRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = x / rect.width;
    const hue = Math.round(ratio * 360);
    setLocalHue(hue);
    const rgb = hslToRgb(hue, 1, 0.5);
    onColorChange(rgb);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsPicking(true);
    handlePointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPicking) return;
    handlePointer(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
    setIsPicking(false);
  };

  const handleWhiteSelect = () => {
    onColorTempChange(WHITE_COLOR_TEMP);
    setLocalHue(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      TransitionProps={{ onEnter: handleEnter }}
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
        Light Color
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {/* White preset */}
          <Box
            onClick={handleWhiteSelect}
            role='button'
            aria-label='Select white'
            sx={(theme: Theme) => ({
              height: 60,
              borderRadius: 2,
              border: isWhiteSelected ? `3px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.custom.border}`,
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              boxShadow: isWhiteSelected ? `0 0 0 4px ${theme.palette.primary.main}20` : 'none',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                transform: 'scale(1.02)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            })}
          />

          {/* Hue gradient picker */}
          <Box
            ref={gradientRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            sx={{
              height: 60,
              borderRadius: 2,
              background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)',
              position: 'relative',
              touchAction: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Indicator */}
            {localHue !== null && (
              <Box
                sx={{
                  position: 'absolute',
                  left: `calc(${(localHue / 360) * 100}% - 10px)`,
                  top: -6,
                  width: 20,
                  height: 72,
                  borderRadius: '10px',
                  boxShadow: '0 0 0 3px rgba(255,255,255,0.9), 0 0 8px rgba(0,0,0,0.4)',
                  border: '2px solid rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
