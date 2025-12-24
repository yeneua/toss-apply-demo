import type { ModalHeaderProps } from './types';
import { cn } from '@/utils';

export function ModalHeader({ children, className }: ModalHeaderProps) {
    return (
        <div className={cn('px-6 py-4 border-b border-gray-200', className)}>
            {children}
        </div>
    );
}
