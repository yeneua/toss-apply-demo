import { useMemo } from 'react';
import { AccordionItemContext } from './AccordionItemContext';
import { useAccordion } from './useAccordion';
import type { AccordionItemProps } from './types';
import { cn } from '@/utils';

export function AccordionItem({ value, children, className, disabled = false }: AccordionItemProps) {
    const { value: accordionValue } = useAccordion();

    const isExpanded = useMemo(() => {
        if (Array.isArray(accordionValue)) {
            return accordionValue.includes(value);
        }
        return accordionValue === value;
    }, [accordionValue, value]);

    const triggerId = `accordion-trigger-${value}`;
    const contentId = `accordion-content-${value}`;

    const contextValue = {
        value,
        isExpanded,
        disabled,
        triggerId,
        contentId,
    };

    return (
        <AccordionItemContext.Provider value={contextValue}>
            <div className={cn('border-b border-gray-200', className)}>{children}</div>
        </AccordionItemContext.Provider>
    );
}
