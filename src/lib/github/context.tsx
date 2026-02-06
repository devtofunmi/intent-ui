import React, { createContext, useContext, useState, useEffect } from 'react';
import { GitHubContextType, GitHubUser } from '../../types/github';
import { Octokit } from '@octokit/rest';
import { GitHubConnectModal } from '../../components/modals/GitHubConnectModal';

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const GitHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'no-client-id' | 'dev-mode' | null>(null);

  useEffect(() => {
    if (token) {
      const octokit = new Octokit({ auth: token });
      octokit.users.getAuthenticated()
        .then(res => {
          setUser({
            login: res.data.login,
            avatar_url: res.data.avatar_url,
            name: res.data.name || null
          });
        })
        .catch(err => {
          console.error("Failed to fetch GitHub user:", err);
          if (err.status === 401) {
            disconnect();
          }
        });
    }
  }, [token]);

  const setAccessToken = (newToken: string) => {
    localStorage.setItem('github_token', newToken);
    setToken(newToken);
    setModalOpen(false);
  };

  const connect = () => {
    const client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const isDev = import.meta.env.DEV;
    
    if (!client_id) {
      setModalMode('no-client-id');
      setModalOpen(true);
      return;
    }

    if (isDev) {
      setModalMode('dev-mode');
      setModalOpen(true);
      return;
    }

    // Production: Direct OAuth redirect
    const redirect_uri = `${window.location.origin}/auth/github/callback`;
    const scope = 'repo,user';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
  };

  const handleOAuthRedirect = () => {
    const client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirect_uri = `${window.location.origin}/auth/github/callback`;
    const scope = 'repo,user';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
  };

  const disconnect = () => {
    localStorage.removeItem('github_token');
    setToken(null);
    setUser(null);
  };

  return (
    <GitHubContext.Provider value={{
      isConnected: !!token,
      user,
      token,
      connect,
      setAccessToken,
      disconnect
    }}>
      {children}
      <GitHubConnectModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConnectWithPAT={setAccessToken}
        onConnectWithOAuth={handleOAuthRedirect}
        mode={modalMode}
      />
    </GitHubContext.Provider>
  );
};

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
};
