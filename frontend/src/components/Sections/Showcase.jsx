import React from 'react';
import TechOrbit from '../ui/TechOrbit';
import HorizontalStack from '../ui/HorizontalStack';
import { motion } from 'framer-motion';

const Showcase = ({ onOpenModal }) => {
  return (
    <section id="projects" className="relative min-h-screen py-32 md:py-48 flex items-center overflow-hidden bg-background">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* Left Side: Text and Orbit */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 mb-12 lg:mb-0"
          >
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-6">Featured Projects</h2>
            <h3 className="text-5xl md:text-7xl font-display font-medium mb-8 leading-[1.1]">
              Engineering <br />
              <span className="text-gradient">Future-Ready</span> Projects
            </h3>
            <p className="text-lg text-muted max-w-md leading-relaxed">
              Turning ideas into scalable products through consistent learning, disciplined execution, and a focus on real-world impact.
            </p>
          </motion.div>

          {/* This is the background orbit animation */}
          <div className="absolute -left-20 lg:-left-40 top-1/2 -translate-y-1/2 w-full h-full -z-10 scale-75 lg:scale-100 pointer-events-none">
            <TechOrbit />
          </div>
        </div>

        {/* Right Side: Horizontal Stack */}
        <div className="w-full lg:w-1/2 perspective-1000">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-end"
          >
            <div className="mb-12 text-right hidden lg:block">
              <h4 className="text-sm font-bold text-muted uppercase tracking-widest mb-4">Interactive Stack</h4>
              <p className="text-xs text-accent font-bold">MOVE CURSOR TO EXPLORE</p>
            </div>
            
            <div className="w-full">
              <HorizontalStack onOpenModal={onOpenModal} />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Category Navigator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12"
      >
        <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] whitespace-nowrap">Explore Tracks:</span>
        <div className="flex items-center gap-8">
          {[
            { name: "Web Dev", id: "web-development" },
            { name: "ML / AI", id: "machine-learning" },
            { name: "Data Viz", id: "data-visualization" }
          ].map((cat) => (
            <a 
              key={cat.id} 
              href={`#${cat.id}`}
              className="group relative flex flex-col items-center"
            >
              <span className="text-xs font-mono font-medium text-muted group-hover:text-accent transition-colors duration-300">
                {cat.name}
              </span>
              <div className="w-0 h-px bg-accent group-hover:w-full transition-all duration-300 mt-1" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Grid Pattern in background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </section>
  );
};

export default Showcase;
