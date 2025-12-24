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

export interface DropdownContextValue {
    isOpen: boolean;
    selectedValue: string | null;
    openMenu: () => void;
    closeMenu: () => void;
    selectItem: (value: string) => void;
    triggerId: string;
    menuId: string;
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    menuItemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    activeItemId: string | null;
    setActiveItemId: (id: string | null) => void;
}
