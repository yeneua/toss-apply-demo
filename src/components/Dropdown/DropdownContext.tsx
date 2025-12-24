import { createContext } from 'react';
import type { DropdownContextValue } from './types';

export const DropdownContext = createContext<DropdownContextValue | null>(null);
