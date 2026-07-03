import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted text-sm font-medium flex items-center gap-2">
          © {new Date().getFullYear()} Designed & Developed by <span className="text-foreground">{personalInfo.name}</span>
          <span className="text-foreground/20">|</span>
          <Link to="/admin" className="text-muted hover:text-accent transition-colors">Admin</Link>
        </p>
        <div className="flex gap-8">
          <a href={personalInfo.x} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">X</a>
          <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">Instagram</a>
          <a href={personalInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
