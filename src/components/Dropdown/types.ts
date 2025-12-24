export interface DropdownContextValue {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
    selectedValue: string | null;
    selectItem: (value: string) => void;
    triggerId: string;
    menuId: string;
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    menuItemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

export interface DropdownProps {
    children: React.ReactNode;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

export interface DropdownTriggerProps {
    children: React.ReactNode;
    className?: string;
}

export interface DropdownMenuProps {
    children: React.ReactNode;
    className?: string;
}

export interface DropdownItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
