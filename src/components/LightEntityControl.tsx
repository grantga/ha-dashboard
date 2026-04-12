import React, { useEffect, useRef, useState } from 'react';
import useLightEntity from '../hooks/useLightEntity';
import type { EntityName } from '@hakit/core';
import { Box, Button, Typography, type Theme } from '@mui/material';
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
  const [pickerLightness, setPickerLightness] = useState<number>(0.5);
  const [isPicking, setIsPicking] = useState(false);
  const [waitingForColor, setWaitingForColor] = useState(false);
  // Ref mirrors waitingForColor but is synchronously readable in event handlers (no stale closure)
  const waitingRef = useRef(false);
  // Color reported by HA at the moment we sent the command — unblock when it changes from this
  const colorAtSendRef = useRef<{ r: number; g: number; b: number } | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setPendingBrightness(brightness), [brightness]);

  // Sync picker state from HA color
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
      const l = (max + min) / 2;
      setPickerLightness(l);

      if (max !== min) {
        const d = max - min;
        let h = 0;
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        setPickerHue(Math.round(h * 60));
      } else {
        setPickerHue(0);
      }
    }
  }, [color, colorTemp]);

  // Unblock once HA reports a color different from what it was when we sent the command
  useEffect(() => {
    if (!colorAtSendRef.current || !color) return;
    const baseline = colorAtSendRef.current;
    const changed =
      Math.abs(color.r - baseline.r) > 5 ||
      Math.abs(color.g - baseline.g) > 5 ||
      Math.abs(color.b - baseline.b) > 5;
    if (changed) {
      colorAtSendRef.current = null;
      waitingRef.current = false;
      setWaitingForColor(false);
    }
  }, [color]);

  const commitBrightness = () => {
    if (pendingBrightness !== null) setBrightness(pendingBrightness);
  };

  const isWhiteMode = colorTemp === WHITE_COLOR_TEMP || pickerHue === null;

  const fillPercent = Math.max(0, Math.min(100, pendingBrightness ?? 0));

  const handleColorTempChange = (temp: number) => {
    setColorTemp(temp);
    setPickerHue(null);
  };

  const handleGradientPointer = (clientX: number, clientY: number) => {
    const el = gradientRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const hue = Math.round((x / rect.width) * 360);
    const lightness = 1 - y / rect.height; // top=1 (white), bottom=0 (black)
    setPickerHue(hue);
    setPickerLightness(lightness);
    const rgb = hslToRgb(hue, 1, lightness);
    // Snapshot the current reported color so we know what "changed" means
    colorAtSendRef.current = color ? { r: color.r, g: color.g, b: color.b } : { r: -999, g: -999, b: -999 };
    waitingRef.current = true;
    setWaitingForColor(true);
    setColor(rgb);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (value !== 'on' || waitingRef.current) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsPicking(true);
    handleGradientPointer(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPicking || waitingRef.current) return;
    handleGradientPointer(e.clientX, e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    setIsPicking(false);
  };

  const pickerDisabled = value !== 'on' || waitingForColor;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
        <Button
          variant={value === 'on' ? 'contained' : 'outlined'}
          size='large'
          onClick={() => (value === 'on' ? turnOff() : turnOn())}
          startIcon={<PowerSettingsNewIcon sx={{ flexShrink: 0 }} />}
          sx={{
            height: 48,
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
          sx={(theme: Theme) => ({
            flex: 1,
            position: 'relative',
            height: 48,
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${theme.palette.divider}`,
            opacity: value === 'on' ? 1 : 0.45,
          })}
        >
          {/* Fill bar */}
          <Box
            sx={(theme: Theme) => ({
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: `${fillPercent}%`,
              bgcolor: theme.palette.primary.main,
              opacity: 0.6,
              transition: 'width 0.1s ease-out',
            })}
          />
          {/* Transparent range input for interaction */}
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
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              cursor: value === 'on' ? 'pointer' : 'not-allowed',
            }}
          />
          {/* Percent text overlay */}
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.25rem', color: 'text.primary' }}>
              {fillPercent}%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Inline color palette */}
      <Box sx={{ display: 'flex', gap: 1, mt: 1, opacity: value === 'on' ? 1 : 0.45 }}>
        {/* White swatch */}
        <Box
          onClick={() => value === 'on' && handleColorTempChange(WHITE_COLOR_TEMP)}
          role='button'
          aria-label='Select white'
          sx={(theme: Theme) => ({
            width: 48,
            height: 160,
            borderRadius: 1.5,
            background: 'white',
            border: isWhiteMode
              ? `3px solid ${theme.palette.primary.main}`
              : `2px solid ${theme.palette.custom.border}`,
            cursor: value === 'on' ? 'pointer' : 'not-allowed',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.15s',
          })}
        >
          {isWhiteMode && (
            <Box sx={{
              width: 10, height: 10, borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.8)',
              pointerEvents: 'none',
            }} />
          )}
        </Box>

        {/* 2D hue×lightness gradient rectangle */}
        <Box
          ref={gradientRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          sx={(theme: Theme) => ({
            flex: 1,
            height: 160,
            borderRadius: 1.5,
            // X=hue, Y=lightness: white at top, pure colors in middle, black at bottom
            background: [
              'linear-gradient(to bottom, white, transparent 50%, black)',
              'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)',
            ].join(', '),
            position: 'relative',
            touchAction: 'none',
            cursor: pickerDisabled ? 'not-allowed' : 'crosshair',
            pointerEvents: waitingForColor ? 'none' : 'auto',
            transition: 'opacity 0.15s',
            opacity: waitingForColor ? 0.5 : 1,
          })}
        >
          {!isWhiteMode && pickerHue !== null && (
            <Box
              sx={{
                position: 'absolute',
                left: `calc(${(pickerHue / 360) * 100}% - 10px)`,
                top: `calc(${(1 - pickerLightness) * 100}% - 10px)`,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: (() => { const c = hslToRgb(pickerHue, 1, pickerLightness); return `rgb(${c.r},${c.g},${c.b})`; })(),
                boxShadow: '0 0 0 3px rgba(255,255,255,0.9), 0 0 8px rgba(0,0,0,0.4)',
                border: '2px solid rgba(0,0,0,0.2)',
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LightEntityControl;
