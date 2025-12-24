import { useModal } from './useModal';
import type { ModalContentProps } from './types';
import { cn } from '@/utils';

export function ModalContent({ children, className }: ModalContentProps) {
    const { titleId, contentId } = useModal();

    return (
        <div
            id={contentId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
                'relative bg-white rounded-lg shadow-xl',
                className
            )}
        >
            {children}
        </div>
    );
}
