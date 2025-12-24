import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    ModalClose,
} from './';

const meta = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function DefaultModal() {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Open Modal
                </button>

                <Modal open={open} onOpenChange={setOpen}>
                    <ModalContent className="w-full max-w-md">
                        <ModalHeader className="flex items-center justify-between">
                            <ModalTitle>Confirm Action</ModalTitle>
                            <ModalClose />
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-600">
                                Are you sure you want to proceed with this action? This cannot be undone.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirm
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};

export const WithForm: Story = {
    render: function FormModal() {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Edit Profile
                </button>

                <Modal open={open} onOpenChange={setOpen}>
                    <ModalContent className="w-full max-w-lg">
                        <ModalHeader className="flex items-center justify-between">
                            <ModalTitle>Edit Profile</ModalTitle>
                            <ModalClose />
                        </ModalHeader>
                        <ModalBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="john@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    rows={3}
                                    defaultValue="Developer & Designer"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};

export const DeleteConfirmation: Story = {
    render: function DeleteModal() {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete Item
                </button>

                <Modal open={open} onOpenChange={setOpen}>
                    <ModalContent className="w-full max-w-md">
                        <ModalHeader className="flex items-center justify-between">
                            <ModalTitle className="text-red-600">Delete Confirmation</ModalTitle>
                            <ModalClose />
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Are you absolutely sure?
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        This action cannot be undone. This will permanently delete the item
                                        and remove all associated data.
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};

export const NoOverlayClose: Story = {
    render: function NoOverlayModal() {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Open (No Overlay Close)
                </button>

                <Modal open={open} onOpenChange={setOpen} closeOnOverlayClick={false}>
                    <ModalContent className="w-full max-w-md">
                        <ModalHeader className="flex items-center justify-between">
                            <ModalTitle>Important Notice</ModalTitle>
                            <ModalClose />
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-600">
                                This modal cannot be closed by clicking the overlay. You must use the close
                                button or the Escape key.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Close
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};

export const CustomStyling: Story = {
    render: function CustomModal() {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
                >
                    ✨ Open Styled Modal
                </button>

                <Modal open={open} onOpenChange={setOpen}>
                    <ModalContent className="w-full max-w-md bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-purple-200">
                        <ModalHeader className="flex items-center justify-between border-b-2 border-purple-200">
                            <ModalTitle className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                Beautiful Modal
                            </ModalTitle>
                            <ModalClose />
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-700">
                                This modal demonstrates custom styling with gradients and colors.
                            </p>
                        </ModalBody>
                        <ModalFooter className="border-t-2 border-purple-200">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-white border-2 border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};
