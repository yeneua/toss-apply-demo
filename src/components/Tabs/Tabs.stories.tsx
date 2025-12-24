import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './';

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tabs defaultValue="profile" className="w-full max-w-md">
            <TabsList className="border-b border-gray-200">
                <TabsTrigger
                    value="profile"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition-colors"
                >
                    Profile
                </TabsTrigger>
                <TabsTrigger
                    value="settings"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition-colors"
                >
                    Settings
                </TabsTrigger>
                <TabsTrigger
                    value="notifications"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition-colors"
                >
                    Notifications
                </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-4">
                <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
                <p className="text-gray-600">
                    Manage your profile details and preferences here.
                </p>
            </TabsContent>
            <TabsContent value="settings" className="p-4">
                <h3 className="text-lg font-semibold mb-2">Settings</h3>
                <p className="text-gray-600">
                    Configure your account settings and privacy options.
                </p>
            </TabsContent>
            <TabsContent value="notifications" className="p-4">
                <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                <p className="text-gray-600">
                    Control how and when you receive notifications.
                </p>
            </TabsContent>
        </Tabs>
    ),
};

export const WithDisabled: Story = {
    render: () => (
        <Tabs defaultValue="tab1" className="w-full max-w-md">
            <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                    value="tab1"
                    className="px-4 py-2 rounded-md aria-selected:bg-white aria-selected:shadow-sm transition-all"
                >
                    Active
                </TabsTrigger>
                <TabsTrigger
                    value="tab2"
                    disabled
                    className="px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                >
                    Disabled
                </TabsTrigger>
                <TabsTrigger
                    value="tab3"
                    className="px-4 py-2 rounded-md aria-selected:bg-white aria-selected:shadow-sm transition-all"
                >
                    Another
                </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-4">
                <p>First tab content</p>
            </TabsContent>
            <TabsContent value="tab3" className="p-4">
                <p>Third tab content (second is disabled)</p>
            </TabsContent>
        </Tabs>
    ),
};

export const Controlled: Story = {
    render: function ControlledTabs() {
        const [activeTab, setActiveTab] = React.useState('home');

        return (
            <div className="w-full max-w-md space-y-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('home')}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-sm"
                    >
                        Go to About
                    </button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                            value="home"
                            className="px-4 py-2 rounded-md aria-selected:bg-white aria-selected:shadow-sm transition-all"
                        >
                            Home
                        </TabsTrigger>
                        <TabsTrigger
                            value="about"
                            className="px-4 py-2 rounded-md aria-selected:bg-white aria-selected:shadow-sm transition-all"
                        >
                            About
                        </TabsTrigger>
                        <TabsTrigger
                            value="contact"
                            className="px-4 py-2 rounded-md aria-selected:bg-white aria-selected:shadow-sm transition-all"
                        >
                            Contact
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="home" className="p-4 bg-blue-50 rounded-lg mt-2">
                        <h3 className="font-semibold">Home</h3>
                        <p className="text-sm text-gray-600">Welcome to the home page!</p>
                    </TabsContent>
                    <TabsContent value="about" className="p-4 bg-purple-50 rounded-lg mt-2">
                        <h3 className="font-semibold">About</h3>
                        <p className="text-sm text-gray-600">Learn more about us here.</p>
                    </TabsContent>
                    <TabsContent value="contact" className="p-4 bg-green-50 rounded-lg mt-2">
                        <h3 className="font-semibold">Contact</h3>
                        <p className="text-sm text-gray-600">Get in touch with us.</p>
                    </TabsContent>
                </Tabs>

                <p className="text-sm text-gray-500">
                    Current tab: <code className="bg-gray-100 px-2 py-1 rounded">{activeTab}</code>
                </p>
            </div>
        );
    },
};

export const VerticalTabs: Story = {
    render: () => (
        <Tabs defaultValue="dashboard" className="flex gap-4 w-full max-w-2xl">
            <TabsList className="flex flex-col gap-1 min-w-[150px]">
                <TabsTrigger
                    value="dashboard"
                    className="px-4 py-2 text-left rounded-lg aria-selected:bg-blue-100 aria-selected:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                    📊 Dashboard
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="px-4 py-2 text-left rounded-lg aria-selected:bg-blue-100 aria-selected:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                    📈 Analytics
                </TabsTrigger>
                <TabsTrigger
                    value="reports"
                    className="px-4 py-2 text-left rounded-lg aria-selected:bg-blue-100 aria-selected:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                    📄 Reports
                </TabsTrigger>
                <TabsTrigger
                    value="team"
                    className="px-4 py-2 text-left rounded-lg aria-selected:bg-blue-100 aria-selected:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                    👥 Team
                </TabsTrigger>
            </TabsList>
            <div className="flex- 1">
                <TabsContent value="dashboard" className="p-6 bg-white border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Dashboard</h2>
                    <p className="text-gray-600">View your overview and key metrics here.</p>
                </TabsContent>
                <TabsContent value="analytics" className="p-6 bg-white border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Analytics</h2>
                    <p className="text-gray-600">Detailed analytics and insights.</p>
                </TabsContent>
                <TabsContent value="reports" className="p-6 bg-white border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Reports</h2>
                    <p className="text-gray-600">Generate and view reports.</p>
                </TabsContent>
                <TabsContent value="team" className="p-6 bg-white border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Team</h2>
                    <p className="text-gray-600">Manage your team members.</p>
                </TabsContent>
            </div>
        </Tabs>
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <Tabs defaultValue="music" className="w-full max-w-md">
            <TabsList className="flex gap-1 bg-gradient-to-r from-pink-100 to-purple-100 p-1.5 rounded-xl">
                <TabsTrigger
                    value="music"
                    className="px-4 py-2 rounded-lg aria-selected:bg-white aria-selected:shadow-lg transition-all font-medium"
                >
                    🎵 Music
                </TabsTrigger>
                <TabsTrigger
                    value="podcasts"
                    className="px-4 py-2 rounded-lg aria-selected:bg-white aria-selected:shadow-lg transition-all font-medium"
                >
                    🎙️ Podcasts
                </TabsTrigger>
                <TabsTrigger
                    value="playlists"
                    className="px-4 py-2 rounded-lg aria-selected:bg-white aria-selected:shadow-lg transition-all font-medium"
                >
                    📝 Playlists
                </TabsTrigger>
            </TabsList>
            <TabsContent value="music" className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mt-3">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    Your Music
                </h3>
                <p className="text-gray-600 mt-2">Browse your favorite songs and artists.</p>
            </TabsContent>
            <TabsContent value="podcasts" className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mt-3">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    Podcasts
                </h3>
                <p className="text-gray-600 mt-2">Discover new episodes and shows.</p>
            </TabsContent>
            <TabsContent value="playlists" className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mt-3">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    Your Playlists
                </h3>
                <p className="text-gray-600 mt-2">Create and manage your playlists.</p>
            </TabsContent>
        </Tabs>
    ),
};
