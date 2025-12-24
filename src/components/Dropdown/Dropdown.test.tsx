import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';

describe('Dropdown', () => {
    describe('Basic rendering', () => {
        it('should render trigger button', () => {
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                </Dropdown>
            );
            expect(screen.getByRole('button')).toHaveTextContent('Select');
        });

        it('should not show menu by default', () => {
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('should render multiple items in menu', () => {
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            // Menu should be closed initially
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });
    });

    describe('Click interactions', () => {
        it('should open menu when trigger is clicked', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('should close menu when trigger is clicked again', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByRole('button'));
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('should close menu when item is selected', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('should call onValueChange when item is selected', async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();

            render(
                <Dropdown onValueChange={onValueChange}>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));

            expect(onValueChange).toHaveBeenCalledWith('1');
        });
    });

    describe('Keyboard navigation', () => {
        it('should open menu when Enter is pressed on trigger', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            screen.getByRole('button').focus();
            await user.keyboard('{Enter}');
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('should open menu when Space is pressed on trigger', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            screen.getByRole('button').focus();
            await user.keyboard(' ');
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('should close menu when Escape is pressed', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.keyboard('{Escape}');
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('should navigate items with ArrowDown', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const menu = screen.getByRole('menu');
            await user.keyboard('{ArrowDown}');
            const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
            expect(menu).toHaveAttribute('aria-activedescendant', item1.id);

            await user.keyboard('{ArrowDown}');
            const item2 = screen.getByRole('menuitem', { name: 'Item 2' });
            expect(menu).toHaveAttribute('aria-activedescendant', item2.id);
        });

        it('should navigate items with ArrowUp', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const menu = screen.getByRole('menu');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowUp}');
            const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
            expect(menu).toHaveAttribute('aria-activedescendant', item1.id);
        });

        it('should wrap focus to last item when ArrowUp is pressed on first item', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const menu = screen.getByRole('menu');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowUp}');
            const item3 = screen.getByRole('menuitem', { name: 'Item 3' });
            expect(menu).toHaveAttribute('aria-activedescendant', item3.id);
        });

        it('should wrap focus to first item when ArrowDown is pressed on last item', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const menu = screen.getByRole('menu');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');
            const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
            expect(menu).toHaveAttribute('aria-activedescendant', item1.id);
        });

        it('should select item when Enter is pressed on focused item', async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();

            render(
                <Dropdown onValueChange={onValueChange}>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Enter}');

            expect(onValueChange).toHaveBeenCalledWith('1');
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });
    });

    describe('ARIA attributes', () => {
        it('should have proper ARIA attributes on trigger', () => {
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            const trigger = screen.getByRole('button');
            expect(trigger).toHaveAttribute('aria-haspopup', 'true');
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('should update aria-expanded when menu opens', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            const trigger = screen.getByRole('button');
            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('should have aria-controls linking trigger to menu', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const trigger = screen.getByRole('button');
            const menu = screen.getByRole('menu');

            expect(trigger).toHaveAttribute('aria-controls');
            expect(menu).toHaveAttribute('id', trigger.getAttribute('aria-controls'));
        });

        it('should have role="menu" on menu container', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('should have role="menuitem" on each item', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2">Item 2</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            expect(screen.getAllByRole('menuitem')).toHaveLength(2);
        });
    });

    describe('Disabled items', () => {
        it('should not select disabled item when clicked', async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();

            render(
                <Dropdown onValueChange={onValueChange}>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1" disabled>
                            Item 1
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));

            expect(onValueChange).not.toHaveBeenCalled();
        });

        it('should skip disabled items when navigating with keyboard', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1">Item 1</DropdownItem>
                        <DropdownItem value="2" disabled>
                            Item 2
                        </DropdownItem>
                        <DropdownItem value="3">Item 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const menu = screen.getByRole('menu');
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const item3 = screen.getByRole('menuitem', { name: 'Item 3' });
            expect(menu).toHaveAttribute('aria-activedescendant', item3.id);
        });

        it('should have aria-disabled on disabled items', async () => {
            const user = userEvent.setup();
            render(
                <Dropdown>
                    <DropdownTrigger>Select</DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem value="1" disabled>
                            Item 1
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByRole('button'));
            const item = screen.getByRole('menuitem', { name: 'Item 1' });
            expect(item).toHaveAttribute('aria-disabled', 'true');
        });
    });
});
