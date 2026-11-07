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
    // Clear the spinner once the entity reports the state we asked for
    // — not when the service call is accepted (see useMediaPlayer).
    if (loadingValue === 'unknown' && entity) {
      setLoadingValue('');
    } else if (loadingValue === 'off' && entity?.state === 'off') {
      setLoadingValue('');
    } else if (loadingValue === 'on' && entity?.state && entity.state !== 'off' && entity.state !== 'unknown') {
      setLoadingValue('');
    } else if (entity?.state && entity.state === loadingValue) {
      setLoadingValue('');
    }
  }, [entity, value, loadingValue]);

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

  // Fallback so the spinner can never stick forever if a device never
  // reports its new state (lost command): clear it after 30 s, but only
  // if it is still showing the same target.
  const clearLoadingAfterTimeout = useCallback((target: string) => {
    setTimeout(() => {
      setLoadingValue(current => (current === target ? '' : current));
    }, 30000);
  }, []);

  const togglePower = useCallback(async () => {
    const target = value === 'off' ? 'on' : 'off';
    try {
      setLoadingValue(target);
      await powerService.toggle({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    // Do not clear the spinner here: the button should stay
    // indeterminate until the entity reports its new state (sync effect
    // above). The call itself has returned, so a sequence like All-off
    // still moves straight on to the next device.
    clearLoadingAfterTimeout(target);
  }, [entityId, powerService, value, clearLoadingAfterTimeout]);

  // Explicit on/off — see useMediaPlayer: deterministic even when the
  // locally cached `value` is stale or 'unknown'. Each one just sends
  // the call and moves on — no waiting, no retry. The spinner stays on
  // until the entity reports the new state.
  const turnOn = useCallback(async () => {
    try {
      setLoadingValue('on');
      await powerService.turnOn({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    if (value !== 'off' && value !== 'unknown') {
      setLoadingValue('');
    } else {
      clearLoadingAfterTimeout('on');
    }
  }, [entityId, powerService, value, clearLoadingAfterTimeout]);

  const turnOff = useCallback(async () => {
    try {
      setLoadingValue('off');
      await powerService.turnOff({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    if (value === 'off') {
      setLoadingValue('');
    } else {
      clearLoadingAfterTimeout('off');
    }
  }, [entityId, powerService, value, clearLoadingAfterTimeout]);

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
