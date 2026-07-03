import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './ui/Magnetic';

const Navbar = ({ theme, toggleTheme, onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog', isRoute: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-foreground/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-cursive text-gradient cursor-pointer"
        >
          Tushar
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            link.isRoute ? (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-sm font-medium text-muted hover:text-accent transition-colors"
                >
                  <Magnetic strength={0.2}>{link.name}</Magnetic>
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                <Magnetic strength={0.2}>{link.name}</Magnetic>
              </motion.a>
            )
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-muted hover:text-accent"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Magnetic strength={0.2}>
            <button 
              onClick={onOpenResumeModal}
              className="px-5 py-2.5 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Resume
            </button>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
