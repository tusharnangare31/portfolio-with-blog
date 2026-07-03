import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { ChevronRight, Download } from 'lucide-react';

const MobileHero = ({ onOpenResumeModal }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 z-10 w-full flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-foreground/[0.03] border border-foreground/5 text-foreground/80 text-[10px] font-mono tracking-widest uppercase rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-display font-medium tracking-tighter leading-[1.1] mb-6">
          Hi, I&apos;m <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent via-accent to-accent/50">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-12 w-full max-w-sm">
          <p className="text-lg font-medium text-muted leading-relaxed">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full max-w-xs relative z-50">
          <a
            href="#projects"
            className="w-full flex items-center justify-between px-8 py-4 bg-accent text-accent-foreground rounded-2xl font-bold shadow-xl shadow-accent/20 active:scale-95 transition-transform"
          >
            Explore Work
            <ChevronRight size={18} className="opacity-70" />
          </a>
          <button 
            onClick={onOpenResumeModal}
            className="w-full flex items-center justify-between px-8 py-4 bg-foreground/5 border border-foreground/10 text-foreground rounded-2xl font-bold active:scale-95 transition-transform hover:bg-foreground/10"
          >
            Download CV
            <Download size={18} className="opacity-70" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileHero;
