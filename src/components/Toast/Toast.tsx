import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from './useToast';
import type { Toast as ToastType } from './types';
import { cn } from '@/utils';

const variantStyles = {
    default: 'bg-white border-gray-200 text-gray-900',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
};

export function Toast({ id, title, description, action, variant = 'default', duration = 5000 }: ToastType) {
    const { dismiss } = useToast();
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
    const startTimeRef = useRef<number>(0);
    const remainingTimeRef = useRef<number>(duration);

    useEffect(() => {
        if (!paused) {
            startTimeRef.current = Date.now();
            timerRef.current = setTimeout(() => {
                dismiss(id);
            }, remainingTimeRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [id, dismiss, paused]);

    const handleMouseEnter = () => {
        setPaused(true);
        if (startTimeRef.current) {
            remainingTimeRef.current -= Date.now() - startTimeRef.current;
        }
    };

    const handleMouseLeave = () => {
        setPaused(false);
    };

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
                variantStyles[variant]
            )}
        >
            <div className="grid gap-1">
                {title && <div className="text-sm font-semibold">{title}</div>}
                {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
            {action}
            <button
                onClick={() => dismiss(id)}
                className={cn(
                    'absolute right-2 top-2 rounded-md p-1 align-top text-gray-400 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 group-hover:opacity-100',
                    variant !== 'default' && 'text-current opacity-50 hover:text-current'
                )}
            >
                <span className="sr-only">Close</span>
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
                    className="h-4 w-4"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </motion.li>
    );
}
