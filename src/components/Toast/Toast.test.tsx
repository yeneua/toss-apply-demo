import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, renderHook, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

// Mock framer-motion to skip animations
vi.mock('framer-motion', () => ({
    motion: {
        li: ({ children, ...props }: any) => {
            const { layout, initial, animate, exit, onAnimationComplete, ...validProps } = props;
            return <li {...validProps}>{children}</li>;
        },
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('useToast', () => {
    it('should add toast', () => {
        const { result } = renderHook(() => useToast(), {
            wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
        });

        act(() => {
            result.current.toast({ title: 'Test Toast', description: 'Test Description' });
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].title).toBe('Test Toast');
        expect(result.current.toasts[0].description).toBe('Test Description');
    });

    it('should remove toast', () => {
        const { result } = renderHook(() => useToast(), {
            wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
        });

        let toastId = '';
        act(() => {
            toastId = result.current.toast({ title: 'Test' });
        });

        expect(result.current.toasts).toHaveLength(1);

        act(() => {
            result.current.dismiss(toastId);
        });

        expect(result.current.toasts).toHaveLength(0);
    });

    it('should allow multiple toasts', () => {
        const { result } = renderHook(() => useToast(), {
            wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
        });

        act(() => {
            result.current.toast({ title: 'Toast 1' });
            result.current.toast({ title: 'Toast 2' });
        });

        expect(result.current.toasts).toHaveLength(2);
        expect(result.current.toasts[0].title).toBe('Toast 1');
        expect(result.current.toasts[1].title).toBe('Toast 2');
    });
});

describe('Toast Rendering', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render toast message', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
            const { toast } = useToast();
            return <button onClick={() => toast({ title: 'Success', description: 'Message' })}>Show</button>;
        };

        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        await user.click(screen.getByText('Show'));
        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.getByText('Message')).toBeInTheDocument();
    });

    it('should show different variants', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
            const { toast } = useToast();
            return (
                <button
                    onClick={() =>
                        toast({ title: 'Error', variant: 'error' })
                    }
                >
                    Show Error
                </button>
            );
        };

        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        await user.click(screen.getByText('Show Error'));
        const toast = screen.getByText('Error').closest('li');
        expect(toast).toHaveClass('bg-red-50');
    });

    it('should dismiss after duration', async () => {
        vi.useFakeTimers();

        const TestComponent = () => {
            const { toast } = useToast();
            return <button onClick={() => toast({ title: 'Auto', duration: 1000 })}>Show</button>;
        };

        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show'));
        expect(screen.getByText('Auto')).toBeInTheDocument();

        // Advance time (duration + buffer)
        act(() => {
            vi.advanceTimersByTime(1100);
        });

        // Should be removed immediately since animations are mocked
        expect(screen.queryByText('Auto')).not.toBeInTheDocument();
    });

    it('should pause timer on hover', async () => {
        vi.useFakeTimers();

        const TestComponent = () => {
            const { toast } = useToast();
            return <button onClick={() => toast({ title: 'Hover', duration: 1000 })}>Show</button>;
        };

        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show'));
        const toast = screen.getByText('Hover').closest('li');

        // Hover to pause
        fireEvent.mouseEnter(toast!);

        // Advance time past duration
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        // Should still be there because it's paused
        expect(screen.getByText('Hover')).toBeInTheDocument();

        // Unhover to resume
        fireEvent.mouseLeave(toast!);

        // Advance remaining time
        act(() => {
            vi.advanceTimersByTime(1100);
        });

        expect(screen.queryByText('Hover')).not.toBeInTheDocument();
    });
});
