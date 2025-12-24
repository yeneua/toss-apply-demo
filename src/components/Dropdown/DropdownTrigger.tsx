import { useDropdown } from './useDropdown';
import type { DropdownTriggerProps } from './types';
import { cn } from '@/utils';

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
    const { isOpen, openMenu, closeMenu, triggerId, menuId } = useDropdown();

    const handleClick = () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    return (
        <button
            id={triggerId}
            type="button"
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls={menuId}
            className={cn(className)}
        >
            {children}
        </button>
    );
}
