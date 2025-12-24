import { useModal } from './useModal';
import type { ModalTitleProps } from './types';
import { cn } from '@/utils';

export function ModalTitle({ children, className }: ModalTitleProps) {
    const { titleId } = useModal();

    return (
        <h2 id={titleId} className={cn('text-xl font-semibold text-gray-900', className)}>
            {children}
        </h2>
    );
}
