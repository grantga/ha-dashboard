import { useCallback, useEffect, useState } from 'react';
import { useEntity, useService } from '@hakit/core';

type UseSelectEntityMode = {
    value: string;
    loadingValue: string;
    options?: string[];
    setValue: (key: string) => Promise<void>;
};

export default function useSelectEntityMode(entityId: string): UseSelectEntityMode {
    // `useEntity` subscribes to entity updates from Home Assistant
    const entity = useEntity(entityId as any) as any;
    const selectService = useService('select') as any;

    const [value, setValueState] = useState<string>(() => (entity && entity.state) || 'unknown');
    const [loadingValue, setLoadingValue] = useState<string>(() => "unknown");

    useEffect(() => {
        // Sync local mode when entity becomes available
        if (entity && entity.state && entity.state !== value) {
            setValueState(entity.state);
        }
        // Clear loading when entity is available
        if (entity) {
            setLoadingValue("");
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
            setLoadingValue(option);
            try {
                await selectService.select_option({ target: entityId, serviceData: { option } });
            } catch {
            }
        },
        [entityId, pickOptionForKey, selectService]
    );

    return {
        value,
        options,
        loadingValue,
        setValue,
    };
}
