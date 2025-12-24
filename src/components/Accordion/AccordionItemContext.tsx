import { createContext } from 'react';
import type { AccordionItemContextValue } from './types';

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);
