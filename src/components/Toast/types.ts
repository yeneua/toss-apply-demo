import * as React from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
    variant?: ToastVariant;
    duration?: number;
}

export type ToastProps = Omit<Toast, 'id'> & {
    id?: string;
    onOpenChange?: (open: boolean) => void;
};

export interface ToastActionElement {
    altText: string;
    props: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ToastContextValue {
    toasts: Toast[];
    toast: (props: Omit<Toast, 'id'>) => string;
    dismiss: (id: string) => void;
}

export interface ToastProviderProps {
    children: React.ReactNode;
    duration?: number; // Default duration for all toasts
}
