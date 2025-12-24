export interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

export interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export interface TabsContextValue {
    activeValue: string;
    onValueChange: (value: string) => void;
    triggerRefs: React.MutableRefObject<Map<string, HTMLButtonElement | null>>;
}
