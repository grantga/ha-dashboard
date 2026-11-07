import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService, type EntityName } from '@hakit/core';

type UseMediaPlayer = {
  value: string;
  loadingValue: string;
  togglePower: () => Promise<void>;
  turnOn: () => Promise<void>;
  turnOff: () => Promise<void>;
  // volume is 0..1 (Home Assistant)
  volume: number | null;
  setVolume: (level: number) => Promise<void>;
  volumeUp: () => Promise<void>;
  volumeDown: () => Promise<void>;
  // mute state (true/false) or null when unknown
  muted: boolean | null;
  setMuted: (isMuted: boolean) => Promise<void>;
  // available sources/inputs for the media player (if provided by the integration)
  sources: string[] | null;
  currentSource: string | null;
  setSource: (source: string) => Promise<void>;
  attributes: Record<string, unknown>;
};

export default function useMediaPlayer(entityId: EntityName): UseMediaPlayer {
  // `useEntity` subscribes to entity updates from Home Assistant
  const entity = useEntity(entityId);
  // service used to send power on/off commands. many integrations expose power_on/power_off
  const mediaPlayerService = useService('media_player');

  const [value, setValueState] = useState<string>(() => (entity && entity.state) || 'unknown');
  const [loadingValue, setLoadingValue] = useState<string>(() => 'unknown');
  const [volume, setVolumeState] = useState<number | null>(() =>
    entity && entity.attributes && typeof entity.attributes.volume_level === 'number' ? entity.attributes.volume_level : null
  );
  const [muted, setMutedState] = useState<boolean | null>(() =>
    entity && entity.attributes && typeof entity.attributes.is_volume_muted === 'boolean' ? entity.attributes.is_volume_muted : null
  );
  const [sources, setSources] = useState<string[] | null>(() => {
    if (!entity || !entity.attributes) return null;
    return (entity.attributes.source_list || entity.attributes.input_source_list || entity.attributes.inputs) ?? null;
  });
  const [currentSource, setCurrentSource] = useState<string | null>(
    () => (entity && entity.attributes && (entity.attributes.source || entity.attributes.input_source || entity.attributes.input)) ?? null
  );

  useEffect(() => {
    // Sync local mode when entity becomes available
    if (entity && entity.state && entity.state !== value) {
      setValueState(entity.state);
    }
    // Clear the spinner once the entity reports the state we asked for
    // — not when the service call is accepted, or the button falls back
    // to its old state while the device is still flipping (the Epson
    // takes a while to report 'off'). The initial 'unknown' loading
    // clears as soon as the entity exists; a power call that never gets
    // reported clears on the bounded fallback in the power functions.
    if (loadingValue === 'unknown' && entity) {
      setLoadingValue('');
    } else if (loadingValue === 'off' && entity?.state === 'off') {
      setLoadingValue('');
    } else if (loadingValue === 'on' && entity?.state && entity.state !== 'off' && entity.state !== 'unknown') {
      setLoadingValue('');
    } else if (entity?.state && entity.state === loadingValue) {
      // e.g. a select-option call: clear once the entity reports it
      setLoadingValue('');
    }
    // sync volume
    if (entity && entity.attributes && typeof entity.attributes.volume_level === 'number') {
      setVolumeState(entity.attributes.volume_level);
    }
    // sync mute
    if (entity && entity.attributes && typeof entity.attributes.is_volume_muted === 'boolean') {
      setMutedState(entity.attributes.is_volume_muted);
    }
    // sync sources/current source
    if (entity && entity.attributes) {
      const s = (entity.attributes.source_list || entity.attributes.input_source_list || entity.attributes.inputs) ?? null;
      setSources(s);
      const cs = (entity.attributes.source || entity.attributes.input_source || entity.attributes.input) ?? null;
      setCurrentSource(cs);
    }
  }, [entity, value, loadingValue]);

  // Fallback so the spinner can never stick forever if a device never
  // reports its new state (lost command): clear it after 30 s, but only
  // if it is still showing the same target.
  const clearLoadingAfterTimeout = useCallback((target: string) => {
    setTimeout(() => {
      setLoadingValue(current => (current === target ? '' : current));
    }, 30000);
  }, []);

  const togglePower = useCallback(async () => {
    const wasOff = value === 'off';
    const target = wasOff ? 'on' : 'off';
    try {
      setLoadingValue(target);
      await mediaPlayerService.toggle({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    // Do not clear the spinner here: the button should stay
    // indeterminate until the entity reports its new state (sync effect
    // above). The call itself has returned, so a sequence like All-off
    // still moves straight on to the next device.
    clearLoadingAfterTimeout(target);
  }, [entityId, mediaPlayerService, value, clearLoadingAfterTimeout]);

  // Explicit on/off (unlike toggle, these do the right thing even if the
  // locally cached `value` is stale or 'unknown' when the call is made).
  // Each one just sends the call and moves on — no waiting, no retry.
  // The spinner stays on until the entity reports the new state.
  const turnOn = useCallback(async () => {
    try {
      setLoadingValue('on');
      await mediaPlayerService.turnOn({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    if (value !== 'off' && value !== 'unknown') {
      setLoadingValue('');
    } else {
      clearLoadingAfterTimeout('on');
    }
  }, [entityId, mediaPlayerService, value, clearLoadingAfterTimeout]);

  const turnOff = useCallback(async () => {
    try {
      setLoadingValue('off');
      await mediaPlayerService.turnOff({ target: entityId });
    } catch {
      // Ignore service call errors
    }
    if (value === 'off') {
      setLoadingValue('');
    } else {
      clearLoadingAfterTimeout('off');
    }
  }, [entityId, mediaPlayerService, value, clearLoadingAfterTimeout]);

  const setVolume = useCallback(
    async (level: number) => {
      try {
        // clamp 0..1
        const vol = Math.max(0, Math.min(1, level));
        mediaPlayerService.volumeSet({ target: entityId, serviceData: { volume_level: vol } });
        setVolumeState(vol);
      } catch {
        // Ignore service call errors
      }
    },
    [entityId, mediaPlayerService]
  );

  const volumeUp = useCallback(async () => {
    try {
      mediaPlayerService.volumeUp({ target: entityId });
    } catch {
      // Ignore service call errors
    }
  }, [entityId, mediaPlayerService]);

  const volumeDown = useCallback(async () => {
    try {
      mediaPlayerService.volumeDown({ target: entityId });
    } catch {
      // Ignore service call errors
    }
  }, [entityId, mediaPlayerService]);

  const setMuted = useCallback(
    async (isMuted: boolean) => {
      try {
        mediaPlayerService.volumeMute({ target: entityId, serviceData: { is_volume_muted: isMuted } });
      } catch {
        // Ignore service call errors
      }
    },
    [entityId, mediaPlayerService]
  );

  const setSource = useCallback(
    async (source: string) => {
      try {
        // call HA service to select source/input
        mediaPlayerService.selectSource({ target: entityId, serviceData: { source } });
        setCurrentSource(source);
      } catch {
        // Ignore service call errors
      }
    },
    [entityId, mediaPlayerService]
  );

  return {
    value,
    loadingValue,
    togglePower,
    turnOn,
    turnOff,
    volume,
    setVolume,
    volumeUp,
    volumeDown,
    muted,
    setMuted,
    sources,
    currentSource,
    setSource,
    attributes: entity?.attributes ?? {},
  };
}
