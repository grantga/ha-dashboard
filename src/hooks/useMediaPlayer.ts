import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService, type EntityName } from '@hakit/core';

type UseMediaPlayer = {
  value: string;
  loadingValue: string;
  togglePower: () => Promise<void>;
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
    // Clear loading when entity is available
    if (entity) {
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
  }, [entity, value]);

  const togglePower = useCallback(async () => {
    try {
      if (value === 'off') {
        setLoadingValue('on');
      } else {
        setLoadingValue('off');
      }
      mediaPlayerService.toggle({ target: entityId });
    } catch {
      // Ignore service call errors
    }
  }, [entityId, mediaPlayerService, value]);

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
