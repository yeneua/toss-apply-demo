import { useState, useRef, useCallback } from 'react';
import { TabsContext } from './TabsContext';
import type { TabsProps } from './types';
import { cn } from '@/utils';

export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange,
    children,
    className,
}: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());

    // Controlled vs uncontrolled
    const activeValue = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = useCallback(
        (newValue: string) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            onValueChange?.(newValue);
        },
        [controlledValue, onValueChange]
    );

    const contextValue = {
        activeValue,
        onValueChange: handleValueChange,
        triggerRefs,
    };

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={cn(className)}>{children}</div>
        </TabsContext.Provider>
    );
}
