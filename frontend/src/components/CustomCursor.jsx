import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isSelectable = target.closest('button, a, .clickable, input, textarea');
      const isHiddenTarget = target.closest('.hide-custom-cursor');
      
      setIsHovering(!!isSelectable);
      setIsHidden(!!isHiddenTarget);
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          opacity: (isHidden || isHovering) ? 0 : 1,
          scale: isClicking ? 0.5 : 1,
        }}
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
      />
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        animate={{
          opacity: isHidden ? 0 : 1,
          width: isHovering ? 80 : 36,
          height: isHovering ? 80 : 36,
          backgroundColor: isHovering ? 'hsl(var(--accent) / 0.15)' : 'transparent',
          borderColor: isHovering ? 'hsl(var(--accent) / 0.3)' : 'hsl(var(--accent) / 0.5)',
          backdropFilter: isHovering ? 'blur(4px)' : 'blur(0px)',
          scale: isClicking ? 0.85 : 1,
        }}
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
