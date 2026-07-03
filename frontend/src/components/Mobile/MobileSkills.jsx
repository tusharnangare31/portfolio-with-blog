import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';

export default function MobileSkills({ onOpenModal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="py-24 bg-background relative">
      <div className="px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">Arsenal</span>
          </div>
          <h3 className="text-4xl font-display font-medium leading-tight">
            Technical <br />
            <span className="text-muted italic">Expertise</span>
          </h3>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="px-6 flex flex-col gap-6"
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            variants={itemVariants}
            onClick={() => onOpenModal({ category, items }, 'skill')}
            className="group p-8 bg-surface/30 backdrop-blur-md border border-foreground/5 rounded-[2rem] active:scale-95 transition-transform"
          >
            <h4 className="text-2xl font-display font-medium text-foreground/90 mb-6">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, 4).map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-foreground/5 border border-foreground/5 rounded-full text-[10px] font-mono font-medium text-muted">
                  {skill}
                </span>
              ))}
              {items.length > 4 && (
                <span className="px-3 py-1.5 text-[10px] font-mono font-bold text-accent">+{items.length - 4}</span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
