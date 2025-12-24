import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta = {
    title: 'Components/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
        onCheckedChange: { action: 'toggled' },
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultChecked: false,
        'aria-label': 'Airplane mode',
    },
};

export const Checked: Story = {
    args: {
        defaultChecked: true,
        'aria-label': 'Airplane mode',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultChecked: false,
        'aria-label': 'Disabled toggle',
    },
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        defaultChecked: true,
        'aria-label': 'Disabled checked toggle',
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Switch size="sm" aria-label="Small" />
            <Switch size="md" aria-label="Medium" defaultChecked />
            <Switch size="lg" aria-label="Large" />
        </div>
    )
};

export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <div className="flex items-center gap-2">
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                    aria-label="Controlled toggle"
                />
                <span className="text-sm font-medium">{checked ? 'On' : 'Off'}</span>
            </div>
        );
    }
};
