import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import TeamModal from './components/TeamModal';
import AppDemo from './components/AppDemo';
import ImpactPricing from './components/ImpactPricing';
import Footer from './components/Footer';
import PresentationView from './components/PresentationView';

export default function App() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [performanceMode, setPerformanceMode] = useState(
    () => localStorage.getItem('calmx_performance_mode') === 'true' || prefersReducedMotion
  );
  const [cursorEnabled, setCursorEnabled] = useState(
    () => localStorage.getItem('calmx_cursor_enabled') !== 'false' && !prefersReducedMotion
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('calmx_view_mode') || 'presentation'
  );

  useEffect(() => {
    localStorage.setItem('calmx_performance_mode', String(performanceMode));
  }, [performanceMode]);

  useEffect(() => {
    localStorage.setItem('calmx_cursor_enabled', String(cursorEnabled));
  }, [cursorEnabled]);

  useEffect(() => {
    localStorage.setItem('calmx_view_mode', viewMode);
  }, [viewMode]);

  return (
    <div className="calmx-app-root">
      {/* Interactive WebGL / Canvas particle background */}
      <CanvasBackground performanceMode={performanceMode} />

      {/* Futuristic neon custom cursor */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Main Navbar with ViewMode switcher */}
      <Navbar
        performanceMode={performanceMode}
        setPerformanceMode={setPerformanceMode}
        cursorEnabled={cursorEnabled}
        setCursorEnabled={setCursorEnabled}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* VIEW MODE 1: CINEMATIC PRESENTATION DECK (Trình chiếu từng lớp như Video) */}
      {viewMode === 'presentation' ? (
        <PresentationView
          onSelectMember={(member) => setSelectedMember(member)}
          onSwitchToScroll={() => setViewMode('scroll')}
        />
      ) : (
        /* VIEW MODE 2: CONTINUOUS SCROLL MODE (Cuộn trang truyền thống) */
        <>
          <Hero />
          <TeamSection onSelectMember={(member) => setSelectedMember(member)} />
          <AppDemo />
          <ImpactPricing />
          <Footer />
        </>
      )}

      {/* Fullscreen Member Detail Modal (Works seamlessly in both modes!) */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
