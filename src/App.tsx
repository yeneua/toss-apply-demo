function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Headless UI Library
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    A modern, accessible UI component library built with React and TypeScript.
                </p>
                <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Get Started
                    </button>
                    <button className="px-6 py-3 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors font-semibold">
                        View Components
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
