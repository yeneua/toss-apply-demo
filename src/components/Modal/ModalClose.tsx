import { useModal } from './useModal';
import type { ModalCloseProps } from './types';
import { cn } from '@/utils';

export function ModalClose({ className, children }: ModalCloseProps) {
    const { onClose } = useModal();

    return (
        <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={cn(
                'text-gray-400 hover:text-gray-600 transition-colors',
                className
            )}
        >
            {children || (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            )}
        </button>
    );
}
