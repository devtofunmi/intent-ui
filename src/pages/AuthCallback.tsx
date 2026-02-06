import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGitHub } from '../lib/github/context';
import { Loader2 } from 'lucide-react';
import { AuthErrorModal } from '../components/modals/AuthErrorModal';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken } = useGitHub();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('GitHub OAuth error:', error);
      setErrorMessage(`GitHub authorization was denied or failed: ${error}`);
      setShowError(true);
      return;
    }
    
    if (code) {
      console.log('Received OAuth code, attempting token exchange...');
      
      // Check if we're in development mode
      const isDevMode = import.meta.env.DEV;
      setIsDev(isDevMode);
      
      if (isDevMode) {
        // In development, the serverless function won't work
        console.warn('Development mode detected. Serverless function not available.');
        setErrorMessage(
          'OAuth callback received, but the serverless function is only available in production. ' +
          'For local development, please use a Personal Access Token instead.'
        );
        setShowError(true);
        return;
      }
      
      // Production: Exchange code for token via serverless function
      fetch('/api/github-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Token exchange response:', data);
        if (data.access_token) {
          setAccessToken(data.access_token);
          navigate('/chat');
        } else {
          console.error("Auth failed - no access_token in response:", data);
          setErrorMessage('GitHub authentication failed. The server did not return an access token. Please try again.');
          setShowError(true);
        }
      })
      .catch(err => {
        console.error("Token exchange error:", err);
        setErrorMessage(`Authentication error: ${err.message}. Please try connecting again.`);
        setShowError(true);
      });
    } else {
      console.warn('No code parameter in callback URL');
      navigate('/');
    }
  }, [searchParams, navigate, setAccessToken]);

  const handleErrorClose = () => {
    setShowError(false);
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={32} className="text-brand animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Authenticating</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Bridging with GitHub...</p>
        </div>
      </div>

      <AuthErrorModal 
        isOpen={showError}
        onClose={handleErrorClose}
        error={errorMessage}
        isDev={isDev}
      />
    </>
  );
};
