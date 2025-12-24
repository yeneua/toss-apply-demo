import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Modal } from './Modal';
import { ModalContent } from './ModalContent';
import { ModalTitle } from './ModalTitle';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalClose } from './ModalClose';

describe('Modal', () => {
    beforeEach(() => {
        // Create portal container
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');
        document.body.appendChild(portalRoot);
    });

    afterEach(() => {
        // Cleanup
        const portalRoot = document.getElementById('portal-root');
        if (portalRoot) {
            document.body.removeChild(portalRoot);
        }
        document.body.style.overflow = '';
    });

    describe('Basic rendering', () => {
        it('should not render when closed', () => {
            render(
                <Modal open={false}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('should render in portal when open', () => {
            render(
                <Modal open={true}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('should render overlay', () => {
            render(
                <Modal open={true}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );
            const overlay = document.querySelector('[data-modal-overlay]');
            expect(overlay).toBeInTheDocument();
        });

        it('should render content', () => {
            render(
                <Modal open={true}>
                    <ModalContent>Test Content</ModalContent>
                </Modal>
            );
            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });
    });

    describe('Keyboard interactions', () => {
        it('should close modal when Escape is pressed', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            await user.keyboard('{Escape}');
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        it('should not close when Escape is pressed if closeOnEscape is false', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange} closeOnEscape={false}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            await user.keyboard('{Escape}');
            expect(onOpenChange).not.toHaveBeenCalled();
        });
    });

    describe('Overlay interactions', () => {
        it('should close modal when overlay is clicked', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            const overlay = document.querySelector('[data-modal-overlay]');
            if (overlay) {
                await user.click(overlay as HTMLElement);
            }
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        it('should not close when overlay clicked if closeOnOverlayClick is false', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange} closeOnOverlayClick={false}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            const overlay = document.querySelector('[data-modal-overlay]');
            if (overlay) {
                await user.click(overlay as HTMLElement);
            }
            expect(onOpenChange).not.toHaveBeenCalled();
        });

        it('should not close when content is clicked', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            await user.click(screen.getByText('Content'));
            expect(onOpenChange).not.toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', async () => {
            render(
                <Modal open={true}>
                    <ModalContent>
                        <ModalTitle>Dialog Title</ModalTitle>
                        <div>Content</div>
                    </ModalContent>
                </Modal>
            );

            await waitFor(() => {
                const dialog = screen.getByRole('dialog');
                expect(dialog).toHaveAttribute('aria-modal', 'true');
                expect(dialog).toHaveAttribute('aria-labelledby');
            });
        });

        it('should link title with aria-labelledby', () => {
            render(
                <Modal open={true}>
                    <ModalContent>
                        <ModalTitle>My Dialog</ModalTitle>
                    </ModalContent>
                </Modal>
            );

            const dialog = screen.getByRole('dialog');
            const title = screen.getByText('My Dialog');

            expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
            expect(title.id).toBeTruthy();
        });

        it('should prevent body scroll when open', () => {
            render(
                <Modal open={true}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );
            expect(document.body.style.overflow).toBe('hidden');
        });

        it('should restore body scroll when closed', () => {
            const { rerender } = render(
                <Modal open={true}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );

            rerender(
                <Modal open={false}>
                    <ModalContent>Content</ModalContent>
                </Modal>
            );
            expect(document.body.style.overflow).not.toBe('hidden');
        });
    });

    describe('Compound components', () => {
        it('should render header, body, and footer', () => {
            render(
                <Modal open={true}>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Title</ModalTitle>
                        </ModalHeader>
                        <ModalBody>Body content</ModalBody>
                        <ModalFooter>Footer content</ModalFooter>
                    </ModalContent>
                </Modal>
            );

            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Body content')).toBeInTheDocument();
            expect(screen.getByText('Footer content')).toBeInTheDocument();
        });

        it('should render close button', () => {
            const onOpenChange = vi.fn();

            render(
                <Modal open={true} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalClose />
                    </ModalContent>
                </Modal>
            );

            const closeButton = screen.getByRole('button', { name: /close/i });
            expect(closeButton).toBeInTheDocument();
        });

        it('should close modal when close button is clicked', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Modal open={true} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalClose />
                    </ModalContent>
                </Modal>
            );

            const closeButton = screen.getByRole('button', { name: /close/i });
            await user.click(closeButton);
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe('Controlled behavior', () => {
        it('should work as controlled component', async () => {
            const ControlledModal = () => {
                const [open, setOpen] = React.useState(false);
                return (
                    <>
                        <button onClick={() => setOpen(true)}>Open</button>
                        <Modal open={open} onOpenChange={setOpen}>
                            <ModalContent>
                                <button onClick={() => setOpen(false)}>Close</button>
                            </ModalContent>
                        </Modal>
                    </>
                );
            };

            const user = userEvent.setup();
            render(<ControlledModal />);

            // Initially closed
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            // Open modal
            await user.click(screen.getByText('Open'));
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            // Close modal
            await user.click(screen.getByText('Close'));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });
});
