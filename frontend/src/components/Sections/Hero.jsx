import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import Magnetic from '../ui/Magnetic';
import { ChevronRight, Download, X } from 'lucide-react';

const Hero = ({ onOpenResumeModal }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full border border-accent/20 mb-6">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Hi, I&apos;m <span className="text-gradient">{personalInfo.name}</span>
          </h1>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-tight px-6 py-4 border-l-4 border-accent bg-accent/5 italic rounded-r-2xl">
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-50">
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
              >
                View My Work
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button 
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-8 py-4 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground rounded-full font-bold transition-all"
              >
                <Download size={18} />
                Download CV
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[30px] h-[50px] border-2 border-foreground/20 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
