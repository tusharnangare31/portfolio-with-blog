import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "../../data/portfolio";
import { Folder, GitBranch, ChevronRight, MousePointer2, Github } from "lucide-react";

const projectOrder = ["Full Stack & Mobile", "Cloud & DevOps"];

const SECTIONS = projectOrder.map((category, i) => {
  const items = projects[category] || [];
  return {
    id: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    num: (i + 1).toString().padStart(2, '0'),
    label: category.toUpperCase(),
    title: category.split(' ')[0],
    titleAccent: category.split(' ').slice(1).join(' '),
    sub: i === 0
      ? "React Native · Next.js · Supabase · PostgreSQL"
      : "Docker · Kubernetes · CI/CD · AWS Cloud Infrastructure",
    projects: items
  };
});

export default function ProjectPipeline({ onOpenModal }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const railProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate which section is active based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sectionCount = SECTIONS.length;
      const newIndex = Math.min(
        Math.floor(latest * sectionCount),
        sectionCount - 1
      );

      if (newIndex !== activeIndex) {
        setVisible(false);
        setTimeout(() => {
          setActiveIndex(newIndex);
          setVisible(true);
        }, 200);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  const s = SECTIONS[activeIndex];
  const NODES = SECTIONS.length;

  return (
    <section ref={containerRef} id="pipeline" className="relative min-h-[400vh] bg-background">
      {/* Scroll Anchors for Deep-Linking */}
      <div className="absolute inset-0 pointer-events-none">
        {SECTIONS.map((sec, i) => (
          <div 
            key={`anchor-${sec.id}`} 
            id={sec.id} 
            className="absolute left-0 w-full h-px"
            style={{ top: `${(i / SECTIONS.length) * 100}%` }}
          />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.03),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

        </div>

        {/* Orbit Rings */}
        <div className="absolute w-[400px] h-[400px] rounded-full border border-accent/5 animate-[spin_40s_linear_infinite] pointer-events-none" />
        <div className="absolute w-[650px] h-[650px] rounded-full border border-accent/5 animate-[spin_60s_linear_reverse_infinite] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full flex relative z-10">
          {/* Pipeline Rail */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 h-[280px] w-0.5 hidden sm:block">
            <div className="absolute inset-0 bg-foreground/5 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent to-accent/30 rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.4)]"
              style={{ height: useTransform(railProgress, [0, 1], ["0%", "100%"]) }}
            />

            {SECTIONS.map((sec, i) => {
              const isActive = i === activeIndex;
              const isDone = i < activeIndex;
              const pos = (i / (NODES - 1)) * 100;

              return (
                <div key={sec.id} className="absolute left-1/2 -translate-x-1/2 flex items-center" style={{ top: `${pos}%` }}>
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${isActive ? "bg-accent border-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] scale-125" :
                        isDone ? "bg-accent/20 border-accent/50" :
                          "bg-background border-foreground/20"
                      }`}
                  />
                  <span className={`absolute left-6 font-mono text-[10px] tracking-widest whitespace-nowrap transition-colors duration-300 ${isActive ? "text-accent" : "text-muted opacity-50"
                    }`}>
                    {sec.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="w-full sm:ml-40 md:ml-52 lg:ml-64 flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: "50%", skewX: -30, transition: { duration: 0.3, ease: "easeIn" } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
                      <span className="w-8 h-px bg-accent" />
                      {s.num} — {s.label}
                    </div>

                    <div>
                      <h2 className="text-4xl md:text-6xl font-display font-medium leading-none tracking-tighter">
                        {s.title}<br />
                        <span className="text-accent font-bold">{s.titleAccent}</span>
                      </h2>
                      <p className="mt-4 font-mono text-xs font-bold text-muted tracking-tight">
                        {s.sub}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -100, scale: 1.05 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, transition: { duration: 0.2 } }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 14,
                      mass: 1,
                      delay: 0.2
                    }}
                    className="flex flex-col md:flex-row gap-6 mt-8 overflow-visible"
                  >
                    {s.projects.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => onOpenModal(p, 'project')}
                        className="group relative p-6 bg-foreground/[0.03] border border-foreground/5 rounded-2xl hover:border-accent/30 transition-all cursor-none overflow-hidden flex-1 min-w-[300px]"
                      >
                        {/* Card Background Effects */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-lg">
                              {s.label === "OPEN SOURCE" ? <Github size={18} /> : <Folder size={18} />}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold group-hover:text-accent transition-colors">{p.title}</h4>
                              <p className="text-[10px] font-mono text-muted uppercase tracking-widest">{p.date}</p>
                            </div>
                          </div>

                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-muted hover:text-accent transition-colors"
                          >
                            <GitBranch size={16} />
                          </a>
                        </div>

                        <p className="text-sm text-muted leading-relaxed mb-6 border-t border-foreground/5 pt-4">
                          {p.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map(t => (
                              <span key={t} className="px-2 py-1 bg-accent/5 border border-accent/10 rounded-lg text-[9px] font-mono font-medium text-accent">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-accent text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            Details <ChevronRight size={12} />
                          </div>
                        </div>

                        {/* Author/Tagline Row (Optional/Matching Ref) */}
                        <div className="mt-6 pt-4 border-t border-foreground/5 flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-[10px] font-bold text-background">
                            TN
                          </div>
                          <span className="text-[10px] text-muted/60 font-medium">Tushar Nangare · Joined 2022</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Helper */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono text-muted tracking-widest"
        >
          <MousePointer2 size={12} className="rotate-180" />
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  );
}
