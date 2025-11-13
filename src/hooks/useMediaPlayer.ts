import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService } from '@hakit/core';

type UseMediaPlayer = {
    value: string;
    loadingValue: string;
    togglePower: () => Promise<void>;
};

export default function useMediaPlayer(entityId: string): UseMediaPlayer {
    // `useEntity` subscribes to entity updates from Home Assistant
    const entity = useEntity(entityId as any) as any;
    // service used to send power on/off commands. many integrations expose power_on/power_off
    const mediaPlayerService = useService('media_player') as any;

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

    const togglePower = useCallback(async () => {
        try {
            if (value === 'off') {
                setLoadingValue('on');
            } else {
                setLoadingValue('off');
            }
            await mediaPlayerService.toggle({ target: entityId });
        } catch {
        }
    }, [entityId, mediaPlayerService]);


    return {
        value,
        loadingValue,
        togglePower,
    };
}
