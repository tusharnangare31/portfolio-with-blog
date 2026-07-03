import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token.trim()) {
      localStorage.setItem('portfolio-admin-token', token.trim());
      onLogin(true);
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
            <Lock size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold text-center mb-2">Admin Access</h1>
        <p className="text-center text-muted mb-8 text-sm">Enter your secure token to manage posts.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin Token"
              className="w-full p-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors text-center font-mono"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Authenticate <ArrowRight size={18} />
          </button>
        </form>
      </div>
      
      <button 
        onClick={() => navigate('/')} 
        className="mt-8 text-muted hover:text-foreground text-sm font-medium transition-colors"
      >
        &larr; Back to Portfolio
      </button>
    </div>
  );
}
