import { useDropdown } from './useDropdown';
import type { DropdownTriggerProps } from './types';
import { cn } from '@/utils';

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
    const { isOpen, toggleMenu, triggerId, menuId } = useDropdown();

    return (
        <button
            id={triggerId}
            type="button"
            onClick={toggleMenu}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls={menuId}
            className={cn(className)}
        >
            {children}
        </button>
    );
}
