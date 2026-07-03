import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { skills } from '../../data/portfolio';

// ─── Constants ───────────────────────────────────────────────────────────────

const COMMIT_THRESHOLD = 110;  // px upward drag to trigger cycle
const STACK_Y = 24;
const STACK_X = 24;
const SCALE_STEP = 0.048;
const OPACITY_STEP = 0.1;
const MAX_VISIBLE = 4;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStackTarget(index) {
  return {
    y:       -index * STACK_Y,
    x:        index * STACK_X,
    scale:    Math.max(0.82, 1 - index * SCALE_STEP),
    opacity:  Math.max(0.2,  1 - index * OPACITY_STEP),
    zIndex:   100 - index,
    filter:   `blur(${index * 0.5}px)`,
  };
}

// Smoothly interpolate between two stack positions based on drag progress
function lerpTarget(from, to, t) {
  // easeInOut so the interpolation feels physically weighted
  const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  return {
    y:       from.y       + (to.y       - from.y)       * ease,
    x:       from.x       + (to.x       - from.x)       * ease,
    scale:   from.scale   + (to.scale   - from.scale)   * ease,
    opacity: from.opacity + (to.opacity - from.opacity)  * ease,
  };
}

// ─── SkillCard ────────────────────────────────────────────────────────────────

function SkillCard({
  category, items,
  index,
  onCycle, isAnimating, onOpenModal,
  dragProgress,   // 0–1 live drag value from parent, drives sibling promotion
  isTopCard,
}) {
  const controls = useAnimation();
  const isTop = index === 0;

  const dragStartY  = useRef(0);
  const dragStartX  = useRef(0);
  const dragging    = useRef(false);
  const committed   = useRef(false);

  // ── Resting position ──────────────────────────────────────────────────────
  useEffect(() => {
    if (dragging.current) return;
    controls.start({
      ...getStackTarget(index),
      rotate: 0,
      transition: { type: 'spring', stiffness: 600, damping: 35, mass: 0.5 },
    });
  }, [index, controls]);

  // ── Live promote siblings while top card is being dragged ─────────────────
  useEffect(() => {
    if (isTop || dragging.current || index >= MAX_VISIBLE) return;

    const from = getStackTarget(index);
    const to   = getStackTarget(index - 1); // where this card ends up after cycle
    const interp = lerpTarget(from, to, dragProgress);

    controls.set({
      ...interp,
      zIndex: 100 - index,
      // blur fades out as card comes forward
      filter: `blur(${Math.max(0, (index - dragProgress) * 0.5)}px)`,
    });
  }, [dragProgress, index, isTop, controls]);

  // ── Pointer handlers ──────────────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    if (!isTop || isAnimating) return;
    e.preventDefault();
    dragging.current  = true;
    committed.current = false;
    dragStartY.current = e.clientY;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isTop, isAnimating]);

  const onPointerMove = useCallback((e) => {
    if (!dragging.current || committed.current) return;

    const dy   = e.clientY - dragStartY.current;
    const dx   = e.clientX - dragStartX.current;
    const upDY = Math.min(0, dy);                            // upward only
    const pct  = Math.min(1, Math.abs(upDY) / COMMIT_THRESHOLD);

    // Top card follows finger
    controls.set({
      y:       upDY * 0.88,
      x:       dx * 0.08,
      scale:   1 + pct * 0.025,
      opacity: 1 - pct * 0.4,
      rotate:  dx * 0.012,
      zIndex:  110,
      filter:  'blur(0px)',
    });

    // Propagate live progress to parent → siblings update in real time
    onCycle('drag', pct);

    // Auto-commit at threshold
    if (pct >= 1 && !committed.current) {
      committed.current = true;
      dragging.current  = false;
      onCycle('commit', 1);
    }
  }, [controls, onCycle]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    onCycle('drag', 0);   // reset siblings to resting positions
    if (!committed.current) {
      controls.start({
        ...getStackTarget(0),
        rotate: 0,
        transition: { type: 'spring', stiffness: 650, damping: 30 },
      });
    }
  }, [controls, onCycle]);

  if (index >= MAX_VISIBLE) return null;

  const visibleTags = items.slice(0, 6);
  const extra = items.length - 6;

  return (
    <motion.div
      animate={controls}
      initial={getStackTarget(index)}
      style={{ position: 'absolute', touchAction: 'none', userSelect: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`hide-custom-cursor absolute w-full h-[380px] bg-card/90 border border-foreground/10 rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-between group backdrop-blur-3xl
        ${isTop
          ? 'shadow-[0px_20px_40px_rgba(var(--foreground-rgb),0.1)] dark:shadow-[0px_20px_40px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing'
          : 'shadow-[15px_15px_40px_rgba(var(--foreground-rgb),0.05)] dark:shadow-[15px_15px_40px_rgba(0,0,0,0.4)] cursor-default'
        }`}
      whileHover={isTop && !isAnimating ? { scale: getStackTarget(0).scale * 1.01 } : {}}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-accent group-hover:text-accent-foreground flex-shrink-0">
            <Layers size={24} />
          </div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] border border-accent/20 px-3 py-1 rounded-full cursor-default">
            Expertise
          </span>
        </div>

        <h3 className="text-3xl font-display font-bold mb-6 text-foreground leading-tight cursor-default">
          {category}
        </h3>

        <div className="flex flex-wrap gap-2 overflow-hidden cursor-default">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-xl text-xs font-medium text-muted-foreground group-hover:text-foreground group-hover:border-accent/30 transition-all uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-xs font-bold text-accent/60 flex items-center pt-1 ml-1">
              +{extra} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-foreground/5 pt-6 relative z-20">
        <button
          onClick={(e) => { e.stopPropagation(); onOpenModal({ category, items }, 'skill'); }}
          className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0"
        >
          Explore Detail <ArrowRight size={14} />
        </button>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter cursor-default">
          Stack Layer {index + 1}
        </div>
      </div>

      {/* Drag progress bar — only on top card while dragging */}
      {isTopCard && dragProgress > 0 && (
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-30">
          <div className="w-[90px] h-[3px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${dragProgress * 100}%`,
                background: dragProgress >= 1 ? '#10B981' : 'var(--color-accent, #10B981)',
                transition: 'width 0.04s linear, background 0.2s',
              }}
            />
          </div>
          <span className="text-[10px] text-muted tabular-nums">
            {Math.round(dragProgress * 100)}%
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── ProgressPips ─────────────────────────────────────────────────────────────

function ProgressPips({ activeIndex, total }) {
  return (
    <div className="flex gap-[7px] items-center justify-center mt-5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === activeIndex ? 20 : 7, opacity: i === activeIndex ? 1 : 0.35 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="h-[7px] rounded-full"
          style={{ background: i === activeIndex ? 'hsl(var(--accent))' : '#6B7280' }}
        />
      ))}
    </div>
  );
}

// ─── SkillsStack (main export) ────────────────────────────────────────────────

export default function SkillsStack({ onOpenModal }) {
  const [cards, setCards]             = useState(Object.entries(skills));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [liveDrag, setLiveDrag]       = useState(0);   // 0–1, drives sibling promotion

  const originalCategories = Object.keys(skills);
  const activeIndex = originalCategories.indexOf(cards[0][0]);

  // Unified handler: top card reports both live drag progress and final commit
  const handleCycle = useCallback((mode, pct) => {
    if (mode === 'drag') {
      setLiveDrag(pct);
      return;
    }

    // 'commit' — run the cycle
    if (isAnimating) return;
    setIsAnimating(true);
    setHintVisible(false);
    setLiveDrag(0);

    setTimeout(() => {
      setCards((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
      setIsAnimating(false);
    }, 120);
  }, [isAnimating]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-8 pb-12 select-none">

      {/* Stack container */}
      <div className="relative" style={{ width: 380, height: 410 }}>
        {/* Render reversed so top card paints last (highest DOM z-order) */}
        {[...cards].reverse().map(([category, items], reversedIndex) => {
          const index = cards.length - 1 - reversedIndex;
          return (
            <SkillCard
              key={category}
              category={category}
              items={items}
              index={index}
              onCycle={handleCycle}
              isAnimating={isAnimating}
              onOpenModal={onOpenModal}
              dragProgress={liveDrag}
              isTopCard={index === 0}
            />
          );
        })}
      </div>

      <ProgressPips activeIndex={activeIndex} total={cards.length} />

      {/* First-time drag hint & View All Button */}
      <div className="mt-6 flex flex-col items-center gap-6 relative z-50">
        <AnimatePresence>
          {hintVisible && (
            <motion.p
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse cursor-default"
            >
              drag up to see next one
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal({ skills }, 'all-skills');
          }}
          className="px-8 py-3 bg-accent/10 border border-accent/20 rounded-full text-xs font-bold text-accent hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg hover:shadow-accent/20"
        >
          Explore Full Skillset <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
