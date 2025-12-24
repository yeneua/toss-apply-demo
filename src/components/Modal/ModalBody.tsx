import type { ModalBodyProps } from './types';
import { cn } from '@/utils';

export function ModalBody({ children, className }: ModalBodyProps) {
    return (
        <div className={cn('px-6 py-4', className)}>
            {children}
        </div>
    );
}
