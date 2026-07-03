import React from 'react';
import SlantedOrbit from '../ui/SlantedOrbit';
import SkillsStack from '../ui/SkillsStack';
import { motion } from 'framer-motion';

const SkillsShowcase = ({ onOpenModal }) => {
  return (
    <section id="skills" className="relative min-h-screen py-32 md:py-48 flex items-center overflow-hidden bg-background">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none" />

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col pt-12 lg:pt-0">
        
        {/* Top Left Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-left mb-16 lg:mb-24 relative z-30"
        >
          <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-muted">Technical Arsenal</h4>
          <div className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground leading-tight">
            Interactive <span className="text-accent font-bold">Skills</span> Stack
          </div>
          <p className="mt-5 text-sm lg:text-base font-bold text-accent uppercase tracking-widest">
            Explore The Technology Ecosystem
          </p>
        </motion.div>

        {/* 2-Column Content Layout */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
          
          {/* Left Side: Tech Orbit */}
          <div className="relative w-full lg:w-1/2 flex justify-center order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="w-[600px] h-[600px] scale-75 md:scale-90 lg:scale-110 -translate-y-12 flex items-center justify-center pointer-events-none opacity-60 lg:opacity-100 relative">
              <SlantedOrbit />
            </div>
          </div>

          {/* Right Side: Skills Stacked Cards */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-full scale-90 md:scale-100 ml-0 lg:ml-12 translate-y-8">
              <SkillsStack onOpenModal={onOpenModal} />
            </div>
          </div>

        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
    </section>
  );
};

export default SkillsShowcase;
