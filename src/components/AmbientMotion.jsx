import React, { useEffect, useRef } from 'react';

const orbs = [
  { left: '6%', top: '18%', size: 72, duration: 14, delay: -2, color: '#a855f7' },
  { left: '84%', top: '12%', size: 48, duration: 11, delay: -7, color: '#38bdf8' },
  { left: '92%', top: '62%', size: 88, duration: 17, delay: -4, color: '#ec4899' },
  { left: '12%', top: '72%', size: 42, duration: 12, delay: -9, color: '#06b6d4' },
  { left: '52%', top: '84%', size: 58, duration: 15, delay: -6, color: '#c084fc' },
];

export default function AmbientMotion({ performanceMode = false }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (
      !layer ||
      performanceMode ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return undefined;

    let frameId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isRunning = !document.hidden;

    const render = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      layer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (isRunning) frameId = requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * -18;
      targetY = (event.clientY / window.innerHeight - 0.5) * -14;
    };

    const handleScroll = () => {
      targetY = Math.sin(window.scrollY * 0.0015) * 12;
    };

    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning) {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(frameId);
    };
  }, [performanceMode]);

  return (
    <div ref={layerRef} className="ambient-motion" aria-hidden="true">
      {orbs.map((orb, index) => (
        <span
          key={index}
          className="ambient-orb"
          style={{
            '--orb-left': orb.left,
            '--orb-top': orb.top,
            '--orb-size': `${orb.size}px`,
            '--orb-duration': `${orb.duration}s`,
            '--orb-delay': `${orb.delay}s`,
            '--orb-color': orb.color,
          }}
        />
      ))}
      <span className="ambient-comet ambient-comet-one" />
      <span className="ambient-comet ambient-comet-two" />
      <span className="ambient-comet ambient-comet-three" />
    </div>
  );
}
