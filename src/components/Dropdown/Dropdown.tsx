import { useState, useRef, useId, useCallback, useEffect } from 'react';
import { DropdownContext } from './DropdownContext';
import type { DropdownProps } from './types';

export function Dropdown({ children, defaultValue, value: controlledValue, onValueChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const menuItemRefs = useRef<(HTMLElement | null)[]>([]);

    const triggerId = useId();
    const menuId = useId();

    // Controlled vs uncontrolled value
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        setFocusedIndex(-1);
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

    // Reset focused index when menu closes
    useEffect(() => {
        if (!isOpen) {
            setFocusedIndex(-1);
        }
    }, [isOpen]);

    const contextValue = {
        isOpen,
        toggleMenu,
        closeMenu,
        selectedValue,
        selectItem,
        triggerId,
        menuId,
        focusedIndex,
        setFocusedIndex,
        menuItemRefs,
    };

    return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
}
