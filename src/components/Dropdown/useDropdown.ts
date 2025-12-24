import { useContext } from 'react';
import { DropdownContext } from './DropdownContext';

export function useDropdown() {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('useDropdown must be used within a Dropdown component');
    }

    return context;
}
