import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ performanceMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = performanceMode ? 35 : 90;
    const particles = [];

    const mouse = { x: width / 2, y: height / 2, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const colors = ['rgba(168, 85, 247, ', 'rgba(6, 182, 212, ', 'rgba(192, 132, 252, ', 'rgba(236, 72, 153, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint gradient space glow
      const bgGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        width * 0.6
      );
      bgGlow.addColorStop(0, 'rgba(30, 16, 60, 0.25)');
      bgGlow.addColorStop(1, 'rgba(7, 5, 16, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += Math.sin(Date.now() * p.pulseSpeed + idx) * 0.01;
        const clampedAlpha = Math.max(0.1, Math.min(0.9, p.alpha));

        // Distance from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${clampedAlpha})`;
        ctx.fill();

        // Connect lines between nearby particles
        if (!performanceMode) {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pDistance = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (pDistance < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - pDistance / 100)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
