import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { TamboProvider } from "@tambo-ai/react";
import { registry } from './registry/components';
import Landing from './pages/Landing';
import ChatInterface from './pages/ChatInterface';

interface Theme {
  id: string;
  name: string;
  color: string;
}

// Wrapper components to handle navigation
const LandingWrapper = () => {
  const navigate = useNavigate();
  return <Landing onLaunch={(prompt) => navigate('/chat', { state: { prompt, isNew: true } })} />;
};

const ChatInterfaceWrapper = () => {
  const navigate = useNavigate();
  return <ChatInterface onBackToLanding={() => navigate('/')} />;
};

function App() {
  const [theme, setTheme] = useState<string>('purple');

  const themes: Theme[] = [
    { id: 'purple', name: 'Royal Purple', color: 'bg-purple-500' },
    { id: 'blue', name: 'Cyber Blue', color: 'bg-blue-500' },
    { id: 'emerald', name: 'Living Emerald', color: 'bg-emerald-500' },
    { id: 'rose', name: 'Electric Rose', color: 'bg-rose-500' },
    { id: 'amber', name: 'Golden Amber', color: 'bg-amber-500' }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased overflow-hidden" data-theme={theme}>
        <TamboProvider
          apiKey={import.meta.env.VITE_TAMBO_PUBLIC_KEY || "demo-key"}
          components={registry}
        >
          {/* Global Theme Switcher (Floats on both views) */}
          <div className="fixed bottom-6 left-6 z-[60] flex gap-2 p-2 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl scale-75 origin-bottom-left hover:scale-100 transition-transform duration-300">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 active:scale-90",
                  t.color,
                  theme === t.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110 shadow-lg" : "opacity-40 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                )}
                title={t.name}
              />
            ))}
          </div>

          <Routes>
            <Route path="/" element={<LandingWrapper />} />
            <Route path="/chat" element={<ChatInterfaceWrapper />} />
          </Routes>
        </TamboProvider>
      </div>
    </Router>
  );
}

export default App;