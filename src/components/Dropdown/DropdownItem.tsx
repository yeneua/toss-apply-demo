import { useLayoutEffect, useRef } from 'react';
import { useDropdown } from './useDropdown';
import type { DropdownItemProps } from './types';
import { cn } from '@/utils';

export function DropdownItem({ value, children, className, disabled = false }: DropdownItemProps) {
    const { selectItem, menuItemRefs } = useDropdown();
    const itemRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<number>(-1);

    // Register this item in the refs array
    useLayoutEffect(() => {
        if (itemRef.current) {
            indexRef.current = menuItemRefs.current.length;
            menuItemRefs.current.push(itemRef.current);
        }
    }, [menuItemRefs]);

    const handleClick = () => {
        if (disabled) return;
        selectItem(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectItem(value);
        }
    };

    return (
        <div
            ref={itemRef}
            role="menuitem"
            tabIndex={-1}
            aria-disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(className)}
        >
            {children}
        </div>
    );
}
