import { useContext } from 'react';
import { AccordionItemContext } from './AccordionItemContext';

export function useAccordionItem() {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error('useAccordionItem must be used within an AccordionItem');
    }
    return context;
}
