import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Zap, Menu, X, MousePointer, ShieldCheck, Film, Layers } from 'lucide-react';

export default function Navbar({
  performanceMode,
  setPerformanceMode,
  cursorEnabled,
  setCursorEnabled,
  viewMode,
  setViewMode
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => () => {
    if (audioCtx) audioCtx.close().catch(() => {});
  }, [audioCtx]);

  const toggleSound = () => {
    if (!isPlayingSound) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setAudioCtx(ctx);
        setIsPlayingSound(true);
      } catch (err) { console.error('Audio synth error:', err); }
    } else {
      if (audioCtx) audioCtx.close();
      setIsPlayingSound(false);
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Trang Chủ' },
    { href: '#team', label: 'Thành Viên (5)' },
    { href: '#demo', label: 'App Demo' },
    { href: '#impact', label: 'Tác Động & Giá' },
    { href: '#contact', label: 'Liên Hệ' },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Brand */}
          <a href="#hero" className="navbar-brand">
            <div className="navbar-brand-icon">
              <Sparkles size={20} color="#fff" />
            </div>
            <div className="navbar-brand-text">
              <div className="navbar-brand-name">Calm<span>X</span></div>
              <div className="navbar-brand-sub">CalmX • HUIT STARTUP 2026</div>
            </div>
          </a>

          {/* Mode Switcher Toggle Button */}
          <div className="navbar-mode-switch">
            <button
              onClick={() => setViewMode(viewMode === 'presentation' ? 'scroll' : 'presentation')}
              className="mode-toggle-btn"
              title={viewMode === 'presentation' ? 'Chuyển sang chế độ cuộn trang' : 'Chuyển sang chế độ trình chiếu điện ảnh'}
            >
              {viewMode === 'presentation' ? (
                <>
                  <Film size={16} color="#c084fc" /> 🎬 <span className="mode-btn-text">Đang Trình Chiếu</span>
                </>
              ) : (
                <>
                  <Layers size={16} color="#38bdf8" /> 📜 <span className="mode-btn-text">Đang Cuộn Trang</span>
                </>
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          {viewMode === 'scroll' && (
            <nav className="navbar-desktop-nav">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
              ))}
            </nav>
          )}

          {/* Right Controls */}
          <div className="navbar-controls">
            <button onClick={toggleSound} aria-pressed={isPlayingSound} aria-label={isPlayingSound ? 'Tắt âm thanh 432Hz' : 'Bật âm thanh 432Hz'} title={isPlayingSound ? 'Tắt âm thanh' : 'Bật 432Hz'} className={`navbar-icon-btn ${isPlayingSound ? 'active-purple' : ''} navbar-hide-mobile`}>
              {isPlayingSound ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
            <button onClick={() => setPerformanceMode(!performanceMode)} aria-pressed={performanceMode} aria-label="Chế độ tiết kiệm hiệu năng" title="Performance" className={`navbar-icon-btn ${performanceMode ? 'active-cyan' : ''} navbar-hide-mobile`}>
              <Zap size={17} />
            </button>
            <button onClick={() => setCursorEnabled(!cursorEnabled)} aria-pressed={cursorEnabled} aria-label="Con trỏ tùy chỉnh" title="Cursor" className={`navbar-icon-btn ${cursorEnabled ? 'active-pink' : ''} navbar-hide-mobile`}>
              <MousePointer size={17} />
            </button>

            <a href="#demo" className="btn-primary navbar-cta">
              <ShieldCheck size={15} /> <span className="navbar-cta-text">Demo</span>
            </a>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="navbar-hamburger" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label="Mở menu điều hướng">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMobile}>
          <div id="mobile-navigation" className="mobile-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Điều hướng">
            <div className="mobile-drawer-header">
              <div className="navbar-brand-name" style={{ fontSize: '1.6rem' }}>Calm<span>X</span></div>
              <button onClick={closeMobile} className="navbar-icon-btn"><X size={22} /></button>
            </div>

            {/* Mode Switcher in Drawer */}
            <div style={{ marginBottom: '16px' }}>
              <button
                onClick={() => {
                  setViewMode(viewMode === 'presentation' ? 'scroll' : 'presentation');
                  closeMobile();
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}
              >
                {viewMode === 'presentation' ? '📜 Chuyển Sang Cuộn Trang' : '🎬 Chuyển Sang Trình Chiếu'}
              </button>
            </div>

            {viewMode === 'scroll' && (
              <nav className="mobile-drawer-nav">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="mobile-drawer-link" onClick={closeMobile}>
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            <div className="mobile-drawer-controls">
              <button onClick={toggleSound} className={`navbar-icon-btn ${isPlayingSound ? 'active-purple' : ''}`}>
                {isPlayingSound ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span>{isPlayingSound ? 'Tắt âm thanh' : 'Bật 432Hz'}</span>
              </button>
              <button onClick={() => setPerformanceMode(!performanceMode)} className={`navbar-icon-btn ${performanceMode ? 'active-cyan' : ''}`}>
                <Zap size={18} />
                <span>{performanceMode ? 'Performance: Bật' : 'Performance: Tắt'}</span>
              </button>
              <button onClick={() => setCursorEnabled(!cursorEnabled)} className={`navbar-icon-btn ${cursorEnabled ? 'active-pink' : ''}`}>
                <MousePointer size={18} />
                <span>{cursorEnabled ? 'Cursor: Bật' : 'Cursor: Tắt'}</span>
              </button>
            </div>

            <a href="#demo" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} onClick={closeMobile}>
              <ShieldCheck size={18} /> Trải Nghiệm Demo
            </a>
          </div>
        </div>
      )}

      <style>{`
        .navbar-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 16px 0;
          background: transparent;
          transition: all 0.3s ease;
        }
        .navbar-scrolled {
          padding: 10px 0;
          background: rgba(7, 5, 16, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(192, 132, 252, 0.2);
        }
        .navbar-inner {
          display: flex; align-items: center; justify-content: space-between;
        }
        .navbar-brand {
          text-decoration: none; display: flex; align-items: center; gap: 10px;
        }
        .navbar-brand-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
          flex-shrink: 0;
        }
        .navbar-brand-name {
          font-size: 1.3rem; font-weight: 800; letter-spacing: -0.5px; color: #fff;
          font-family: 'Outfit', sans-serif;
        }
        .navbar-brand-name span { color: #06b6d4; }
        .navbar-brand-sub {
          font-size: 0.62rem; color: #c084fc; text-transform: uppercase; letter-spacing: 0.8px;
        }

        /* Mode Switcher Toggle */
        .mode-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.15);
          border: 1.5px solid rgba(192, 132, 252, 0.4);
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.25);
        }
        .mode-toggle-btn:hover {
          background: rgba(168, 85, 247, 0.3);
          transform: scale(1.05);
          box-shadow: 0 0 22px rgba(168, 85, 247, 0.5);
        }

        .navbar-desktop-nav {
          display: flex; align-items: center; gap: 22px;
        }
        .nav-link {
          color: #d1d5db; text-decoration: none; font-size: 0.92rem;
          font-weight: 500; transition: color 0.2s ease; position: relative;
        }
        .nav-link:hover { color: #c084fc; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0%; height: 2px;
          background: linear-gradient(90deg, #a855f7, #06b6d4);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .navbar-controls {
          display: flex; align-items: center; gap: 10px;
        }
        .navbar-icon-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%; width: 36px; height: 36px; color: #9ca3af;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .navbar-icon-btn.active-purple { background: rgba(168,85,247,0.2); color: #c084fc; border-color: rgba(192,132,252,0.4); }
        .navbar-icon-btn.active-cyan { background: rgba(6,182,212,0.2); color: #38bdf8; border-color: rgba(6,182,212,0.4); }
        .navbar-icon-btn.active-pink { background: rgba(236,72,153,0.2); color: #f43f5e; border-color: rgba(236,72,153,0.4); }
        .navbar-cta {
          padding: 9px 16px; font-size: 0.82rem;
        }
        .navbar-hamburger {
          display: none;
          background: none; border: none; color: #fff; cursor: pointer; padding: 4px;
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(5, 3, 14, 0.7);
          backdrop-filter: blur(8px);
          animation: fadeIn 0.2s ease;
        }
        .mobile-drawer {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          background: linear-gradient(180deg, rgba(15, 10, 35, 0.98), rgba(7, 5, 16, 0.99));
          border-left: 1px solid rgba(192, 132, 252, 0.3);
          padding: 24px 20px;
          display: flex; flex-direction: column;
          animation: slideIn 0.3s ease;
          overflow-y: auto;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .mobile-drawer-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 20px;
        }
        .mobile-drawer-nav {
          display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px;
        }
        .mobile-drawer-link {
          color: #e9d5ff; text-decoration: none; font-size: 1.1rem; font-weight: 600;
          padding: 12px 14px; border-radius: 12px;
          transition: background 0.2s ease;
        }
        .mobile-drawer-link:hover, .mobile-drawer-link:active {
          background: rgba(168, 85, 247, 0.15); color: #c084fc;
        }
        .mobile-drawer-controls {
          display: flex; flex-direction: column; gap: 8px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 16px;
        }
        .mobile-drawer-controls .navbar-icon-btn {
          width: 100%; border-radius: 12px; height: auto;
          padding: 10px 14px; gap: 10px; justify-content: flex-start;
        }
        .mobile-drawer-controls .navbar-icon-btn span {
          font-size: 0.85rem; color: #d1d5db;
        }

        @media (max-width: 900px) {
          .navbar-desktop-nav { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-hide-mobile { display: none !important; }
        }
        @media (max-width: 580px) {
          .mode-btn-text { display: none; }
          .navbar-cta { display: none !important; }
          .navbar-brand-sub { display: none; }
          .navbar-brand-icon { width: 34px; height: 34px; }
        }
      `}</style>
    </>
  );
}
