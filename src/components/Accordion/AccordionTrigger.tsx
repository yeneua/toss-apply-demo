import { useEffect, useRef } from 'react';
import { useAccordion } from './useAccordion';
import { useAccordionItem } from './useAccordionItem';
import type { AccordionTriggerProps } from './types';
import { cn } from '@/utils';

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
    const { onItemToggle, triggerRefs } = useAccordion();
    const { value, isExpanded, disabled, triggerId, contentId } = useAccordionItem();
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (triggerRef.current) {
            triggerRefs.current.set(value, triggerRef.current);
        }
        return () => {
            triggerRefs.current.delete(value);
        };
    }, [value, triggerRefs]);

    const handleClick = () => {
        if (!disabled) {
            onItemToggle(value);
        }
    };

    return (
        <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            className={cn(
                'flex w-full items-center justify-between py-4 text-left font-medium transition-all',
                disabled && 'cursor-not-allowed opacity-50',
                className
            )}
        >
            {children}
            <svg
                className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-200',
                    isExpanded && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
}
