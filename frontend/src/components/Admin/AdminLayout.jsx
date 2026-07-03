import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, LogOut } from 'lucide-react';
import Login from './Login';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('portfolio-admin-token');
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('portfolio-admin-token');
    setIsAuthenticated(false);
    navigate('/');
  };


  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-display font-bold text-accent">Portfolio Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent/10 text-accent font-medium">
            <FileText size={20} />
            Posts
          </Link>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
            Back to Site
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <Outlet />
      </main>
    </div>
  );
}
