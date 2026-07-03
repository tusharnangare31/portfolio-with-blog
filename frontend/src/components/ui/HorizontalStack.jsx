import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { Github, ArrowRight } from 'lucide-react';

const HorizontalStack = ({ onOpenModal }) => {
  const categoryOrder = ["Data Visualization", "Web Development", "Machine Learning"];
  const allProjects = categoryOrder
    .map(cat => projects[cat])
    .filter(Boolean)
    .flat();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
    >
      <div className="relative w-[350px] h-[450px] flex items-center justify-center">
        {allProjects.map((project, index) => (
          <Card 
            key={project.id} 
            index={index} 
            total={allProjects.length}
            project={project}
            mouseX={smoothX}
            mouseY={smoothY}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ index, total, project, mouseX, hoveredIndex, setHoveredIndex, onOpenModal }) => {
  // Calculate unstacking based on mouse position
  // When mouse is on the right, cards spread out more
  const spreadX = useTransform(mouseX, [0, 1], [-20 * (total - index), 60 * (index - (total / 2))]);
  const rotateZ = useTransform(mouseX, [0, 1], [-10 + (index * 2), 10 - (index * 2)]);
  const scale = useTransform(mouseX, [0, 1], [0.95, 1]);
  const zIndex = hoveredIndex === index ? 50 : index;
  
  return (
    <motion.div
      style={{
        x: spreadX,
        rotateZ: rotateZ,
        scale: scale,
        zIndex: zIndex,
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      onClick={() => onOpenModal(project, 'project')}
      className="absolute w-full h-[400px] bg-surface border border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden cursor-none p-8 flex flex-col justify-between group"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <Github size={24} />
          </div>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full border border-foreground/5">
            {project.date}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="px-3 py-1 bg-foreground/5 border border-foreground/5 rounded-full text-[10px] font-bold text-muted uppercase">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-accent text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          View Details <ArrowRight size={16} />
        </div>
      </div>

      {/* Profile Style Footer (Matching the image inspiration) */}
      <div className="absolute bottom-6 right-8 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 p-[1px]">
            <div className="w-full h-full rounded-full bg-surface" />
          </div>
          <div className="text-[10px] font-bold text-muted">
            <div className="text-foreground">Tushar Nangare</div>
            <div>Joined 2022</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalStack;
