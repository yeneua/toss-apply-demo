import { useState, useRef, useCallback, useEffect } from 'react';
import { AccordionContext } from './AccordionContext';
import type { AccordionProps } from './types';
import { cn } from '@/utils';

export function Accordion(props: AccordionProps) {
    const { type, children, className } = props;

    const triggerRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

    // Single mode state
    const [singleValue, setSingleValue] = useState<string>(
        type === 'single' && props.defaultValue ? props.defaultValue : ''
    );

    // Multiple mode state
    const [multipleValue, setMultipleValue] = useState<string[]>(
        type === 'multiple' && props.defaultValue ? props.defaultValue : []
    );

    // Determine current value
    const value = type === 'single'
        ? (props.value !== undefined ? props.value : singleValue)
        : (props.value !== undefined ? props.value : multipleValue);

    // Handle item toggle for single mode
    const handleSingleToggle = useCallback(
        (itemValue: string) => {
            const collapsible = type === 'single' && 'collapsible' in props ? props.collapsible : false;

            let newValue: string;
            if (value === itemValue && collapsible) {
                newValue = '';
            } else {
                newValue = itemValue;
            }

            if (props.value === undefined) {
                setSingleValue(newValue);
            }

            if (type === 'single' && props.onValueChange) {
                props.onValueChange(newValue);
            }
        },
        [type, value, props]
    );

    // Handle item toggle for multiple mode
    const handleMultipleToggle = useCallback(
        (itemValue: string) => {
            const currentArray = Array.isArray(value) ? value : [];
            let newValue: string[];

            if (currentArray.includes(itemValue)) {
                newValue = currentArray.filter((v) => v !== itemValue);
            } else {
                newValue = [...currentArray, itemValue];
            }

            if (props.value === undefined) {
                setMultipleValue(newValue);
            }

            if (type === 'multiple' && props.onValueChange) {
                props.onValueChange(newValue);
            }
        },
        [type, value, props]
    );

    const onItemToggle = type === 'single' ? handleSingleToggle : handleMultipleToggle;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

            const activeElement = document.activeElement as HTMLButtonElement;
            const triggers = Array.from(triggerRefs.current.values()).filter(
                (trigger) => trigger !== null
            ) as HTMLButtonElement[];

            const currentIndex = triggers.indexOf(activeElement);
            if (currentIndex === -1) return;

            event.preventDefault();

            let nextIndex: number;
            if (event.key === 'ArrowDown') {
                nextIndex = currentIndex === triggers.length - 1 ? 0 : currentIndex + 1;
            } else {
                nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
            }

            triggers[nextIndex]?.focus();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const contextValue = {
        type,
        value,
        onItemToggle,
        triggerRefs,
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={cn(className)}>{children}</div>
        </AccordionContext.Provider>
    );
}
