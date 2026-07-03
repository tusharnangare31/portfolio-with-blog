import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNavbar = ({ theme, toggleTheme, onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog', isRoute: true },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-background/90 backdrop-blur-lg border-b border-foreground/5' : 'py-6 bg-transparent'}`}>
        <div className="px-6 flex justify-between items-center">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#');
            }}
            className="text-2xl font-cursive text-gradient cursor-pointer"
          >
            Tushar
          </a>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-muted hover:text-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col pt-24 px-8 pb-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground rounded-full bg-foreground/5"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-8 text-2xl font-display font-medium mt-12">
              {navLinks.map((link, i) => (
                link.isRoute ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.a>
                )
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full py-4 bg-accent text-accent-foreground rounded-xl font-bold text-center"
              >
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
