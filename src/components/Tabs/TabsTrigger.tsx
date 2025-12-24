import { useEffect, useRef } from 'react';
import { useTabsContext } from './useTabsContext';
import type { TabsTriggerProps } from './types';
import { cn } from '@/utils';

export function TabsTrigger({ value, children, className, disabled = false }: TabsTriggerProps) {
    const { activeValue, onValueChange, triggerRefs } = useTabsContext();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const id = `tab-${value}`;
    const panelId = `panel-${value}`;

    const isActive = activeValue === value;

    // Register ref
    useEffect(() => {
        if (buttonRef.current) {
            triggerRefs.current.set(value, buttonRef.current);
        }
        return () => {
            triggerRefs.current.delete(value);
        };
    }, [value, triggerRefs]);

    const handleClick = () => {
        if (disabled) return;
        onValueChange(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        const triggers = Array.from(triggerRefs.current.entries())
            .filter(([, ref]) => ref && !ref.disabled)
            .map(([val]) => val);

        const currentIndex = triggers.indexOf(value);

        switch (e.key) {
            case 'ArrowRight': {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % triggers.length;
                const nextValue = triggers[nextIndex];
                const nextRef = triggerRefs.current.get(nextValue);
                if (nextRef) {
                    nextRef.focus();
                    onValueChange(nextValue);
                }
                break;
            }

            case 'ArrowLeft': {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
                const prevValue = triggers[prevIndex];
                const prevRef = triggerRefs.current.get(prevValue);
                if (prevRef) {
                    prevRef.focus();
                    onValueChange(prevValue);
                }
                break;
            }

            case 'Home': {
                e.preventDefault();
                const firstValue = triggers[0];
                const firstRef = triggerRefs.current.get(firstValue);
                if (firstRef) {
                    firstRef.focus();
                    onValueChange(firstValue);
                }
                break;
            }

            case 'End': {
                e.preventDefault();
                const lastValue = triggers[triggers.length - 1];
                const lastRef = triggerRefs.current.get(lastValue);
                if (lastRef) {
                    lastRef.focus();
                    onValueChange(lastValue);
                }
                break;
            }
        }
    };

    return (
        <button
            ref={buttonRef}
            id={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(className)}
        >
            {children}
        </button>
    );
}
