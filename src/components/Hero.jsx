import React from 'react';
import { Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '110px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Badge */}
        <div className="hero-badge">
          <Sparkles size={16} /> Team Khát Vọng (CalmX) — HUIT STARTUP 2026
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Trải Nghiệm Không Gian Số <br />
          <span className="cyber-text">CalmX Digital Orbit</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Nền tảng check-in cảm xúc & đồng hành tự chăm sóc sức khỏe tinh thần.
          Kết nối trí tuệ nhân tạo <strong style={{ color: '#c084fc' }}>AI Caly</strong> cùng 5 thành viên nhóm nhiệt huyết!
        </p>

        {/* Cloud Logo with glow ring */}
        <div className="hero-logo-wrapper floating-anim">
          {/* Outer glow ring */}
          <div className="hero-logo-ring core-rotate" />
          {/* Inner glow ring */}
          <div className="hero-logo-ring-inner" />
          {/* Cloud Logo Image */}
          <div className="hero-logo-container core-pulse">
            <img
              src="/calmx-cloud-logo.png"
              alt="CalmX Cloud Logo"
              className="hero-logo-img"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-buttons">
          <a href="#team" className="btn-primary">
            <Users size={18} /> Gặp Mặt 5 Thành Viên <ArrowRight size={18} />
          </a>
          <a href="#demo" className="btn-secondary">
            <ShieldCheck size={18} /> Dùng Thử App Demo
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="glass-card hero-stat-card">
            <div className="hero-stat-value" style={{ color: '#c084fc' }}>05</div>
            <div className="hero-stat-label">Thành Viên Siêu Ngầu</div>
          </div>

          <div className="glass-card hero-stat-card">
            <div className="hero-stat-value" style={{ color: '#38bdf8' }}>06</div>
            <div className="hero-stat-label">Màn Hình App Demo</div>
          </div>

          <div className="glass-card hero-stat-card">
            <div className="hero-stat-value" style={{ color: '#f43f5e' }}>AI Caly</div>
            <div className="hero-stat-label">Trợ Lý Thấu Cảm</div>
          </div>

          <div className="glass-card hero-stat-card">
            <div className="hero-stat-value" style={{ color: '#a855f7' }}>432 Hz</div>
            <div className="hero-stat-label">Âm Thanh Thư Giãn</div>
          </div>
        </div>
      </div>
    </section>
  );
}

