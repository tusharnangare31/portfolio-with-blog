import { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Layout, 
  Brain, 
  Layers, 
  Link as LinkIcon, 
  BarChart3, 
  Database, 
  Network, 
  Activity 
} from 'lucide-react';

const SKILLS_DATA = [
  {
    id: 1,
    title: "System Design",
    tech: "TypeScript",
    icon: "architecture"
  },
  {
    id: 2,
    title: "DSA",
    tech: "Python",
    icon: "brain"
  },
  {
    id: 3,
    title: "Full Stack",
    tech: "MERN",
    icon: "layers"
  },
  {
    id: 4,
    title: "LangChain",
    tech: "Jupyter",
    icon: "link"
  },
  {
    id: 5,
    title: "Tableau",
    tech: "Visualization",
    icon: "bar-chart"
  },
  {
    id: 6,
    title: "Pandas",
    tech: "Python",
    icon: "database"
  },
  {
    id: 7,
    title: "LangGraph",
    tech: "Jupyter",
    icon: "network"
  },
  {
    id: 8,
    title: "Kafka",
    tech: "Streaming",
    icon: "activity"
  }
];

const IconMap = {
  "architecture": Layout,
  "brain": Brain,
  "layers": Layers,
  "link": LinkIcon,
  "bar-chart": BarChart3,
  "database": Database,
  "network": Network,
  "activity": Activity
};

const CARD_HEIGHT = 85; // Increased from 70
const STEP = 70; // Increased from 55

export default function SkillStackV2() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const startCycle = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // Upward flow: New cards come from bottom, move to top
      setActive((p) => (p + 1) % SKILLS_DATA.length);
    }, 1500);
  };

  useEffect(() => {
    startCycle();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
    startCycle();
  };

  return (
    <div
      className="skill-stack-v3-scene"
      style={{
        background: 'transparent',
        minHeight: '420px', // Increased from 340
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px',
        fontFamily: "'Inter', sans-serif",
        // NEW: Precision Masking for "Match with Background"
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400, // Increased from 320
          height: 420, // Increased from 340
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {SKILLS_DATA.map((item, i) => {
            const len = SKILLS_DATA.length;
            let dist = i - active;
            if (dist > len / 2) dist -= len;
            if (dist < -len / 2) dist += len;

            const absDist = Math.abs(dist);
            const isActive = absDist === 0;

            if (absDist > 2.5) return null;

            // HYBRID 3D LOGIC
            const opacity = 
              isActive ? 1 :
              absDist <= 1 ? 0.92 :
              absDist <= 2 ? 0.7 :
              0.3;

            const blur = 
              isActive ? 0 :
              absDist <= 1 ? 0.4 :
              absDist <= 2 ? 1.5 :
              4;

            const translateZ = -absDist * 140;
            const rotateX = dist * 32;
            const translateY = dist * STEP;
            const scale = 1 - absDist * 0.04;

            const IconComp = IconMap[item.icon] || Layout;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(i)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: CARD_HEIGHT,
                  marginTop: -CARD_HEIGHT / 2,
                  borderRadius: 12,
                  padding: '20px 28px',
                  background: 'hsl(var(--surface))',
                  
                  border: isActive
                    ? '2px solid hsl(var(--accent))'
                    : '1px solid hsla(var(--foreground-rgb), 0.08)',

                  cursor: isActive ? 'default' : 'pointer',
                  opacity: Math.max(0, opacity),
                  filter: `blur(${blur}px)`,
                  
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  
                  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',

                  boxShadow: isActive
                    ? `0 0 30px hsla(var(--accent-rgb), 0.2), 0 0 60px hsla(var(--accent-rgb), 0.1)`
                    : 'none',

                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  boxSizing: 'border-box',
                  zIndex: 100 - Math.round(absDist * 10),
                }}
              >
                {/* Icon Column */}
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: isActive 
                      ? 'hsla(var(--accent-rgb), 0.15)' 
                      : 'hsla(var(--foreground-rgb), 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <IconComp size={24} />
                </div>

                {/* Text Content Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <h3
                    style={{
                      fontSize: 16, // Reduced from 20
                      fontWeight: 700,
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted))',
                      letterSpacing: '-0.02em',
                      margin: 0,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 11, // Reduced from 13
                      fontWeight: 600,
                      color: isActive ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                      opacity: isActive ? 1 : 0.6,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.tech}
                  </span>
                </div>

                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: 'linear-gradient(45deg, hsla(var(--accent-rgb), 0.05) 0%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}