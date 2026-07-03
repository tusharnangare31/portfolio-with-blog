import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import SkillStackV2 from '../ui/SkillStackV2';

// ─── Simple Brand Icons ──────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const TUFIcon = () => (
  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-black italic text-white shadow-lg shadow-accent/20">
    TUF
  </div>
);

// ─── Wide Pill Experience Badge ──────────────────────────────────────────────

const FloatingBadge = ({ children, x, y, delay = 0, initialX = 0, initialY = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, x: initialX, y: initialY }}
    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    viewport={{ once: true }}
    animate={{ y: [0, -10, 0] }}
    transition={{ delay, duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{ position: 'absolute', top: y, left: x, zIndex: 50 }}
    className="glass flex items-center gap-4 pl-3 pr-6 py-2.5 rounded-full shadow-xl backdrop-blur-3xl bg-surface/60 border border-foreground/10 hover:border-accent/50 transition-colors duration-500 cursor-default min-w-[200px]"
  >
    {children}
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-background overflow-hidden transition-colors duration-500">

      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/15 blur-[150px] rounded-full" />
      </div>

      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] items-center">

          {/* Left Side: Dithered Aesthetic Portrait (ATTACHED TO LEFT) */}
          <div className="relative flex justify-start pl-0 lg:pl-0">

            <div className="relative w-full">
              {/* Dot Grid Layer - Theme Aware */}
              <div
                className="absolute inset-0 -m-32 opacity-[0.15] dark:opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, hsl(var(--accent)) 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                }}
              />

              {/* Subject Image with Dithered Edge Fade and GLOWING CORNER */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                {/* Visual Accent Corner (Top Left) */}
                <div className="absolute top-4 left-4 w-32 h-32 border-t-2 border-l-2 border-accent rounded-tl-[1.5rem] shadow-[0_0_20px_hsla(var(--accent-rgb),0.3)] z-20 pointer-events-none opacity-40 dark:opacity-60" />

                <div
                  className="relative overflow-visible"
                  style={{
                    maskImage: 'linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                  }}
                >
                  <img
                    src="/image.png"
                    alt="Tushar Nangare"
                    className="w-full max-w-[650px] aspect-[4/5] lg:aspect-[3/4] object-cover grayscale brightness-90 dark:brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 shadow-2xl dark:shadow-[20px_0_100px_rgba(0,0,0,0.8)]"
                  />
                  {/* Grain Overlay */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-10 mix-blend-overlay pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Content and Rotator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col px-6 lg:px-20 py-10"
          >
            <div className="mb-4">
              <h2 className="text-xs font-bold text-accent uppercase tracking-[0.4em] mb-3">The Developer</h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-6 text-foreground leading-[1.3] tracking-tight transition-colors duration-500">
                Engineering <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8">Intelligent</span> Experiences
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block ml-3 text-[#0077B5] hover:text-[#0077B5]/80 transition-all group align-middle"
                >
                  <Linkedin size={22} className="group-hover:scale-110 transition-transform mb-1" />
                </a>
              </h3>

              <div className="space-y-4">
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-medium max-w-lg transition-colors duration-500">
                  {personalInfo.about}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground/60 max-w-lg transition-colors duration-500">
                  Currently specializing in DevOps & Cloud Computing at PES Modern College of Engineering, focusing on containerization, CI/CD, and cloud infrastructure.
                </p>
              </div>
            </div>

            {/* Rotator - Shifted Up and Left */}
            <div className="-mt-6 -ml-0 lg:-ml-12 relative z-50">
              <SkillStackV2 />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
