import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Globe, Layers, ArrowRight } from 'lucide-react';

const GlobalModal = ({ isOpen, onClose, data, type, onOpenModal, onShowSnackbar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  if (!data) return null;

  const renderContent = () => {
    switch (type) {
      case 'project':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img
                src={data.image}
                alt={data.title}
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />
              <div className="flex gap-4">
                {data.live && (
                  <a 
                    href={data.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => {
                      if (data.liveLabel) {
                        e.preventDefault();
                        if (onShowSnackbar) {
                          onShowSnackbar(data.liveLabel);
                        }
                      }
                    }}
                    className="flex-1 py-3 bg-accent text-accent-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>
                )}
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-foreground/5 border border-foreground/10 text-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/10 transition-colors">
                    GitHub <Github size={18} />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">{data.title}</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {data.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold">{t}</span>
                ))}
              </div>
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">The Problem</h3>
                  <p className="text-foreground leading-relaxed">{data.problem}</p>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Approach & Features</h3>
                  <ul className="list-disc list-inside text-foreground space-y-1">
                    {data.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Key Learnings</h3>
                  <p className="text-foreground leading-relaxed">{data.learnings}</p>
                </section>
              </div>
            </div>
          </div>
        );
      case 'skill':
        return (
          <div className="p-4">
            <h2 className="text-3xl font-display font-bold mb-6 text-accent">{data.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.items.map((item) => (
                <div key={item} className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-center font-medium hover:border-accent/50 transition-colors">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <a href={data.link || "#"} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                Visit Learning Path <Globe size={18} />
              </a>
            </div>
          </div>
        );
      case 'achievement':
        return (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <ExternalLink size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold">{data.name}</h2>
                <p className="text-accent font-bold">{data.provider}</p>
              </div>
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-8">
              {data.details}
            </p>
            <div className="flex justify-start">
              <a href={data.link || "#"} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                View Certificate <ExternalLink size={18} />
              </a>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="p-4">
            <h2 className="text-3xl font-display font-bold mb-2">{data.college}</h2>
            <p className="text-accent text-xl font-bold mb-6">{data.degree}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
                <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Duration</h4>
                <p className="text-xl font-bold">{data.duration}</p>
              </div>
              <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
                <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Result</h4>
                <p className="text-xl font-bold">{data.result}</p>
              </div>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {data.details}
            </p>
            <div className="mt-12 flex justify-start">
              <a href="#" className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                Visit Institution <Globe size={18} />
              </a>
            </div>
          </div>
        );
      case 'all-skills':
        return (
          <div className="p-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Complete <span className="text-accent">Skill Set</span> Domains</h2>
            <p className="text-muted text-lg mb-10 opacity-90">A comprehensive breakdown of all technical tools, languages, and frameworks.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(data.skills).map(([category, items]) => {
                const visibleTags = items.slice(0, 6);
                const extra = items.length - 6;
                return (
                  <div
                    key={category}
                    onClick={() => {
                       if (onOpenModal) onOpenModal({ category, items }, 'skill');
                    }}
                    className="relative w-full h-[320px] bg-surface/90 border border-foreground/10 flex flex-col justify-between group backdrop-blur-3xl transition-all duration-300 hover:border-accent/40 cursor-pointer shadow-[15px_15px_40px_rgba(var(--foreground-rgb),0.05)] dark:shadow-[15px_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0px_20px_40px_rgba(var(--foreground-rgb),0.1)] dark:hover:shadow-[0px_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-2 rounded-[2.5rem] overflow-hidden p-6"
                  >
                    {/* Visual background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Top row */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-accent group-hover:text-accent-foreground flex-shrink-0">
                          <Layers size={20} />
                        </div>
                        <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em] border border-accent/20 px-3 py-1 rounded-full cursor-default">
                          Expertise
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold mb-4 text-foreground leading-tight cursor-default">
                        {category}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 overflow-hidden cursor-default">
                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-foreground/5 border border-foreground/10 rounded-lg text-[10px] font-medium text-muted group-hover:text-foreground group-hover:border-accent/30 transition-all"
                          >
                            {tag}
                          </span>
                        ))}
                        {extra > 0 && (
                          <span className="text-[10px] font-bold text-accent/60 flex items-center pt-1 ml-1">
                            +{extra} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-foreground/5 pt-4 relative z-20">
                      <div className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0">
                        Explore Detail <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'mini-projects':
        return (
          <div>
            <div className="mb-10 lg:pl-4">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Complete Archive</h2>
              <h3 className="text-3xl md:text-5xl font-display font-medium text-foreground/90">Mini Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((project, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                          <Layers size={18} />
                        </div>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{project.title}</h4>
                      </div>
                      <a href={project.link !== '#' ? project.link : undefined} target={project.link !== '#' ? "_blank" : undefined} rel="noopener noreferrer" className={`transition-colors p-2 rounded-full flex items-center gap-2 ${project.link !== '#' ? 'text-accent hover:text-accent-foreground bg-accent/10 hover:bg-accent' : 'text-muted cursor-default'}`}>
                        {project.link !== '#' ? (
                          <>
                            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline-block">Visit</span>
                            <ExternalLink size={18} />
                          </>
                        ) : (
                          <Github size={18} />
                        )}
                      </a>
                    </div>
                    <p className="text-sm text-muted mb-6 leading-relaxed relative z-10">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-foreground/10 uppercase tracking-widest text-[10px] font-bold text-accent relative z-10">
                    {project.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            data-lenis-prevent="true"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-foreground/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all z-10"
            >
              <X size={20} />
            </button>
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
