import { createContext } from 'react';
import type { AccordionContextValue } from './types';

export const AccordionContext = createContext<AccordionContextValue | null>(null);
