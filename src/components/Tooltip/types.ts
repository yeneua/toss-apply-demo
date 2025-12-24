import { ReactNode } from 'react';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';


export interface TooltipProps {
    children: ReactNode;
    /** Open delay in ms. Default 200ms */
    delayDuration?: number;
    /** Controlled open state */
    open?: boolean;
    /** Default open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
}

export interface TooltipTriggerProps {
    children: ReactNode;
    asChild?: boolean;
    className?: string;
}

export interface TooltipContentProps {
    children: ReactNode;
    /** Side to render the tooltip. Default 'top' */
    side?: TooltipSide;
    /** Offset from the trigger. Default 4 */
    sideOffset?: number;
    className?: string;
}

export interface TooltipContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    triggerId: string;
    contentId: string;
}
