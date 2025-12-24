import { AnimatePresence } from 'framer-motion';
import { useToast } from './useToast';
import { Toast } from './Toast';

export function ToastViewport() {
    const { toasts } = useToast();

    return (
        <div
            className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
            role="region"
            aria-label="Notifications"
        >
            <ul className="m-0 list-none p-0 space-y-4">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}
