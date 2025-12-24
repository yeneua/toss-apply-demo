import { useEffect, useRef } from 'react';
import { useDropdown } from './useDropdown';
import type { DropdownMenuProps } from './types';
import { cn } from '@/utils';

export function DropdownMenu({ children, className }: DropdownMenuProps) {
    const { isOpen, closeMenu, menuId, focusedIndex, setFocusedIndex, menuItemRefs } = useDropdown();
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            const items = menuItemRefs.current.filter((item) => item !== null);
            const enabledItems = items.filter((item) => item?.getAttribute('aria-disabled') !== 'true');

            switch (event.key) {
                case 'Escape':
                    event.preventDefault();
                    closeMenu();
                    break;

                case 'ArrowDown': {
                    event.preventDefault();

                    // If no item is focused, focus the first enabled item
                    if (focusedIndex === -1) {
                        const firstEnabledItem = enabledItems[0];
                        if (firstEnabledItem) {
                            const firstIndex = items.indexOf(firstEnabledItem);
                            setFocusedIndex(firstIndex);
                            firstEnabledItem.focus();
                        }
                        return;
                    }

                    // Find current position in enabled items array
                    const currentItem = items[focusedIndex];
                    const currentEnabledIndex = enabledItems.indexOf(currentItem!);

                    if (currentEnabledIndex === -1) {
                        // Current item is disabled or not found, focus first enabled item
                        const firstEnabledItem = enabledItems[0];
                        if (firstEnabledItem) {
                            const firstIndex = items.indexOf(firstEnabledItem);
                            setFocusedIndex(firstIndex);
                            firstEnabledItem.focus();
                        }
                        return;
                    }

                    const nextIndex = currentEnabledIndex + 1;

                    if (nextIndex >= enabledItems.length) {
                        // Wrap to first item
                        const firstEnabledItem = enabledItems[0];
                        if (firstEnabledItem) {
                            const firstIndex = items.indexOf(firstEnabledItem);
                            setFocusedIndex(firstIndex);
                            firstEnabledItem.focus();
                        }
                    } else {
                        const nextEnabledItem = enabledItems[nextIndex];
                        if (nextEnabledItem) {
                            const nextItemIndex = items.indexOf(nextEnabledItem);
                            setFocusedIndex(nextItemIndex);
                            nextEnabledItem.focus();
                        }
                    }
                    break;
                }

                case 'ArrowUp': {
                    event.preventDefault();

                    // If no item is focused, focus the last enabled item
                    if (focusedIndex === -1) {
                        const lastEnabledItem = enabledItems[enabledItems.length - 1];
                        if (lastEnabledItem) {
                            const lastIndex = items.indexOf(lastEnabledItem);
                            setFocusedIndex(lastIndex);
                            lastEnabledItem.focus();
                        }
                        return;
                    }

                    // Find current position in enabled items array
                    const currentItem = items[focusedIndex];
                    const currentEnabledIndex = enabledItems.indexOf(currentItem!);

                    if (currentEnabledIndex === -1) {
                        // Current item is disabled or not found, focus last enabled item
                        const lastEnabledItem = enabledItems[enabledItems.length - 1];
                        if (lastEnabledItem) {
                            const lastIndex = items.indexOf(lastEnabledItem);
                            setFocusedIndex(lastIndex);
                            lastEnabledItem.focus();
                        }
                        return;
                    }

                    const prevIndex = currentEnabledIndex - 1;

                    if (prevIndex < 0) {
                        // Wrap to last item
                        const lastEnabledItem = enabledItems[enabledItems.length - 1];
                        if (lastEnabledItem) {
                            const lastIndex = items.indexOf(lastEnabledItem);
                            setFocusedIndex(lastIndex);
                            lastEnabledItem.focus();
                        }
                    } else {
                        const prevEnabledItem = enabledItems[prevIndex];
                        if (prevEnabledItem) {
                            const prevItemIndex = items.indexOf(prevEnabledItem);
                            setFocusedIndex(prevItemIndex);
                            prevEnabledItem.focus();
                        }
                    }
                    break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, focusedIndex, closeMenu, setFocusedIndex, menuItemRefs]);

    // Reset refs array
    useEffect(() => {
        if (isOpen) {
            menuItemRefs.current = [];
        }
    }, [isOpen, menuItemRefs]);

    if (!isOpen) return null;

    return (
        <div ref={menuRef} id={menuId} role="menu" className={cn(className)}>
            {children}
        </div>
    );
}
