import type { ModalFooterProps } from './types';
import { cn } from '@/utils';

export function ModalFooter({ children, className }: ModalFooterProps) {
    return (
        <div className={cn('px-6 py-4 border-t border-gray-200 flex justify-end gap-3', className)}>
            {children}
        </div>
    );
}
