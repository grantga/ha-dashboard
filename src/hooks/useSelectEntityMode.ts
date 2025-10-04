import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService } from '@hakit/core';

type UseSelectEntityMode = {
  value: string;
  loading: boolean;
  options?: string[];
  setValue: (key: string) => Promise<void>;
};

export default function useSelectEntityMode(entityId: string): UseSelectEntityMode {
  // `useEntity` subscribes to entity updates from Home Assistant
  const entity = useEntity(entityId as any) as any;
  const selectService = useService('select') as any;

  const [value, setValueState] = useState<string>(() => (entity && entity.state) || 'single');
  const [loading, setLoading] = useState<boolean>(() => !entity);

  useEffect(() => {
    // Sync local mode when entity becomes available
    if (entity && entity.state && entity.state !== value) {
      setValueState(entity.state);
    }
    // Update loading: true while entity is not yet available
    setLoading(!entity);
    // Intentionally only depends on entity
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setValueState(key);
      setLoading(true);
      const option = pickOptionForKey(key);
      try {
        await selectService.select_option({ target: entityId, serviceData: { option } });
      } finally {
        setLoading(false);
      }
    },
    [entityId, pickOptionForKey, selectService]
  );

  return {
    value,
    options,
    loading,
    setValue,
  };
}
