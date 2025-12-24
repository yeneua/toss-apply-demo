import { useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalContext } from './ModalContext';
import type { ModalProps } from './types';

export function Modal({
    open,
    onOpenChange,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    children,
}: ModalProps) {
    const titleId = useId();
    const contentId = useId();

    const onClose = useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    // Handle Escape key
    useEffect(() => {
        if (!open || !closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll
    useEffect(() => {
        if (open) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [open]);

    const contextValue = {
        open,
        onClose,
        titleId,
        contentId,
    };

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const modalContent = (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    data-modal-overlay
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleContentClick}
                    >
                        <ModalContext.Provider value={contextValue}>
                            {children}
                        </ModalContext.Provider>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
