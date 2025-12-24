import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './';

const meta = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Dropdown>
            <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Select an option
            </DropdownTrigger>
            <DropdownMenu className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
                <DropdownItem
                    value="1"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    Option 1
                </DropdownItem>
                <DropdownItem
                    value="2"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    Option 2
                </DropdownItem>
                <DropdownItem
                    value="3"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    Option 3
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    ),
};

export const WithDisabledItems: Story = {
    render: () => (
        <Dropdown>
            <DropdownTrigger className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Choose action
            </DropdownTrigger>
            <DropdownMenu className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
                <DropdownItem
                    value="edit"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    ✏️ Edit
                </DropdownItem>
                <DropdownItem
                    value="duplicate"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    📋 Duplicate
                </DropdownItem>
                <DropdownItem
                    value="archive"
                    disabled
                    className="px-4 py-2 opacity-50 cursor-not-allowed"
                >
                    🗄️ Archive (disabled)
                </DropdownItem>
                <DropdownItem
                    value="delete"
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
                >
                    🗑️ Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    ),
};

export const Controlled: Story = {
    render: function ControlledDropdown() {
        const [selectedValue, setSelectedValue] = React.useState<string>('');

        return (
            <div className="space-y-4">
                <Dropdown value={selectedValue} onValueChange={setSelectedValue}>
                    <DropdownTrigger className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        {selectedValue ? `Selected: ${selectedValue}` : 'Select a color'}
                    </DropdownTrigger>
                    <DropdownMenu className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
                        <DropdownItem
                            value="red"
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-2"
                        >
                            <span className="w-4 h-4 bg-red-500 rounded"></span>
                            Red
                        </DropdownItem>
                        <DropdownItem
                            value="green"
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-2"
                        >
                            <span className="w-4 h-4 bg-green-500 rounded"></span>
                            Green
                        </DropdownItem>
                        <DropdownItem
                            value="blue"
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-2"
                        >
                            <span className="w-4 h-4 bg-blue-500 rounded"></span>
                            Blue
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <p className="text-sm text-gray-600">
                    Current value: <code className="bg-gray-100 px-2 py-1 rounded">{selectedValue || 'none'}</code>
                </p>
            </div>
        );
    },
};

export const CustomStyling: Story = {
    render: () => (
        <Dropdown>
            <DropdownTrigger className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg">
                ✨ Custom Styled
            </DropdownTrigger>
            <DropdownMenu className="mt-3 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-purple-200 rounded-2xl shadow-2xl py-3 min-w-[250px]">
                <DropdownItem
                    value="premium"
                    className="mx-2 px-4 py-3 hover:bg-white rounded-xl cursor-pointer transition-all font-medium"
                >
                    💎 Premium
                </DropdownItem>
                <DropdownItem
                    value="standard"
                    className="mx-2 px-4 py-3 hover:bg-white rounded-xl cursor-pointer transition-all font-medium"
                >
                    ⭐ Standard
                </DropdownItem>
                <DropdownItem
                    value="basic"
                    className="mx-2 px-4 py-3 hover:bg-white rounded-xl cursor-pointer transition-all font-medium"
                >
                    📦 Basic
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    ),
};

export const LongList: Story = {
    render: () => (
        <Dropdown>
            <DropdownTrigger className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Select a country
            </DropdownTrigger>
            <DropdownMenu className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 max-h-[300px] overflow-y-auto min-w-[200px]">
                {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'South Korea', 'Brazil', 'Mexico'].map((country) => (
                    <DropdownItem
                        key={country}
                        value={country.toLowerCase().replace(/\s/g, '-')}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        {country}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    ),
};
