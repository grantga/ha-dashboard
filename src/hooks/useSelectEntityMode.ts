import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService, type EntityName } from '@hakit/core';

type UseSelectEntityMode = {
  value: string;
  loadingValue: string;
  options?: string[];
  setValue: (key: string) => Promise<void>;
  togglePower: () => Promise<void>;
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
  }, [entity]);

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
        } catch {}
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
      powerService.toggle({ target: entityId });
    } catch {}
  }, [entityId, powerService]);

  return {
    value,
    options,
    loadingValue,
    setValue,
    togglePower,
  };
}
