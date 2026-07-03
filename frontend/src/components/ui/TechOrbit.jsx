import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Hash,
  Cloud,
  Github,
  Figma,
  Monitor,
  Smartphone
} from 'lucide-react';

const icons = [
  { Icon: Code2, color: '#61DAFB' }, // React
  { Icon: Database, color: '#47A248' }, // MongoDB
  { Icon: Cpu, color: '#FF9900' }, // AWS
  { Icon: Globe, color: '#3178C6' }, // TS
  { Icon: Terminal, color: '#4479A1' }, // Python
  { Icon: Cloud, color: '#007ACC' }, // VS Code
  { Icon: Github, color: '#888888' },
  { Icon: Figma, color: '#F24E1E' },
  { Icon: Monitor, color: '#E34F26' },
  { Icon: Smartphone, color: '#F7DF1E' },
  { Icon: Layers, color: '#3178C6' },

];

const OrbitIcon = ({ Icon, radius, duration, color }) => {

  return (
    <motion.div
      className="absolute"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
    >
      <motion.div
        className="absolute w-12 h-12 rounded-2xl bg-surface/50 border border-foreground/10 flex items-center justify-center shadow-[0_0_15px_rgba(var(--foreground-rgb),0.05)] backdrop-blur-xl group hover:border-accent/50 transition-colors"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: `calc(50% - 24px)`,
          top: -24,
          transformOrigin: `50% ${radius + 24}px`
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: color }}
        />
        <Icon size={24} style={{ color }} className="relative z-10" />
      </motion.div>
    </motion.div>
  );
};

const TechOrbit = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible pointer-events-none opacity-40 lg:opacity-100">
      {/* Central Core */}
      <div className="absolute w-32 h-32 rounded-full bg-accent/20 blur-2xl animate-pulse" />
      <div className="absolute w-16 h-16 rounded-full bg-accent border border-accent/20 flex items-center justify-center backdrop-blur-3xl">
        <Code2 size={32} className="text-accent-foreground animate-bounce" />
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-foreground/5" />
      <div className="absolute w-[450px] h-[450px] rounded-full border border-foreground/5" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-foreground/5" />

      {/* Orbiting Icons - Outer Layer */}
      {icons.slice(0, 6).map((icon, i) => (
        <OrbitIcon
          key={i}
          Icon={icon.Icon}
          index={i}
          radius={225}
          duration={30}
          color={icon.color}
        />
      ))}

      {/* Orbiting Icons - Inner Layer */}
      {icons.slice(6).map((icon, i) => (
        <OrbitIcon
          key={i}
          Icon={icon.Icon}
          index={i}
          radius={300}
          duration={40}
          color={icon.color}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent blur-3xl" />
    </div>
  );
};

export default TechOrbit;
