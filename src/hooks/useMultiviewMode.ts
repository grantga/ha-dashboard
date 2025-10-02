import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService } from '@hakit/core';

type UseMultiviewMode = {
  mode: string;
  options?: string[];
  loading: boolean;
  setMode: (key: string) => Promise<void>;
};

export default function useMultiviewMode(entityId = 'select.orei_uhd_401mv_multiview_mode'): UseMultiviewMode {
  // `useEntity` subscribes to entity updates from Home Assistant
  const entity = useEntity(entityId as any) as any;
  const selectService = useService('select') as any;

  const [mode, setModeState] = useState<string>(() => (entity && entity.state) || 'single');
  const [loading, setLoading] = useState<boolean>(() => !entity);

  useEffect(() => {
    // Sync local mode when entity becomes available
    if (entity && entity.state && entity.state !== mode) {
      setModeState(entity.state);
    }
    // Update loading: true while entity is not yet available
    setLoading(!entity);
    // Intentionally only depends on entity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  const options: string[] | undefined = entity?.attributes?.options;

  const pickOptionForKey = useCallback((key: string) => {
    if (!options || options.length === 0) return key;
    const lower = key.toLowerCase();
    const exact = options.find(o => o.toLowerCase() === lower);
    if (exact) return exact;
    const byLabel = options.find(o => o.toLowerCase().includes(lower));
    if (byLabel) return byLabel;
    return options[0];
  }, [options]);

  const setMode = useCallback(async (key: string) => {
    setModeState(key);
    setLoading(true);
    const option = pickOptionForKey(key);
    try {
      await selectService.select_option({ target: entityId, serviceData: { option } });
    } finally {
      setLoading(false);
    }
  }, [entityId, pickOptionForKey, selectService]);

  return {
    mode,
    options,
    loading,
    setMode,
  };
}
