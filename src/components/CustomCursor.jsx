import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ enabled }) {
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    let animFrame;
    const followMouse = () => {
      const trailing = trailingRef.current;
      const pointer = pointerRef.current;
      trailing.x += (pointer.x - trailing.x) * 0.18;
      trailing.y += (pointer.y - trailing.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(followMouse);
    };
    followMouse();
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'active' : ''}`}
      >
        <span className="cursor-orbit-spark" />
        <span className="cursor-orbit-spark" />
      </div>
    </>
  );
}
