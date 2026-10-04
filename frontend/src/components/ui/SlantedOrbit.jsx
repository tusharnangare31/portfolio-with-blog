import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Terminal,
  Hash,
  Cpu,
  Layers,
  Monitor,
  Github,
  Brain,
  Braces
} from 'lucide-react';

const icons = [
  { Icon: Terminal, color: '#4479A1' }, // Python
  { Icon: Hash, color: '#68A063' }, // Node
  { Icon: Code2, color: '#61DAFB' }, // React
  { Icon: Database, color: '#47A248' }, // MongoDB
  { Icon: Cpu, color: '#FF9900' }, // AWS
  { Icon: Monitor, color: '#E34F26' }, // HTML
  { Icon: Github, color: '#888888' },
  { Icon: Layers, color: '#3178C6' }, // TS
  { Icon: Brain, color: '#FF007F' }, // AI / ML
  { Icon: Braces, color: '#F7DF1E' }, // JS
];

const SlantedOrbit = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main Flat Container */}
        <div
          className="relative w-[600px] h-[600px] flex items-center justify-center transform-style-3d"
          style={{ transform: "perspective(1000px) rotateX(25deg) rotateY(15deg) rotateZ(-5deg)" }}
        >
          {/* Concentric Rings */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-foreground/5" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-foreground/5" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-foreground/10" />

          {/* Core Glow */}
          <div className="absolute w-24 h-24 rounded-full bg-accent/20 blur-3xl opacity-50" />

          {/* Inner Orbit Icons (3 icons) */}
          {icons.slice(0, 3).map((item, i) => (
            <OrbitItem
              key={`inner-${i}`}
              index={i}
              total={3}
              radius={100}
              duration={25}
              Icon={item.Icon}
              color={item.color}
            />
          ))}

          {/* Middle Orbit Icons (2 icons) */}
          {icons.slice(3, 5).map((item, i) => (
            <OrbitItem
              key={`middle-${i}`}
              index={i}
              total={2}
              radius={200}
              duration={35}
              Icon={item.Icon}
              color={item.color}
            />
          ))}

          {/* Outer Orbit Icons (3 icons) */}
          {icons.slice(5, 8).map((item, i) => (
            <OrbitItem
              key={`outer-${i}`}
              index={i}
              total={3}
              radius={300}
              duration={45}
              Icon={item.Icon}
              color={item.color}
            />
          ))}

          {/* Floating Chips - Positioned to be clearly visible */}
          <FloatingChip angle={20} distance={180} name="Tushar Nangare" role="BE – IT (2026)" provider="PES Modern College" />
          <FloatingChip angle={110} distance={210} name="Docker & K8s" role="Certified" provider="KodeKloud" />
          <FloatingChip angle={200} distance={240} name="Python Full Stack" role="Certified" provider="AICTE" />
          <FloatingChip angle={290} distance={220} name="AI/DS Virtual Intern" role="Springboard 6.0" provider="Infosys" />
        </div>
      </div>

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent blur-[120px] pointer-events-none" />
    </div>
  );
};

const OrbitItem = ({ index, total, radius, duration, Icon, color }) => {
  const startAngle = (index * 360) / total;
  return (
    <motion.div
      className="absolute"
      animate={{
        rotate: [startAngle, startAngle + 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <motion.div
        className="absolute w-12 h-12 rounded-2xl bg-surface/80 border border-foreground/10 flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:border-accent/40 transition-all cursor-none"
        animate={{
          rotate: [-startAngle, -(startAngle + 360)],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: `calc(50% - 24px)`,
          top: -24,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: color }}
        />
        <Icon size={20} style={{ color }} className="relative z-10" />
      </motion.div>
    </motion.div>
  );
};

const FloatingChip = ({ angle, distance, name, role, provider }) => {
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  // Generate a stable pseudo-random duration based on the name to satisfy React 19 purity rules
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const randomDuration = 4 + (Math.abs(hash % 1000) / 1000) * 2;

  return (
    <motion.div
      className="absolute p-3 rounded-xl bg-surface/90 border border-foreground/10 shadow-2xl backdrop-blur-3xl min-w-[180px]"
      animate={{
        y: [y - 10, y + 10, y - 10],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[9px] font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-foreground text-[10px] font-bold leading-tight">{name}</div>
          <div className="text-[9px] text-muted leading-tight">
            {role} <span className="text-accent/60 mx-1">•</span> <span className="text-accent">{provider}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SlantedOrbit;
