import React, { useEffect, useState } from 'react';
import useLightEntity from '../hooks/useLightEntity';
import type { EntityName } from '@hakit/core';
import { Box, Button, type Theme } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PaletteIcon from '@mui/icons-material/Palette';
import ColorPickerModal from './ColorPickerModal';

interface LightEntityControlProps {
  /** status entity id to read attributes from */
  entityId: string;
  /** optional list of entity ids to target for service calls; defaults to [entityId] */
  controlEntityIds?: string[];
}

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

const WHITE_COLOR_TEMP = 310;

const LightEntityControl: React.FC<LightEntityControlProps> = ({ entityId, controlEntityIds }) => {
  const { value, brightness, color, colorTemp, turnOn, turnOff, setBrightness, setColor, setColorTemp } = useLightEntity(
    entityId as EntityName,
    controlEntityIds?.map(c => c as EntityName)
  );

  const [pendingBrightness, setPendingBrightness] = useState<number | null>(brightness);
  const [pickerHue, setPickerHue] = useState<number | null>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => setPendingBrightness(brightness), [brightness]);
  useEffect(() => {
    if (color) {
      if (colorTemp === WHITE_COLOR_TEMP) {
        setPickerHue(null);
        return;
      }
      const r = color.r / 255;
      const g = color.g / 255;
      const b = color.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;

      if (max !== min) {
        const d = max - min;
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h = Math.round(h * 60);
        setPickerHue(h);
      } else {
        setPickerHue(0);
      }
    }
  }, [color, colorTemp]);

  const commitBrightness = () => {
    if (pendingBrightness !== null) setBrightness(pendingBrightness);
  };

  // Check if we're in white/color temp mode
  const isWhiteMode = colorTemp === WHITE_COLOR_TEMP || pickerHue === null;

  // compute the color used for fills
  const computedFillColor = (() => {
    if (isWhiteMode) return 'rgb(255, 255, 255)';
    if (color) return `rgb(${color.r}, ${color.g}, ${color.b})`;
    if (pickerHue !== null) {
      const c = hslToRgb(pickerHue, 1, 0.5);
      return `rgb(${c.r}, ${c.g}, ${c.b})`;
    }
    return 'rgb(200,200,200)';
  })();

  // compute a darker background color for unfilled portion
  const computedFillColorBackground = (() => {
    if (isWhiteMode) return 'rgb(128, 128, 128)';
    const base = color ?? (pickerHue !== null ? hslToRgb(pickerHue, 1, 0.5) : { r: 200, g: 200, b: 200 });
    const factor = 0.5;
    const r = Math.max(0, Math.min(255, Math.round(base.r * factor)));
    const g = Math.max(0, Math.min(255, Math.round(base.g * factor)));
    const b = Math.max(0, Math.min(255, Math.round(base.b * factor)));
    return `rgb(${r}, ${g}, ${b})`;
  })();

  const fillPercent = Math.max(0, Math.min(100, pendingBrightness ?? 0));

  const handleColorChange = (rgb: { r: number; g: number; b: number }) => {
    setColor(rgb);
  };

  const handleColorTempChange = (temp: number) => {
    setColorTemp(temp);
    setPickerHue(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
        <Button
          variant={value === 'on' ? 'contained' : 'outlined'}
          size='large'
          onClick={() => (value === 'on' ? turnOff() : turnOn())}
          startIcon={<PowerSettingsNewIcon sx={{ flexShrink: 0 }} />}
          sx={{
            py: 1,
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.9rem' },
            boxShadow: (theme: Theme) => (value === 'on' ? theme.palette.custom?.shadowPrimary : 'none'),
            '&:hover': {
              boxShadow: (theme: Theme) =>
                value === 'on' ? theme.palette.custom?.shadowPrimaryHover : theme.palette.custom?.shadowSecondary,
            },
          }}
        >
          <Box component='span' sx={{ display: 'block' }}>
            Lights
          </Box>
        </Button>

        {/* hide default circular thumb for brightness slider */}
        <style>{`
        .brightness-range { -webkit-appearance: none; appearance: none; }
        .brightness-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 0; height: 0; background: transparent; border: none; }
        .brightness-range::-moz-range-thumb { width: 0; height: 0; background: transparent; border: none; }
        .brightness-range::-ms-thumb { width: 0; height: 0; background: transparent; border: none; }
      `}</style>

        <Box
          component='input'
          className='brightness-range'
          type='range'
          min={0}
          max={100}
          value={pendingBrightness ?? 0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPendingBrightness(Number(e.target.value))}
          onMouseUp={commitBrightness}
          onTouchEnd={commitBrightness}
          disabled={value !== 'on'}
          aria-disabled={value !== 'on'}
          sx={{
            flex: 1,
            height: { xs: 36, sm: 40 },
            borderRadius: 1,
            background: `linear-gradient(90deg, ${computedFillColor} ${fillPercent}%, ${computedFillColorBackground} ${fillPercent}%)`,
            opacity: value === 'on' ? 1 : 0.45,
            cursor: value === 'on' ? 'pointer' : 'not-allowed',
          }}
        />

        {/* Color picker button */}
        <Box
          onClick={() => value === 'on' && setColorPickerOpen(true)}
          role='button'
          aria-label='Open color picker'
          sx={(theme: Theme) => ({
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            borderRadius: 1,
            background: computedFillColor,
            border: `2px solid ${theme.palette.custom.border}`,
            cursor: value === 'on' ? 'pointer' : 'not-allowed',
            opacity: value === 'on' ? 1 : 0.45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease-in-out',
            '&:hover':
              value === 'on'
                ? {
                    borderColor: theme.palette.primary.main,
                    transform: 'scale(1.05)',
                  }
                : {},
          })}
        >
          <PaletteIcon
            sx={(theme: Theme) => ({
              fontSize: { xs: 18, sm: 20 },
              color: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            })}
          />
        </Box>
      </Box>

      <ColorPickerModal
        open={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        currentHue={pickerHue}
        currentColorTemp={colorTemp}
        onColorChange={handleColorChange}
        onColorTempChange={handleColorTempChange}
      />
    </Box>
  );
};

export default LightEntityControl;
