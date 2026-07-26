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
import CinematicIntro from './components/CinematicIntro';
import ScrollProgress from './components/ScrollProgress';
import AmbientMotion from './components/AmbientMotion';

const readPreference = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const writePreference = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences are optional when storage is unavailable (for example, private browsing).
  }
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, [query]);

  return matches;
};

export default function App() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const supportsCustomCursor = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [performanceMode, setPerformanceMode] = useState(
    () => readPreference('calmx_performance_mode', 'false') === 'true' || prefersReducedMotion
  );
  const [cursorEnabled, setCursorEnabled] = useState(
    () =>
      readPreference('calmx_cursor_enabled', 'true') !== 'false' &&
      !prefersReducedMotion &&
      supportsCustomCursor
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    writePreference('calmx_performance_mode', String(performanceMode));
  }, [performanceMode]);

  useEffect(() => {
    writePreference('calmx_cursor_enabled', String(cursorEnabled));
  }, [cursorEnabled]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPerformanceMode(true);
      setCursorEnabled(false);
    }
  }, [prefersReducedMotion]);

  const completeIntro = () => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  };

  return (
    <div className={`calmx-app-root ${performanceMode ? 'performance-mode' : ''}`}>
      {/* Interactive WebGL / Canvas particle background */}
      <CanvasBackground performanceMode={performanceMode} />
      <AmbientMotion performanceMode={performanceMode} />

      {/* Futuristic neon custom cursor */}
      <CustomCursor enabled={cursorEnabled && supportsCustomCursor} />
      {!showIntro && <ScrollProgress />}

      {!showIntro && (
        <>
          <a className="skip-link" href="#main-content">Bỏ qua điều hướng</a>
          <Navbar
            performanceMode={performanceMode}
            setPerformanceMode={setPerformanceMode}
            cursorEnabled={cursorEnabled}
            setCursorEnabled={setCursorEnabled}
            onReplayIntro={() => {
              setSelectedMember(null);
              window.scrollTo({ top: 0, behavior: 'auto' });
              setShowIntro(true);
            }}
          />
        </>
      )}

      {showIntro ? (
        <CinematicIntro
          paused={Boolean(selectedMember)}
          onSelectMember={setSelectedMember}
          onComplete={completeIntro}
        />
      ) : (
        <main id="main-content" tabIndex="-1">
          <Hero onSelectMember={setSelectedMember} />
          <TeamSection onSelectMember={(member) => setSelectedMember(member)} />
          <AppDemo />
          <ImpactPricing />
          <Footer />
        </main>
      )}

      {/* Fullscreen Member Detail Modal (Works seamlessly in both modes!) */}
      <TeamModal
        compact={showIntro}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onSelectMember={setSelectedMember}
      />
    </div>
  );
}
