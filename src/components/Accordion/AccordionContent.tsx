import { motion, AnimatePresence } from 'framer-motion';
import { useAccordionItem } from './useAccordionItem';
import type { AccordionContentProps } from './types';
import { cn } from '@/utils';

export function AccordionContent({ children, className }: AccordionContentProps) {
    const { isExpanded, triggerId, contentId } = useAccordionItem();

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={cn('overflow-hidden', className)}
                >
                    <div className="pb-4 pt-0">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
