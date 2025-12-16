import React, { useEffect, useRef, useState } from 'react';
import useLightEntity from '../hooks/useLightEntity';
import type { EntityName } from '@hakit/core';
import { Box, Button, Divider, type Theme } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
    r = g = b = l; // achromatic
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

const WHITE_COLOR = { r: 255, g: 255, b: 255 };

const rgbEquals = (a: { r: number; g: number; b: number } | null | undefined, b: { r: number; g: number; b: number }) => {
  if (!a) return false;
  return a.r === b.r && a.g === b.g && a.b === b.b;
};

const LightEntityControl: React.FC<LightEntityControlProps> = ({ entityId, controlEntityIds }) => {
  const { value, brightness, color, turnOn, turnOff, setBrightness, setColor } = useLightEntity(
    entityId as EntityName,
    controlEntityIds?.map(c => c as EntityName)
  );

  const [pendingBrightness, setPendingBrightness] = useState<number | null>(brightness);
  const [pickerHue, setPickerHue] = useState<number | null>(null); // 0..360
  const [isPicking, setIsPicking] = useState(false);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setPendingBrightness(brightness), [brightness]);
  useEffect(() => {
    if (color) {
      // if the color equals the configured white color, treat as white selection
      if (rgbEquals(color, WHITE_COLOR)) {
        setPickerHue(null);
        return;
      }
      // convert rgb to hue approximation by converting to hsl and taking hue
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
  }, [color]);

  const commitBrightness = () => {
    if (pendingBrightness !== null) setBrightness(pendingBrightness);
  };

  // compute the color used for fills (preference: explicit color, else pickerHue)
  const computedFillColor = (() => {
    if (color) return `rgb(${color.r}, ${color.g}, ${color.b})`;
    if (pickerHue !== null) {
      const c = hslToRgb(pickerHue, 1, 0.5);
      return `rgb(${c.r}, ${c.g}, ${c.b})`;
    }
    return 'rgb(200,200,200)';
  })();

  const fillPercent = Math.max(0, Math.min(100, pendingBrightness ?? 0));

  // handle picking on the hue gradient
  const handlePointer = (clientX: number) => {
    const el = gradientRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = x / rect.width;
    const hue = Math.round(ratio * 360);
    setPickerHue(hue);
    // map hue to rgb with full saturation and 50% lightness for vivid color
    const rgb = hslToRgb(hue, 1, 0.5);
    setColor(rgb);
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
      // ignore pointer release errors
    }
    setIsPicking(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {value === 'on' ? 'Lights On' : 'Lights Off'}
          </Box>
        </Button>
        <Divider />
        {/* hide default circular thumb for brightness slider */}
        <style>{`
        .brightness-range { -webkit-appearance: none; appearance: none; }
        .brightness-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 0; height: 0; background: transparent; border: none; }
        .brightness-range::-moz-range-thumb { width: 0; height: 0; background: transparent; border: none; }
        .brightness-range::-ms-thumb { width: 0; height: 0; background: transparent; border: none; }
      `}</style>

        <input
          className='brightness-range'
          type='range'
          min={0}
          max={100}
          value={pendingBrightness ?? 0}
          onChange={e => setPendingBrightness(Number(e.target.value))}
          onMouseUp={commitBrightness}
          onTouchEnd={commitBrightness}
          disabled={value !== 'on'}
          aria-disabled={value !== 'on'}
          style={{
            flex: 1,
            height: 40,
            marginLeft: 12,
            borderRadius: 8,
            // background is dynamic per current color/fill
            background: `linear-gradient(90deg, ${computedFillColor} ${fillPercent}%, #e6e6e6 ${fillPercent}%)`,
            opacity: value === 'on' ? 1 : 0.45,
            cursor: value === 'on' ? 'pointer' : 'not-allowed',
          }}
        />
      </Box>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, justifyContent: 'space-between' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flex: 1,
              minWidth: 0,
              opacity: value === 'on' ? 1 : 0.5,
              pointerEvents: value === 'on' ? 'auto' : 'none',
            }}
            aria-disabled={value !== 'on'}
          >
            {/* white preset box */}
            <div
              onClick={() => {
                setColor(WHITE_COLOR);
                setPickerHue(null);
              }}
              role='button'
              aria-label='Select white preset'
              style={{
                width: 60,
                height: 40,
                borderRadius: 8,
                border: rgbEquals(color, WHITE_COLOR) ? '2px solid #1f6feb' : '1px solid #aaa',
                background: `rgb(${WHITE_COLOR.r}, ${WHITE_COLOR.g}, ${WHITE_COLOR.b})`,
                cursor: value === 'on' ? 'pointer' : 'not-allowed',
                boxShadow: value === 'on' && rgbEquals(color, WHITE_COLOR) ? '0 0 0 6px rgba(31,111,235,0.08)' : 'none',
              }}
            />
            <div
              ref={gradientRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                height: 40,
                borderRadius: 8,
                background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)',
                position: 'relative',
                touchAction: 'none',
                cursor: 'pointer',
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* indicator */}
              {pickerHue !== null && (
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${(pickerHue / 360) * 100}% - 8px)`,
                    top: -4,
                    width: 12,
                    height: 48,
                    borderRadius: 6,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.8), 0 0 2px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(0,0,0,0.25)',
                  }}
                />
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default LightEntityControl;
