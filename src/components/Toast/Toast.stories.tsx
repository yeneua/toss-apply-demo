import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './index';

const meta: Meta = {
    title: 'Components/Toast',
    component: ToastProvider,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;

const ToastDemo = () => {
    const { toast, dismiss } = useToast();

    return (
        <div className="flex h-screen items-center justify-center space-x-4">
            <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                onClick={() =>
                    toast({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                        action: (
                            <button
                                onClick={() => alert('Undo clicked')}
                                className="rounded border border-gray-200 bg-white px-3 py-1 text-sm font-medium hover:bg-gray-100"
                            >
                                Undo
                            </button>
                        ),
                    })
                }
            >
                Default Toast
            </button>

            <button
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
                onClick={() =>
                    toast({
                        title: 'Success!',
                        description: 'Your changes have been saved.',
                        variant: 'success',
                    })
                }
            >
                Success
            </button>

            <button
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                onClick={() =>
                    toast({
                        title: 'Error Occurred',
                        description: 'There was a problem with your request.',
                        variant: 'error',
                    })
                }
            >
                Error
            </button>

            <button
                className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-600"
                onClick={() =>
                    toast({
                        title: 'Warning',
                        description: 'Please check your connection.',
                        variant: 'warning',
                    })
                }
            >
                Warning
            </button>
        </div>
    );
};

export const Default: StoryObj<typeof ToastProvider> = {
    render: () => (
        <ToastProvider>
            <ToastDemo />
        </ToastProvider>
    ),
};

export const ShortDuration: StoryObj<typeof ToastProvider> = {
    render: () => (
        <ToastProvider duration={2000}>
            <ToastDemo />
        </ToastProvider>
    ),
};
