import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';

const Skills = ({ onOpenModal }) => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Mastery</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium">Stack & Expertise</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onOpenModal({ category, items }, 'skill')}
              className="p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/30 transition-all group cursor-none"
            >
              <h4 className="text-xl font-bold mb-6 text-foreground group-hover:text-accent transition-colors">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-foreground/5 border border-foreground/10 rounded-full text-muted group-hover:border-accent/40 group-hover:text-foreground transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-foreground/5 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View More
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
