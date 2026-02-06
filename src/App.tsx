import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { TamboProvider } from "@tambo-ai/react";
import { registry } from './registry/components';
import Landing from './pages/Landing';
import ChatInterface from './pages/ChatInterface';
import { AuthCallback } from './pages/AuthCallback';

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

import { GitHubProvider, useGitHub } from './lib/github/context';

const TamboAppInner = () => {
  const [theme, setTheme] = useState<string>('purple');
  const { isConnected, user } = useGitHub();

  // Generate a persistent anonymous ID for non-logged in users to isolate their history
  const [visitorId] = useState(() => {
    let id = localStorage.getItem('intent_ui_visitor_id');
    if (!id) {
      id = `vis_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem('intent_ui_visitor_id', id);
    }
    return id;
  });

  // Scope the Tambo threads based on either GitHub identity or local visitor ID
  const contextKey = isConnected && user ? `github_${user.login}` : visitorId;

  const themes: Theme[] = [
    { id: 'purple', name: 'Royal Purple', color: 'bg-purple-500' },
    { id: 'blue', name: 'Cyber Blue', color: 'bg-blue-500' },
    { id: 'emerald', name: 'Living Emerald', color: 'bg-emerald-500' },
    { id: 'rose', name: 'Electric Rose', color: 'bg-rose-500' },
    { id: 'amber', name: 'Golden Amber', color: 'bg-amber-500' }
  ];

  return (
    <TamboProvider
      apiKey={import.meta.env.VITE_TAMBO_PUBLIC_KEY || "demo-key"}
      components={registry}
      contextKey={contextKey}
    >
      <div className="min-h-screen bg-black text-white font-sans antialiased overflow-hidden" data-theme={theme}>
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
          <Route path="/auth/github/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </TamboProvider>
  );
};

function App() {
  return (
    <Router>
      <GitHubProvider>
        <TamboAppInner />
      </GitHubProvider>
    </Router>
  );
}

export default App;