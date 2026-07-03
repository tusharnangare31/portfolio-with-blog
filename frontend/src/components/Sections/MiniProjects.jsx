import React from 'react';
import { motion } from 'framer-motion';
import { miniProjects } from '../../data/portfolio';
import { Github, Folder, ArrowRight, ExternalLink } from 'lucide-react';

const MiniProjects = ({ onOpenModal }) => {
  const inactiveProjects = miniProjects.filter(p => !p.active);
  const activeProjects = miniProjects.filter(p => p.active);
  
  const half = Math.ceil(inactiveProjects.length / 2) || 1; 
  const topRow = inactiveProjects.slice(0, half);
  const bottomRow = inactiveProjects.slice(half);

  return (
    <section className="py-32 md:py-48 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Quick Experiments</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium">Mini Projects</h3>
        </div>

        <div className="flex flex-col gap-6 relative w-full overflow-hidden py-4 group">

          {/* Top Row: Moves Left */}
          {topRow.length > 0 && (
            <motion.div 
              animate={{ x: [0, "-50%"] }}
              transition={{ ease: "linear", duration: 120, repeat: Infinity }}
              className="flex w-max group-hover:[animation-play-state:paused]"
            >
              {[...topRow, ...topRow, ...topRow].map((project, idx) => (
                <div
                  key={`top-${idx}`}
                  className="w-[300px] sm:w-[350px] md:w-[400px] mx-3 p-6 rounded-3xl bg-surface/80 border border-foreground/5 hover:border-accent/40 hover:-translate-y-2 hover:bg-surface/90 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                          <Folder size={18} />
                        </div>
                        <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
                      </div>
                      <a href={project.link} className="text-muted hover:text-foreground transition-colors">
                        <Github size={18} />
                      </a>
                    </div>
                    <p className="text-sm text-muted mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-foreground/10 uppercase tracking-widest text-[10px] font-bold text-accent">
                    {project.tech}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Bottom Row: Moves Right */}
          {bottomRow.length > 0 && (
            <motion.div 
              animate={{ x: ["-50%", 0] }}
              transition={{ ease: "linear", duration: 120, repeat: Infinity }}
              className="flex w-max group-hover:[animation-play-state:paused]"
            >
              {[...bottomRow, ...bottomRow, ...bottomRow].map((project, idx) => (
                <div
                  key={`bottom-${idx}`}
                  className="w-[300px] sm:w-[350px] md:w-[400px] mx-3 p-6 rounded-3xl bg-surface/80 border border-foreground/5 hover:border-accent/40 hover:-translate-y-2 hover:bg-surface/90 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                          <Folder size={18} />
                        </div>
                        <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
                      </div>
                      <a href={project.link} className="text-muted hover:text-foreground transition-colors">
                        <Github size={18} />
                      </a>
                    </div>
                    <p className="text-sm text-muted mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-foreground/10 uppercase tracking-widest text-[10px] font-bold text-accent">
                    {project.tech}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Optional Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        <div className="mt-16 flex justify-center sticky z-20">
          <button 
            onClick={() => onOpenModal(activeProjects, 'mini-projects')}
            className="group relative px-8 py-4 bg-surface rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 border border-foreground/5 hover:border-accent/50"
          >
            <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center gap-3">
              <span className="font-bold text-foreground tracking-wide">View All Mini Projects</span>
              <ArrowRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MiniProjects;
