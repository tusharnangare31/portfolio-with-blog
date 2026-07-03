import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../../data/portfolio';
import { Award, Calendar, ArrowRight } from 'lucide-react';

const Achievements = ({ onOpenModal }) => {
  return (
    <section className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Milestones</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium">Achievement and Certificate</h3>
          <p className="text-muted text-lg max-w-2xl mt-6 leading-relaxed">
            A curated showcase of technical milestones, professional certifications, and specialized learning paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if (item.link && item.link !== "#") {
                  window.open(item.link, '_blank', 'noopener,noreferrer');
                } else {
                  onOpenModal(item, 'achievement');
                }
              }}
              className="p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:bg-accent/5 hover:border-accent/20 transition-all group cursor-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                < Award size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{item.name}</h4>
              <p className="text-accent text-sm font-bold mb-4">{item.provider}</p>
              <div className="flex items-center gap-2 text-muted text-xs mb-6">
                <Calendar size={14} />
                {item.date}
              </div>
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                {item.link && item.link !== "#" ? 'View Certificate' : 'View Details'} <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
