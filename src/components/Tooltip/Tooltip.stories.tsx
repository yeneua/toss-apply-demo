import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

const meta = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        delayDuration: { control: 'number' },
        defaultOpen: { control: 'boolean' },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger className="bg-slate-800 text-white px-4 py-2 rounded">
                Hover me
            </TooltipTrigger>
            <TooltipContent>
                Basic Tooltip
            </TooltipContent>
        </Tooltip>
    ),
};

export const Positions: Story = {
    render: () => (
        <div className="flex gap-4">
            <Tooltip>
                <TooltipTrigger className="bg-slate-800 text-white px-4 py-2 rounded">Top</TooltipTrigger>
                <TooltipContent side="top">Top Content</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className="bg-slate-800 text-white px-4 py-2 rounded">Bottom</TooltipTrigger>
                <TooltipContent side="bottom">Bottom Content</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className="bg-slate-800 text-white px-4 py-2 rounded">Left</TooltipTrigger>
                <TooltipContent side="left">Left Content</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className="bg-slate-800 text-white px-4 py-2 rounded">Right</TooltipTrigger>
                <TooltipContent side="right">Right Content</TooltipContent>
            </Tooltip>
        </div>
    ),
};
