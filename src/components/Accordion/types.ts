export type AccordionType = 'single' | 'multiple';

export interface AccordionSingleProps {
    type: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
    children: React.ReactNode;
    className?: string;
}

export interface AccordionMultipleProps {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    children: React.ReactNode;
    className?: string;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
}

export interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface AccordionContextValue {
    type: AccordionType;
    value: string | string[];
    onItemToggle: (value: string) => void;
    triggerRefs: React.MutableRefObject<Map<string, HTMLButtonElement | null>>;
}

export interface AccordionItemContextValue {
    value: string;
    isExpanded: boolean;
    disabled: boolean;
    triggerId: string;
    contentId: string;
}
