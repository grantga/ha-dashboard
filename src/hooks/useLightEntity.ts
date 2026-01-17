import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEntity, useService, type EntityName } from '@hakit/core';

export type UseLightEntity = {
  value: string;
  loadingValue: string;
  brightness: number | null;
  color: { r: number; g: number; b: number } | null;
  effect: string | null;
  effectList: string[] | null;
  colorTemp: number | null;
  turnOn: (options?: { brightness?: number; color?: { r: number; g: number; b: number }; effect?: string }) => Promise<void>;
  turnOff: () => Promise<void>;
  setBrightness: (brightness: number) => Promise<void>;
  setColor: (color: { r: number; g: number; b: number }) => Promise<void>;
  setEffect: (effect: string) => Promise<void>;
  setColorTemp: (mireds: number) => Promise<void>;
};

export default function useLightEntity(statusEntityId: EntityName, controlEntityIds?: EntityName[]): UseLightEntity {
  // statusEntityId: entity to read state/attributes from
  // controlEntityIds: optional array of entity ids to send service calls to
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = useEntity(statusEntityId);
  const lightService = useService('light');
  const controlIds = useMemo(
    () => (controlEntityIds && controlEntityIds.length > 0 ? controlEntityIds : [statusEntityId]),
    [controlEntityIds, statusEntityId]
  );

  const [value, setValueState] = useState<string>(() => (entity && entity.state) || 'unknown');
  const [loadingValue, setLoadingValue] = useState<string>('unknown');
  const [brightness, setBrightnessState] = useState<number | null>(() =>
    entity && entity.attributes && typeof entity.attributes.brightness === 'number' ? entity.attributes.brightness : null
  );
  const [color, setColorState] = useState<{ r: number; g: number; b: number } | null>(() => {
    if (entity && entity.attributes && entity.attributes.rgb_color) {
      const [r, g, b] = entity.attributes.rgb_color;
      return { r, g, b };
    }
    return null;
  });
  const [effect, setEffectState] = useState<string | null>(() => (entity && entity.attributes && entity.attributes.effect) || null);
  const [effectList, setEffectListState] = useState<string[] | null>(
    () => (entity && entity.attributes && entity.attributes.effect_list) || null
  );
  const [colorTemp, setColorTempState] = useState<number | null>(
    () => (entity && entity.attributes && entity.attributes.color_temp) || null
  );

  useEffect(() => {
    if (entity && entity.state && entity.state !== value) {
      setValueState(entity.state);
    }
    if (entity) {
      setLoadingValue('');
    }
    if (entity && entity.attributes && typeof entity.attributes.brightness_pct === 'number') {
      setBrightnessState(entity.attributes.brightness_pct);
    }
    if (entity && entity.attributes && entity.attributes.rgb_color) {
      const [r, g, b] = entity.attributes.rgb_color;
      setColorState({ r, g, b });
    }
    if (entity && entity.attributes) {
      setEffectState(entity.attributes.effect || null);
      setEffectListState(entity.attributes.effect_list || null);
      setColorTempState(entity.attributes.color_temp || null);
    }
  }, [entity, value]);

  const turnOn = useCallback(
    async (options?: { brightness?: number; color?: { r: number; g: number; b: number }; effect?: string }) => {
      try {
        setLoadingValue('on');
        const serviceData: { brightness_pct?: number; rgb_color?: [number, number, number]; effect?: string } = {};
        if (options?.brightness !== undefined) {
          serviceData.brightness_pct = options.brightness;
        }
        if (options?.color) {
          serviceData.rgb_color = [options.color.r, options.color.g, options.color.b];
        }
        if (options?.effect) {
          serviceData.effect = options.effect;
        }
        lightService.turnOn({ target: controlIds, serviceData });
      } catch {
        // Ignore service call errors
      }
    },
    [controlIds, lightService]
  );

  const turnOff = useCallback(async () => {
    try {
      setLoadingValue('off');
      lightService.turnOff({ target: controlIds });
    } catch {
      // Ignore service call errors
    }
  }, [controlIds, lightService]);

  const setBrightness = useCallback(
    async (b: number) => {
      try {
        setLoadingValue('on');
        lightService.turnOn({ target: controlIds, serviceData: { brightness_pct: b } });
        setBrightnessState(b);
      } catch {
        // Ignore service call errors
      }
    },
    [controlIds, lightService]
  );

  const setColor = useCallback(
    async (c: { r: number; g: number; b: number }) => {
      try {
        setLoadingValue('on');
        lightService.turnOn({ target: controlIds, serviceData: { rgb_color: [c.r, c.g, c.b] } });
        setColorState(c);
      } catch {
        // Ignore service call errors
      }
    },
    [controlIds, lightService]
  );

  const setEffect = useCallback(
    async (e: string) => {
      try {
        setLoadingValue('on');
        lightService.turnOn({ target: controlIds, serviceData: { effect: e } });
        setEffectState(e);
      } catch {
        // Ignore service call errors
      }
    },
    [controlIds, lightService]
  );

  const setColorTemp = useCallback(
    async (mireds: number) => {
      try {
        setLoadingValue('on');
        lightService.turnOn({ target: controlIds, serviceData: { color_temp: mireds } });
        setColorTempState(mireds);
      } catch {
        // Ignore service call errors
      }
    },
    [controlIds, lightService]
  );

  return {
    value,
    loadingValue,
    brightness,
    color,
    turnOn,
    turnOff,
    setBrightness,
    setColor,
    setEffect,
    effect,
    effectList,
    colorTemp,
    setColorTemp,
  };
}
