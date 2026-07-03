import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

const Snackbar = ({ isOpen, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-[350px] max-w-[90vw] p-4 rounded-2xl bg-surface/90 border border-accent/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl flex items-center justify-between gap-4 border-l-4 border-l-accent overflow-hidden"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <Terminal size={16} />
            </div>
            <p className="text-xs font-bold text-foreground leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-foreground/5 text-muted hover:text-foreground transition-colors shrink-0 relative z-10"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
