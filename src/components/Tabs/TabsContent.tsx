import { useTabsContext } from './useTabsContext';
import type { TabsContentProps } from './types';
import { cn } from '@/utils';

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { activeValue } = useTabsContext();

    const panelId = `panel-${value}`;
    const tabId = `tab-${value}`;

    const isActive = activeValue === value;

    return (
        <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!isActive}
            className={cn(className)}
        >
            {isActive && children}
        </div>
    );
}
