import { useEffect, useRef, useCallback, useState } from 'react';

const RoadmapCanvas = ({ children, nodes = [], activePath = true, onNodeActive }) => {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const trailRef = useRef(null);
  const nodesRef = useRef(null);
  const glowRef = useRef(null);
  const mainRef = useRef(null);
  const particlesRef = useRef(null);
  const tickRef = useRef(null);

  const [coords, setCoords] = useState([]);

  const state = useRef({
    W: 0, H: 0,
    pts: [],
    animPct: 0, targetPct: 0,
    particles: [],
    mouseX: -1,
    autoPct: 0, autoDir: 1,
    raf: null,
    lastActiveNode: -1
  });

  const getPoints = useCallback((W, H) => {
    const pts = [];
    const pad = 50, midY = H * 0.45, wave = H * 0.15, steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push([
        pad + t * (W - pad * 2),
        midY + Math.sin(t * Math.PI * 2.5) * wave * (1 - t * 0.2),
      ]);
    }
    return pts;
  }, []);

  const toD = (pts) => {
    if (!pts.length) return '';
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1], [cx, cy] = pts[i];
      d += ` C ${(px + cx) / 2} ${py} ${(px + cx) / 2} ${cy} ${cx} ${cy}`;
    }
    return d;
  };

  const atPct = useCallback((pct) => {
    const { pts } = state.current;
    if (!pts.length) return [0, 0];
    const raw = pct * (pts.length - 1);
    const i = Math.min(Math.floor(raw), pts.length - 2);
    const t = raw - i;
    return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
  }, []);

  const drawNodes = useCallback((pct) => {
    const g = nodesRef.current;
    if (!g) return;
    const ns = 'http://www.w3.org/2000/svg';
    while (g.firstChild) g.removeChild(g.firstChild);

    let activeIdx = -1;

    nodes.forEach((n, idx) => {
      const [x, y] = atPct(n.pct);
      const done = pct >= n.pct - 0.01;
      const active = Math.abs(pct - n.pct) < 0.05;

      if (active) {
        activeIdx = idx;
        const halo = document.createElementNS(ns, 'circle');
        halo.setAttribute('cx', x); halo.setAttribute('cy', y);
        halo.setAttribute('r', 18); halo.setAttribute('fill', 'url(#rmc-node-glow)');
        g.appendChild(halo);
      }

      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y);
      c.setAttribute('r', active ? 8 : done ? 6 : 5);
      c.setAttribute('fill', done ? (active ? 'hsl(var(--accent))' : 'rgba(var(--accent-rgb),0.4)') : 'rgba(var(--foreground-rgb),0.1)');
      c.setAttribute('stroke', done ? 'hsl(var(--accent))' : 'rgba(var(--accent-rgb),0.2)');
      c.setAttribute('stroke-width', active ? 2 : 1.5);
      if (active) c.setAttribute('filter', 'url(#rmc-glow-sm)');
      g.appendChild(c);
    });

    if (activeIdx !== state.current.lastActiveNode) {
      state.current.lastActiveNode = activeIdx;
      if (onNodeActive) onNodeActive(activeIdx);
    }
  }, [nodes, onNodeActive, atPct]);

  const drawTrail = useCallback((pct) => {
    const g = trailRef.current; if (!g) return;
    const ns = 'http://www.w3.org/2000/svg';
    while (g.firstChild) g.removeChild(g.firstChild);
    const start = Math.max(0, pct - 0.18);
    for (let i = 0; i < 20; i++) {
      const t = start + (i / 20) * (pct - start);
      const [x, y] = atPct(t);
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y);
      c.setAttribute('r', 1 + (i / 20) * 2);
      c.setAttribute('fill', `rgba(var(--accent-rgb),${((i / 20) * 0.6).toFixed(2)})`);
      g.appendChild(c);
    }
  }, [atPct]);

  const drawParticles = useCallback(() => {
    const g = particlesRef.current; if (!g) return;
    const ns = 'http://www.w3.org/2000/svg';
    while (g.firstChild) g.removeChild(g.firstChild);
    state.current.particles = state.current.particles.filter(p => p.life > 0);
    state.current.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', p.r);
      c.setAttribute('fill', `rgba(var(--accent-rgb),${(p.life * 0.7).toFixed(2)})`);
      g.appendChild(c);
    });
  }, []);

  const tick = useCallback(() => {
    const s = state.current;
    s.animPct += (s.targetPct - s.animPct) * 0.05;
    const [px, py] = atPct(s.animPct);

    if (dotRef.current) { dotRef.current.setAttribute('cx', px); dotRef.current.setAttribute('cy', py); }
    if (haloRef.current) { haloRef.current.setAttribute('cx', px); haloRef.current.setAttribute('cy', py); }

    const subPts = s.pts.slice(0, Math.max(2, Math.floor(s.animPct * s.pts.length)));
    if (glowRef.current) glowRef.current.setAttribute('d', toD(subPts));

    drawTrail(s.animPct);
    drawNodes(s.animPct);

    if (Math.random() < 0.3) {
      const a = Math.random() * Math.PI * 2, sp = 0.3 + Math.random() * 0.7;
      s.particles.push({
        x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 1, decay: 0.015 + Math.random() * 0.02, r: 1 + Math.random() * 2
      });
    }
    drawParticles();

    s.raf = requestAnimationFrame(tickRef.current);
  }, [drawNodes, drawTrail, drawParticles, atPct]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;

    const resize = () => {
      const { width: W, height: H } = wrap.getBoundingClientRect();
      state.current.W = W; state.current.H = H;
      svgRef.current?.setAttribute('viewBox', `0 0 ${W} ${H}`);
      state.current.pts = getPoints(W, H);

      const d = toD(state.current.pts);
      mainRef.current?.setAttribute('d', d);

      // Recalculate pixel coordinates for all nodes to sync with children
      const newCoords = nodes.map(n => {
        const [x, y] = atPct(n.pct);
        return { x, y };
      });
      setCoords(newCoords);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      state.current.mouseX = e.clientX - rect.left;
      state.current.targetPct = Math.max(0, Math.min(1, state.current.mouseX / state.current.W));
    };
    const onLeave = () => { state.current.mouseX = -1; };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    const auto = setInterval(() => {
      const s = state.current;
      if (s.mouseX < 0) {
        s.autoPct += s.autoDir * 0.003;
        if (s.autoPct >= 1) s.autoDir = -1;
        if (s.autoPct <= 0) s.autoDir = 1;
        s.targetPct = s.autoPct;
      }
    }, 16);

    state.current.raf = requestAnimationFrame(tickRef.current);

    const currentState = state.current;

    return () => {
      ro.disconnect();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      clearInterval(auto);
      if (currentState.raf) cancelAnimationFrame(currentState.raf);
    };
  }, [getPoints, tick, nodes, atPct]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden min-h-[600px]">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(var(--accent-rgb), 0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--accent-rgb), 0.15) 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
        animation: 'rmc-grid 20s linear infinite',
      }} />

      <style>{`
        @keyframes rmc-grid { from{background-position:0 0} to{background-position:48px 48px} }
      `}</style>

      {activePath && (
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="rmc-glow-sm"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="rmc-glow-lg"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <radialGradient id="rmc-node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(var(--accent-rgb),1)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgba(var(--accent-rgb),1)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path ref={mainRef} fill="none" stroke="rgba(var(--accent-rgb),0.2)" strokeWidth="1.5" strokeDasharray="6 6" />
          <path ref={glowRef} fill="none" stroke="rgba(var(--accent-rgb),0.5)" strokeWidth="2.5" filter="url(#rmc-glow-sm)" />
          <g ref={trailRef} />
          <circle ref={dotRef} r="5" fill="hsl(var(--accent))" filter="url(#rmc-glow-lg)" />
          <circle ref={haloRef} r="10" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.4" />
          <g ref={nodesRef} />
          <g ref={particlesRef} />
        </svg>
      )}

      <div className="absolute inset-0 pointer-events-none z-20" style={{
        background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(var(--background), 0.4) 100%)`
      }} />

      <div className="absolute inset-0 z-30 pointer-events-none">
        {typeof children === 'function' ? children(coords) : children}
      </div>
    </div>
  );
};

export default RoadmapCanvas;