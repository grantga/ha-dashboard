import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService, type EntityName } from '@hakit/core';

type UseSelectEntityMode = {
  value: string;
  loadingValue: string;
  options?: string[];
  setValue: (key: string) => Promise<void>;
  togglePower: () => Promise<void>;
  turnOn: () => Promise<void>;
  turnOff: () => Promise<void>;
};

export default function useSelectEntityMode(entityId: EntityName): UseSelectEntityMode {
  // `useEntity` subscribes to entity updates from Home Assistant
  const entity = useEntity(entityId);
  const selectService = useService('select');
  const powerService = useService('switch');

  const [value, setValueState] = useState<string>(() => (entity && entity.state) || 'unknown');
  const [loadingValue, setLoadingValue] = useState<string>(() => 'unknown');

  useEffect(() => {
    // Sync local mode when entity becomes available
    if (entity && entity.state && entity.state !== value) {
      setValueState(entity.state);
    }
    // Clear loading when entity is available
    if (entity) {
      setLoadingValue('');
    }
  }, [entity, value]);

  const options: string[] | undefined = entity?.attributes?.options;

  const pickOptionForKey = useCallback(
    (key: string) => {
      if (!options || options.length === 0) return key;
      const lower = key.toLowerCase();
      const exact = options.find(o => o.toLowerCase() === lower);
      if (exact) return exact;
      const byLabel = options.find(o => o.toLowerCase().includes(lower));
      if (byLabel) return byLabel;
      return options[0];
    },
    [options]
  );

  const setValue = useCallback(
    async (key: string) => {
      const option = pickOptionForKey(key);
      //send if it changed
      if (option !== value) {
        setLoadingValue(option);
        try {
          selectService.selectOption({ target: entityId, serviceData: { option } });
        } catch {
          // Ignore service call errors
        }
      }
    },
    [entityId, value, pickOptionForKey, selectService]
  );

  const togglePower = useCallback(async () => {
    try {
      if (value === 'off') {
        setLoadingValue('on');
      } else {
        setLoadingValue('off');
      }
      await powerService.toggle({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    // Clear the spinner once HA has accepted the call — do not wait for
    // the entity state to flip.
    setLoadingValue('');
  }, [entityId, powerService, value]);

  // Explicit on/off — see useMediaPlayer: deterministic even when the
  // locally cached `value` is stale or 'unknown'. Each one just sends
  // the call and moves on — no waiting, no retry.
  const turnOn = useCallback(async () => {
    try {
      setLoadingValue('on');
      await powerService.turnOn({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    setLoadingValue('');
  }, [entityId, powerService]);

  const turnOff = useCallback(async () => {
    try {
      setLoadingValue('off');
      await powerService.turnOff({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    setLoadingValue('');
  }, [entityId, powerService]);

  return {
    value,
    options,
    loadingValue,
    setValue,
    togglePower,
    turnOn,
    turnOff,
  };
}
