import type { TabsListProps } from './types';
import { cn } from '@/utils';

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div role="tablist" className={cn('flex gap-2', className)}>
            {children}
        </div>
    );
}
