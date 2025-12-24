import { useEffect, useRef } from 'react';
import { useDropdown } from './useDropdown';
import type { DropdownMenuProps } from './types';
import { cn } from '@/utils';

export function DropdownMenu({ children, className }: DropdownMenuProps) {
    const { isOpen, closeMenu, menuId, focusedIndex, setFocusedIndex, menuItemRefs, activeItemId, setActiveItemId } = useDropdown();
    const menuRef = useRef<HTMLDivElement>(null);

    // Focus menu when it opens for keyboard navigation
    useEffect(() => {
        if (isOpen && menuRef.current) {
            menuRef.current.focus();
        }
    }, [isOpen]);

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
                            setActiveItemId(firstEnabledItem.id);
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
                            setActiveItemId(firstEnabledItem.id);
                        }
                        return;
                    }

                    // Move to next enabled item (wrap to first if at end)
                    const nextEnabledIndex = (currentEnabledIndex + 1) % enabledItems.length;
                    const nextEnabledItem = enabledItems[nextEnabledIndex];
                    if (nextEnabledItem) {
                        const nextIndex = items.indexOf(nextEnabledItem);
                        setFocusedIndex(nextIndex);
                        setActiveItemId(nextEnabledItem.id);
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
                            setActiveItemId(lastEnabledItem.id);
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
                            setActiveItemId(lastEnabledItem.id);
                        }
                        return;
                    }

                    // Move to previous enabled item (wrap to last if at start)
                    const prevEnabledIndex =
                        currentEnabledIndex === 0 ? enabledItems.length - 1 : currentEnabledIndex - 1;
                    const prevEnabledItem = enabledItems[prevEnabledIndex];
                    if (prevEnabledItem) {
                        const prevIndex = items.indexOf(prevEnabledItem);
                        setFocusedIndex(prevIndex);
                        setActiveItemId(prevEnabledItem.id);
                    }
                    break;
                }

                case 'Enter':
                case ' ': {
                    event.preventDefault();
                    if (focusedIndex >= 0) {
                        const activeItem = items[focusedIndex];
                        if (activeItem && activeItem.getAttribute('aria-disabled') !== 'true') {
                            activeItem.click();
                        }
                    }
                    break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, focusedIndex, setFocusedIndex, closeMenu, menuItemRefs, setActiveItemId]);

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            id={menuId}
            role="menu"
            tabIndex={-1}
            aria-activedescendant={activeItemId || undefined}
            className={cn(className)}
        >
            {children}
        </div>
    );
}
