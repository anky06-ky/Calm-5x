import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ performanceMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isCompact = window.innerWidth < 768;
    const particleCount = reducedMotion ? 24 : performanceMode ? 34 : isCompact ? 46 : 82;
    const colors = [
      'rgba(168, 85, 247, ',
      'rgba(6, 182, 212, ',
      'rgba(192, 132, 252, ',
      'rgba(236, 72, 153, ',
    ];

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;
    let isRunning = !document.hidden;
    const mouse = { x: width / 2, y: height / 2, radius: finePointer ? 170 : 0 };
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.7,
      colorPrefix: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.55 + 0.2,
      speedX: (Math.random() - 0.5) * 0.34,
      speedY: (Math.random() - 0.5) * 0.34,
      pulseSpeed: Math.random() * 0.0018 + 0.0006,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, performanceMode ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (timestamp = 0) => {
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.72
      );
      glow.addColorStop(0, 'rgba(30, 16, 60, 0.22)');
      glow.addColorStop(1, 'rgba(7, 5, 16, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
        }

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion && mouse.radius > 0 && distance > 0 && distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= (dx / distance) * force * 1.25;
          particle.y -= (dy / distance) * force * 1.25;
        }

        const alpha = Math.max(
          0.1,
          Math.min(
            0.86,
            particle.baseAlpha +
              Math.sin(timestamp * particle.pulseSpeed + particle.pulseOffset) * 0.15
          )
        );
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.colorPrefix}${alpha})`;
        ctx.fill();

        if (!performanceMode && !isCompact && !reducedMotion) {
          for (let next = index + 1; next < particles.length; next += 1) {
            const other = particles[next];
            const gap = Math.hypot(particle.x - other.x, particle.y - other.y);
            if (gap < 96) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.11 * (1 - gap / 96)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      });

      if (isRunning && !reducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning && !reducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    if (finePointer) window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
