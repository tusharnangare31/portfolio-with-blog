import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Check } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const resumeOptions = [
    { label: "Python Full Stack", file: "/Resume(3).pdf" },
    { label: "Full Stack Developer", file: "/Resume(2).pdf" },
    { label: "Cloud & DevOps", file: "/Resume(1).pdf" }
  ];

  const handleCardClick = (e, i) => {
    e.preventDefault();
    if (selectedIdx !== null) return; // already selected
    setSelectedIdx(i);

    // Trigger actual download after the animation plays
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumeOptions[i].file;
      link.download = `Tushar_Nangare_${resumeOptions[i].label.replace(' ', '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);

    // Close modal after download + brief pause
    setTimeout(() => {
      setSelectedIdx(null);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedIdx(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-4 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all z-[110]"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center hide-scrollbar">
            <motion.h2 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-6xl font-display font-bold text-center mb-6 md:mb-16 mt-0"
            >
              Explore <span className="text-accent">My Work</span>
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full perspective-1000">
              {resumeOptions.map((opt, i) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const rotation = isMobile ? (i - 1) * 8 : (i - 1) * 12; 
                const yOffset = i === 1 ? 0 : (isMobile ? 10 : 30);
                const colors = [
                  "from-blue-500 to-indigo-600",
                  "from-emerald-400 to-teal-500",
                  "from-orange-400 to-rose-500"
                ];

                const isSelected = selectedIdx === i;
                const isOther = selectedIdx !== null && selectedIdx !== i;

                // When selected: center, scale up, remove rotation
                // When other: fly down and fade out
                const getAnimateState = () => {
                  if (isSelected) {
                    return { 
                      y: 0, 
                      opacity: 1, 
                      rotateZ: 0, 
                      scale: isMobile ? 1.15 : 1.1,
                      zIndex: 50 
                    };
                  }
                  if (isOther) {
                    return { 
                      y: 300, 
                      opacity: 0, 
                      rotateZ: rotation * 2, 
                      scale: 0.7,
                      zIndex: 1 
                    };
                  }
                  return { 
                    y: yOffset, 
                    opacity: 1, 
                    rotateZ: rotation, 
                    scale: 1,
                    zIndex: 10 
                  };
                };
                
                return (
                  <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0, rotateZ: 0, scale: 1 }}
                    animate={getAnimateState()}
                    exit={{ y: "100vh", opacity: 0, rotateZ: 0 }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 100, 
                      delay: selectedIdx !== null ? 0 : i * 0.15 
                    }}
                    whileHover={selectedIdx === null ? { scale: 1.05, rotateZ: 0, y: 0, zIndex: 50 } : {}}
                    onClick={(e) => handleCardClick(e, i)}
                    className={`relative w-[150px] sm:w-[180px] md:w-full md:max-w-[300px] aspect-[4/5] md:aspect-[3/4] rounded-2xl md:rounded-3xl p-[2px] shadow-xl flex-shrink-0 cursor-pointer overflow-hidden bg-gradient-to-br ${colors[i]} transform-gpu`}
                  >
                    <div className="w-full h-full bg-surface/95 backdrop-blur-md rounded-[14px] md:rounded-[22px] flex flex-col items-center justify-center p-3 sm:p-4 md:p-8 text-center border border-white/5 transition-colors duration-500">
                      <AnimatePresence mode="wait">
                        {isSelected ? (
                          <motion.div
                            key="downloading"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center mb-3 md:mb-6 text-accent-foreground">
                              <Check size={24} className="md:w-[36px] md:h-[36px]" />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-accent mb-1 leading-tight">Downloading...</h3>
                            <p className="text-muted text-[8px] sm:text-[9px] md:text-xs font-medium uppercase tracking-widest">{opt.label}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-8 text-white group-hover:scale-110 transition-transform">
                              <Download size={20} className="md:w-[36px] md:h-[36px]" />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-2xl font-bold text-foreground mb-1 md:mb-2 leading-tight">{opt.label}</h3>
                            <p className="text-muted text-[8px] sm:text-[9px] md:text-sm font-medium uppercase tracking-widest">Download PDF</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
