import { useState, useCallback, useMemo } from 'react';
import { ToastContext } from './ToastContext';
import { ToastViewport } from './ToastViewport';
import type { ToastProviderProps, Toast } from './types';

export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(
        ({ ...props }: Omit<Toast, 'id'>) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast: Toast = {
                id,
                duration,
                ...props,
            };

            setToasts((prev) => [...prev, newToast]);
            return id;
        },
        [duration]
    );

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const contextValue = useMemo(
        () => ({
            toasts,
            toast,
            dismiss,
        }),
        [toasts, toast, dismiss]
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastViewport />
        </ToastContext.Provider>
    );
}
