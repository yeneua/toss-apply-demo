import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { SwitchProps } from './types';

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    (
        {
            checked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            size = 'md',
            className,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            ...props
        },
        ref
    ) => {
        const isControlled = checked !== undefined;
        const [localChecked, setLocalChecked] = useState(defaultChecked);

        const isChecked = isControlled ? checked : localChecked;

        const toggle = () => {
            if (disabled) return;

            const newChecked = !isChecked;
            if (!isControlled) {
                setLocalChecked(newChecked);
            }
            onCheckedChange?.(newChecked);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        };

        const sizeStyles = {
            sm: 'w-8 h-5 p-0.5',
            md: 'w-11 h-6 p-1',
            lg: 'w-14 h-8 p-1',
        };

        const thumbSizes = {
            sm: 'w-4 h-4',
            md: 'w-4 h-4',
            lg: 'w-6 h-6',
        };

        return (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={isChecked}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                disabled={disabled}
                onClick={toggle}
                onKeyDown={handleKeyDown}
                className={cn(
                    'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                    isChecked ? 'bg-blue-600' : 'bg-gray-200',
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-90',
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                    className={cn(
                        'block rounded-full bg-white shadow-sm ring-0',
                        thumbSizes[size],
                        isChecked && size === 'sm' ? 'translate-x-3' : '',
                        isChecked && size === 'md' ? 'translate-x-5' : '',
                        isChecked && size === 'lg' ? 'translate-x-6' : '',
                        !isChecked ? 'translate-x-0' : ''
                    )}
                />
            </button>
        );
    }
);

Switch.displayName = 'Switch';
