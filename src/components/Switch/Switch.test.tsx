import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
    it('should render with default props', () => {
        render(<Switch />);
        const switchRoles = screen.getByRole('switch');
        expect(switchRoles).toBeInTheDocument();
        expect(switchRoles).toHaveAttribute('aria-checked', 'false');
    });

    it('should toggle state when clicked (uncontrolled)', async () => {
        const user = userEvent.setup();
        render(<Switch />);
        const switchButton = screen.getByRole('switch');

        await user.click(switchButton);
        expect(switchButton).toHaveAttribute('aria-checked', 'true');

        await user.click(switchButton);
        expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('should respect controlled state', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        const { rerender } = render(
            <Switch checked={false} onCheckedChange={handleChange} />
        );

        const switchButton = screen.getByRole('switch');
        expect(switchButton).toHaveAttribute('aria-checked', 'false');

        await user.click(switchButton);
        expect(handleChange).toHaveBeenCalledWith(true);
        // Should not change internal state if controlled
        expect(switchButton).toHaveAttribute('aria-checked', 'false');

        rerender(<Switch checked={true} onCheckedChange={handleChange} />);
        expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });

    it('should support keyboard interaction (Enter/Space)', async () => {
        const user = userEvent.setup();
        render(<Switch />);
        const switchButton = screen.getByRole('switch');

        switchButton.focus();
        await user.keyboard('{Enter}');
        expect(switchButton).toHaveAttribute('aria-checked', 'true');

        await user.keyboard(' ');
        expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('should not toggle when disabled', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Switch disabled onCheckedChange={handleChange} />);
        const switchButton = screen.getByRole('switch');

        expect(switchButton).toBeDisabled();
        await user.click(switchButton);

        expect(handleChange).not.toHaveBeenCalled();
        expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });
});
