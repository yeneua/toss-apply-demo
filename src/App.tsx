import { useState } from 'react';
import { ToastProvider } from './components/Toast/ToastProvider';
import { useToast } from './components/Toast/useToast';
import { Switch } from './components/Switch';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';

type View = 'landing' | 'guide' | 'components';

function App() {
    const [view, setView] = useState<View>('landing');

    const renderContent = () => {
        switch (view) {
            case 'guide':
                return (
                    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                        <button
                            onClick={() => setView('landing')}
                            className="mb-8 text-blue-400 hover:text-blue-300 flex items-center gap-2"
                        >
                            ← Back to Home
                        </button>
                        <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                        <div className="space-y-8">
                            <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                <h3 className="text-xl font-semibold mb-4">Installation</h3>
                                <pre className="bg-slate-900 p-4 rounded text-sm overflow-x-auto text-gray-300">
                                    <code>npm install toss-apply-demo</code>
                                </pre>
                            </section>
                            <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                                <p className="text-gray-400 mb-4">Wrap your application with necessary providers and start using components.</p>
                                <pre className="bg-slate-900 p-4 rounded text-sm overflow-x-auto text-gray-300">
                                    <code>{`import { ToastProvider, useToast } from 'toss-apply-demo';

function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  );
}`}</code>
                                </pre>
                            </section>
                        </div>
                    </div>
                );
            case 'components':
                return (
                    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                        <button
                            onClick={() => setView('landing')}
                            className="mb-8 text-blue-400 hover:text-blue-300 flex items-center gap-2"
                        >
                            ← Back to Home
                        </button>
                        <h2 className="text-3xl font-bold mb-6">Components</h2>
                        <div className="grid gap-6">
                            <ToastDemo />
                            <SwitchDemo />
                            <TooltipDemo />
                            {/* Other components will be added here */}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Headless UI Library
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            A modern, accessible UI component library built with React and TypeScript.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setView('guide')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={() => setView('components')}
                                className="px-6 py-3 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors font-semibold"
                            >
                                View Components
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <ToastProvider>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto">
                {renderContent()}
            </div>
        </ToastProvider>
    );
}

function ToastDemo() {
    const { toast } = useToast();

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Toast</h3>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => toast({ title: 'Success', description: 'Action completed successfully.' })}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Show Success
                </button>
                <button
                    onClick={() => toast({ title: 'Error', description: 'Something went wrong.', variant: 'error' })}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Show Error
                </button>
                <button
                    onClick={() => toast({
                        title: 'With Action',
                        description: 'Please confirm your action.',
                        action: <button className="text-sm font-bold underline" onClick={() => alert('Confirmed!')}>Undo</button>
                    })}
                    className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
                >
                    With Action
                </button>
            </div>
        </section>
    );
}

function TooltipDemo() {
    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Tooltip</h3>
            <div className="flex gap-4">
                <Tooltip>
                    <TooltipTrigger className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition">
                        Hover Me
                    </TooltipTrigger>
                    <TooltipContent>
                        This is a tooltip
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Focus Me
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Tooltip on Right
                    </TooltipContent>
                </Tooltip>
            </div>
        </section>
    );
}

function SwitchDemo() {
    const [enabled, setEnabled] = useState(false);

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Switch</h3>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Airplane mode" />
                    <span className="text-gray-300">Airplane Mode: {enabled ? 'On' : 'Off'}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Switch defaultChecked disabled aria-label="Disabled Checked" />
                    <span className="text-gray-400">Disabled (Checked)</span>
                </div>
            </div>
        </section>
    );
}

export default App;
