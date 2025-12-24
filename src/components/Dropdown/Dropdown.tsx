import { useState, useRef, useId, useCallback } from 'react';
import { DropdownContext } from './DropdownContext';
import type { DropdownProps } from './types';

export function Dropdown({ children, defaultValue, value: controlledValue, onValueChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue || null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const triggerId = useId();
    const menuId = useId();

    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

    const openMenu = useCallback(() => {
        setIsOpen(true);
        setFocusedIndex(-1);
        setActiveItemId(null);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        setFocusedIndex(-1);
        setActiveItemId(null);
    }, []);

    const selectItem = useCallback(
        (value: string) => {
            if (controlledValue === undefined) {
                setInternalValue(value);
            }
            onValueChange?.(value);
            closeMenu();
        },
        [controlledValue, onValueChange, closeMenu]
    );

    const contextValue = {
        isOpen,
        selectedValue,
        openMenu,
        closeMenu,
        selectItem,
        triggerId,
        menuId,
        focusedIndex,
        setFocusedIndex,
        menuItemRefs,
        activeItemId,
        setActiveItemId,
    };

    return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
}
