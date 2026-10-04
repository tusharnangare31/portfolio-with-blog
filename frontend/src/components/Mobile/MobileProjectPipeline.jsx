import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { projects } from "../../data/portfolio";

export default function MobileProjectPipeline({ onOpenModal }) {
  const projectOrder = ["Full Stack & Mobile", "Cloud & DevOps"];
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end bottom"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="pipeline" className="py-24 bg-background relative overflow-hidden">
      <div className="px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">Archive</span>
          </div>
          <h2 className="text-4xl font-display font-medium tracking-tighter leading-tight">
            Project <br />
            <span className="text-muted italic">Pipeline</span>
          </h2>
        </motion.div>
      </div>

      <div className="px-6 relative" ref={containerRef}>
        {/* Sleek Timeline Background Track */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-foreground/10 to-accent/0" />
        
        {/* Animated Timeline Fill */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-[23px] top-0 bottom-0 w-[3px] bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.8)] z-0 rounded-full" 
        />

        <div className="space-y-16">
          {projectOrder.map((category) => {
            const items = projects[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="relative z-10">
                {/* Category Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 mb-8 pl-4"
                >
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-accent flex items-center justify-center absolute left-[-7px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground tracking-wide">
                    {category}
                  </h3>
                </motion.div>

                {/* Cards */}
                <div className="flex flex-col gap-6 pl-8">
                  {items.map((p, j) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: j * 0.1 }}
                      onClick={() => onOpenModal(p, 'project')}
                      className="group p-6 bg-surface/30 backdrop-blur-md border border-foreground/5 rounded-[1.5rem] active:scale-[0.98] transition-all"
                    >
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">{p.date}</span>
                        <h4 className="text-lg font-bold text-foreground/90 mb-2 leading-tight">{p.title}</h4>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {p.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-mono font-medium text-muted uppercase">
                            {t} {t !== p.tech.slice(0,3)[p.tech.slice(0,3).length-1] && '·'}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
