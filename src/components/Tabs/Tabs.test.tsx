import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Tabs } from './Tabs';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TabsContent } from './TabsContent';

describe('Tabs', () => {
    describe('Basic rendering', () => {
        it('should render tabs list and triggers', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                </Tabs>
            );
            expect(screen.getByRole('tablist')).toBeInTheDocument();
            expect(screen.getAllByRole('tab')).toHaveLength(2);
        });

        it('should show content for active tab', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        });

        it('should render multiple tabs', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );
            expect(screen.getAllByRole('tab')).toHaveLength(3);
        });
    });

    describe('Click interactions', () => {
        it('should change active tab when trigger is clicked', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            await user.click(screen.getByText('Tab 2'));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('should call onValueChange when tab changes', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Tabs defaultValue="tab1" onValueChange={onValueChange}>
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            await user.click(screen.getByText('Tab 2'));
            expect(onValueChange).toHaveBeenCalledWith('tab2');
        });

        it('should not change tab when disabled trigger is clicked', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" disabled>
                            Tab 2
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            await user.click(screen.getByText('Tab 2'));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        });
    });

    describe('Keyboard navigation', () => {
        it('should navigate to next tab with ArrowRight', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                    <TabsContent value="tab3">Content 3</TabsContent>
                </Tabs>
            );

            const tab1 = screen.getByText('Tab 1');
            tab1.focus();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByText('Tab 2')).toHaveFocus();
            expect(screen.getByText('Content 2')).toBeVisible();
        });

        it('should navigate to previous tab with ArrowLeft', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab2">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            const tab2 = screen.getByText('Tab 2');
            tab2.focus();
            await user.keyboard('{ArrowLeft}');

            expect(screen.getByText('Tab 1')).toHaveFocus();
            expect(screen.getByText('Content 1')).toBeVisible();
        });

        it('should wrap to first tab when ArrowRight on last tab', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab3">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            const tab3 = screen.getByText('Tab 3');
            tab3.focus();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByText('Tab 1')).toHaveFocus();
        });

        it('should wrap to last tab when ArrowLeft on first tab', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            const tab1 = screen.getByText('Tab 1');
            tab1.focus();
            await user.keyboard('{ArrowLeft}');

            expect(screen.getByText('Tab 3')).toHaveFocus();
        });

        it('should go to first tab with Home key', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab3">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            const tab3 = screen.getByText('Tab 3');
            tab3.focus();
            await user.keyboard('{Home}');

            expect(screen.getByText('Tab 1')).toHaveFocus();
        });

        it('should go to last tab with End key', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            const tab1 = screen.getByText('Tab 1');
            tab1.focus();
            await user.keyboard('{End}');

            expect(screen.getByText('Tab 3')).toHaveFocus();
        });

        it('should skip disabled tabs when navigating', async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" disabled>
                            Tab 2
                        </TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            const tab1 = screen.getByText('Tab 1');
            tab1.focus();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByText('Tab 3')).toHaveFocus();
        });
    });

    describe('ARIA attributes', () => {
        it('should have proper ARIA attributes on tablist', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            expect(screen.getByRole('tablist')).toBeInTheDocument();
        });

        it('should have aria-selected on active tab', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');
        });

        it('should link tab to tabpanel with aria-controls', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                </Tabs>
            );

            const tab = screen.getByText('Tab 1');
            const panel = screen.getByRole('tabpanel');

            expect(tab).toHaveAttribute('aria-controls');
            expect(panel).toHaveAttribute('id', tab.getAttribute('aria-controls'));
        });

        it('should have aria-labelledby on tabpanel', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                </Tabs>
            );

            const tab = screen.getByText('Tab 1');
            const panel = screen.getByRole('tabpanel');

            expect(panel).toHaveAttribute('aria-labelledby', tab.id);
        });

        it('should have tabindex 0 on active tab and -1 on inactive tabs', () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                </Tabs>
            );

            expect(screen.getByText('Tab 1')).toHaveAttribute('tabindex', '0');
            expect(screen.getByText('Tab 2')).toHaveAttribute('tabindex', '-1');
        });
    });

    describe('Controlled mode', () => {
        it('should work as controlled component', async () => {
            const ControlledTabs = () => {
                const [value, setValue] = React.useState('tab1');
                return (
                    <>
                        <button onClick={() => setValue('tab2')}>External Control</button>
                        <Tabs value={value} onValueChange={setValue}>
                            <TabsList>
                                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                            </TabsList>
                            <TabsContent value="tab1">Content 1</TabsContent>
                            <TabsContent value="tab2">Content 2</TabsContent>
                        </Tabs>
                    </>
                );
            };

            const user = userEvent.setup();
            render(<ControlledTabs />);

            expect(screen.getByText('Content 1')).toBeVisible();

            await user.click(screen.getByText('External Control'));
            expect(screen.getByText('Content 2')).toBeVisible();
        });
    });
});
