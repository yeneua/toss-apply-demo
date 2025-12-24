import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

describe('Accordion', () => {
    describe('Basic rendering', () => {
        it('should render accordion items', () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
            expect(screen.getByText('Item 1')).toBeInTheDocument();
        });

        it('should not show content by default', () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('should show content for defaultValue', () => {
            render(
                <Accordion type="single" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('should render multiple items', () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });

    describe('Single selection mode', () => {
        it('should expand item when trigger is clicked', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('should collapse item when trigger is clicked again (collapsible)', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            await user.click(screen.getByText('Item 1'));
            await waitForElementToBeRemoved(() => screen.queryByText('Content 1'));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('should not collapse without collapsible option', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            await user.click(screen.getByText('Item 1'));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('should close previous item when new item is opened', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            await user.click(screen.getByText('Item 2'));

            await waitForElementToBeRemoved(() => screen.queryByText('Content 1'));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('should call onValueChange when item is toggled', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Accordion type="single" onValueChange={onValueChange}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            expect(onValueChange).toHaveBeenCalledWith('item-1');
        });
    });

    describe('Multiple selection mode', () => {
        it('should allow multiple items to be open', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            await user.click(screen.getByText('Item 2'));

            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('should toggle individual items', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="multiple" defaultValue={['item-1']}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            await waitForElementToBeRemoved(() => screen.queryByText('Content 1'));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('should call onValueChange with array', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Accordion type="multiple" onValueChange={onValueChange}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            expect(onValueChange).toHaveBeenCalledWith(['item-1']);

            await user.click(screen.getByText('Item 2'));
            expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2']);
        });
    });

    describe('Keyboard navigation', () => {
        it('should expand item with Enter key', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            screen.getByText('Item 1').focus();
            await user.keyboard('{Enter}');
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('should expand item with Space key', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            screen.getByText('Item 1').focus();
            await user.keyboard(' ');
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('should focus next trigger with ArrowDown', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger1 = screen.getByText('Item 1');
            trigger1.focus();
            await user.keyboard('{ArrowDown}');

            expect(document.activeElement).toBe(screen.getByText('Item 2'));
        });

        it('should focus previous trigger with ArrowUp', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger2 = screen.getByText('Item 2');
            trigger2.focus();
            await user.keyboard('{ArrowUp}');

            expect(document.activeElement).toBe(screen.getByText('Item 1'));
        });

        it('should wrap focus to first item from last with ArrowDown', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger2 = screen.getByText('Item 2');
            trigger2.focus();
            await user.keyboard('{ArrowDown}');

            expect(document.activeElement).toBe(screen.getByText('Item 1'));
        });
    });

    describe('ARIA attributes', () => {
        it('should have proper ARIA attributes on trigger', () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByText('Item 1');
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            expect(trigger).toHaveAttribute('aria-controls');
        });

        it('should update aria-expanded when item is opened', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            expect(screen.getByText('Item 1')).toHaveAttribute('aria-expanded', 'true');
        });

        it('should have region role on content', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            const content = screen.getByText('Content 1').closest('[role="region"]');
            expect(content).toBeInTheDocument();
        });

        it('should link trigger to content with aria-controls', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            const trigger = screen.getByText('Item 1');
            const content = screen.getByText('Content 1').closest('[role="region"]');

            expect(trigger).toHaveAttribute('aria-controls', content?.id);
        });
    });

    describe('Disabled items', () => {
        it('should not expand disabled item when clicked', async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1" disabled>
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText('Item 1'));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('should have disabled attribute on trigger', () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1" disabled>
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByText('Item 1')).toBeDisabled();
        });
    });

    describe('Controlled mode', () => {
        it('should work as controlled component (single)', async () => {
            const ControlledAccordion = () => {
                const [value, setValue] = React.useState('');
                return (
                    <>
                        <button onClick={() => setValue('item-2')}>External Control</button>
                        <Accordion type="single" value={value} onValueChange={setValue}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Item 1</AccordionTrigger>
                                <AccordionContent>Content 1</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Item 2</AccordionTrigger>
                                <AccordionContent>Content 2</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </>
                );
            };

            const user = userEvent.setup();
            render(<ControlledAccordion />);

            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

            await user.click(screen.getByText('External Control'));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('should work as controlled component (multiple)', async () => {
            const ControlledAccordion = () => {
                const [value, setValue] = React.useState<string[]>([]);
                return (
                    <>
                        <button onClick={() => setValue(['item-1', 'item-2'])}>
                            External Control
                        </button>
                        <Accordion type="multiple" value={value} onValueChange={setValue}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Item 1</AccordionTrigger>
                                <AccordionContent>Content 1</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Item 2</AccordionTrigger>
                                <AccordionContent>Content 2</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </>
                );
            };

            const user = userEvent.setup();
            render(<ControlledAccordion />);

            await user.click(screen.getByText('External Control'));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });
    });
});
