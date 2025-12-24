import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

describe('Tooltip', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should not render content by default', () => {
        render(
            <Tooltip>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        );

        expect(screen.getByText('Hover me')).toBeInTheDocument();
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    });

    it('should show content on hover after delay', async () => {
        // userEvent setup not needed if just using fireEvent for timers manually, 
        // but let's keep it if we want to switch to real user interactions later.
        // For now, removing unused warning.

        render(
            <Tooltip delayDuration={200}>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        );

        const trigger = screen.getByText('Hover me');

        // Hover
        fireEvent.mouseEnter(trigger);

        // Should not be visible immediately
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });

    it('should close on mouse leave', async () => {
        render(
            <Tooltip delayDuration={0}>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        );

        const trigger = screen.getByText('Hover me');

        fireEvent.mouseEnter(trigger);
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();

        fireEvent.mouseLeave(trigger);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should show on focus', () => {
        render(
            <Tooltip>
                <TooltipTrigger>Focus me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        );

        const trigger = screen.getByText('Focus me');
        fireEvent.focus(trigger);

        // Focus should show immediately or follow delay (design choice, usually immediate or short delay)
        act(() => {
            vi.runAllTimers();
        });

        expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('should have correct accessibility attributes', () => {
        render(
            <Tooltip delayDuration={0} defaultOpen>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        );

        const trigger = screen.getByText('Hover me');
        const content = screen.getByRole('tooltip');

        expect(content).toHaveAttribute('id');
        const contentId = content.getAttribute('id');

        expect(trigger).toHaveAttribute('aria-describedby', contentId);
    });
});
