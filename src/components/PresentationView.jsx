import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft, Play, Pause, Sparkles, Send, GraduationCap, Briefcase, Building
} from 'lucide-react';
import { teamMembers, advisors, projectMilestones } from '../data/membersData';
import AppDemo from './AppDemo';

export default function PresentationView({ onSelectMember, onSwitchToScroll }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const autoplayTimerRef = useRef(null);

  // Slides configuration with Slide 2 prioritized for 5 Team Members!
  const slides = [
    { id: 'intro', title: '1. Khởi Đầu & Logo Core', maxSteps: 3 },
    { id: 'team', title: '2. 5 Thành Viên Siêu Ngầu', maxSteps: 3 },
    { id: 'mission', title: '3. Sứ Mệnh & 5 Bước', maxSteps: 2 },
    { id: 'demo', title: '4. Prototype App Demo', maxSteps: 1 },
    { id: 'impact', title: '5. Tác Động & Bảng Giá', maxSteps: 2 },
    { id: 'contact', title: '6. Thông Điệp & Liên Hệ', maxSteps: 2 },
  ];

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentStep < slide.maxSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
      setCurrentStep(0);
    } else {
      setCurrentSlide(0);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentSlide > 0) {
      const prevSlideIndex = currentSlide - 1;
      setCurrentSlide(prevSlideIndex);
      setCurrentStep(slides[prevSlideIndex].maxSteps - 1);
    }
  };

  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, currentSlide, currentStep]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, currentStep]);

  const jumpToSlide = (index) => {
    setCurrentSlide(index);
    setCurrentStep(0);
  };

  return (
    <div className="presentation-container">
      {/* Sub Header Status Bar */}
      <div className="pres-header-bar">
        <div className="pres-slide-badge">
          🎬 <span className="pres-title-text">{slide.title}</span>
          <span className="pres-step-pill">Lớp {currentStep + 1} / {slide.maxSteps}</span>
          <span className="pres-kbd-hint navbar-hide-mobile">⌨ Mũi tên ◀ ▶ / Space để hiện lớp</span>
        </div>

        <div className="pres-header-actions">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`pres-btn ${isAutoplay ? 'active-purple' : ''}`}
            title={isAutoplay ? 'Tạm dừng tự động' : 'Tự động phát như video'}
          >
            {isAutoplay ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoplay ? 'Tạm Dừng Video' : 'Phát Tự Động'}</span>
          </button>

          <button onClick={onSwitchToScroll} className="pres-btn btn-secondary-sm">
            📜 Cuộn Trang
          </button>
        </div>
      </div>

      {/* Main Slide Stage Area */}
      <div className="pres-stage">
        {/* SLIDE 1: INTRO & LOGO CORE */}
        {currentSlide === 0 && (
          <div className="pres-slide-content">
            {currentStep >= 0 && (
              <div className="pres-layer-item fade-in-up">
                <div className="hero-badge" style={{ marginBottom: '14px' }}>
                  <Sparkles size={14} /> Team Khát Vọng (CalmX) — HUIT STARTUP 2026
                </div>
              </div>
            )}

            {currentStep >= 1 && (
              <div className="pres-layer-item fade-in-up">
                <div className="hero-logo-wrapper floating-anim" style={{ width: '160px', height: '160px', margin: '10px auto 20px auto' }}>
                  <div className="hero-logo-ring core-rotate" />
                  <div className="hero-logo-ring-inner" />
                  <div className="hero-logo-container core-pulse">
                    <img src="/calmx-cloud-logo.png" alt="CalmX Cloud Logo" className="hero-logo-img" />
                  </div>
                </div>
              </div>
            )}

            {currentStep >= 2 && (
              <div className="pres-layer-item fade-in-up">
                <h1 className="hero-title" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', marginBottom: '12px' }}>
                  Trải Nghiệm Không Gian Số <br />
                  <span className="cyber-text">CalmX Digital Orbit</span>
                </h1>
                <p className="hero-subtitle" style={{ maxWidth: '640px', fontSize: '1rem', marginBottom: '24px' }}>
                  Nền tảng check-in cảm xúc & đồng hành tự chăm sóc sức khỏe tinh thần.
                  Kết nối trí tuệ nhân tạo <strong style={{ color: '#c084fc' }}>AI Caly</strong> cùng 5 thành viên nhóm nhiệt huyết!
                </p>

                <div className="hero-stats-grid" style={{ maxWidth: '780px' }}>
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
            )}
          </div>
        )}

        {/* SLIDE 2: 5 TEAM MEMBERS (ƯU TIÊN CHIẾU THÀNH VIÊN TRƯỚC!) */}
        {currentSlide === 1 && (
          <div className="pres-slide-content">
            {currentStep >= 0 && (
              <div className="pres-layer-item fade-in-up">
                <div style={{ color: '#c084fc', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem', marginBottom: '4px' }}>
                  Team Khát Vọng (CalmX)
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: '800', marginBottom: '16px' }}>
                  Đội Nữ 5 Thành Viên <span className="cyber-text">Siêu Ngầu</span>
                </h2>
              </div>
            )}

            {currentStep >= 1 && (
              <div className="pres-layer-item fade-in-up">
                <div className="pres-team-grid">
                  {teamMembers.slice(0, 3).map((m) => (
                    <div key={m.id} className="glass-card interactive pres-team-card" onClick={() => onSelectMember(m)} onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectMember(m);
                      }
                    }} role="button" tabIndex={0} aria-label={`Xem thông tin ${m.name}`}>
                      <div className="avatar-frame-3d" style={{ height: '150px', marginBottom: '10px' }}>
                        <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: '700' }}>{m.role}</div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', margin: '2px 0' }}>{m.name}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{m.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep >= 2 && (
              <div className="pres-layer-item fade-in-up" style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '700', marginBottom: '8px' }}>
                  🚀 Thành Viên Phát Triển Hệ Thống & Ban Cố Vấn Dự Án
                </div>

                <div className="pres-team-grid-bottom">
                  {teamMembers.slice(3, 5).map((m) => (
                    <div key={m.id} className="glass-card interactive pres-team-card" onClick={() => onSelectMember(m)} onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectMember(m);
                      }
                    }} role="button" tabIndex={0} aria-label={`Xem thông tin ${m.name}`}>
                      <div className="avatar-frame-3d" style={{ height: '110px', marginBottom: '6px' }}>
                        <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ color: '#06b6d4', fontSize: '0.7rem', fontWeight: '700' }}>{m.role}</div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{m.name}</h3>
                    </div>
                  ))}

                  {advisors.map((adv, idx) => (
                    <div key={idx} className="glass-card pres-team-card" style={{ borderLeft: '3px solid #a855f7', padding: '10px' }}>
                      <div style={{ color: '#a855f7', fontSize: '0.7rem', fontWeight: '700' }}>Cố Vấn Dự Án</div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff', margin: '2px 0' }}>{adv.name}</h4>
                      <p style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{adv.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SLIDE 3: MISSION & 5-STEP JOURNEY */}
        {currentSlide === 2 && (
          <div className="pres-slide-content">
            {currentStep >= 0 && (
              <div className="pres-layer-item fade-in-up">
                <div style={{ color: '#06b6d4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem', marginBottom: '6px' }}>
                  Sứ Mệnh Dự Án CalmX
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: '800', marginBottom: '14px' }}>
                  Đồng Hành Chăm Sóc <span className="cyber-text">Cảm Xúc Mỗi Ngày</span>
                </h2>
                <p style={{ color: '#9ca3af', maxWidth: '680px', margin: '0 auto 24px auto', lineHeight: '1.5', fontSize: '0.95rem' }}>
                  CalmX đóng vai trò như một lớp hỗ trợ ban đầu, giúp người dùng check-in cảm xúc, ghi nhận xu hướng tâm trạng và nhận gợi ý phù hợp từ trợ lý AI Caly.
                </p>
              </div>
            )}

            {currentStep >= 1 && (
              <div className="pres-layer-item fade-in-up">
                <div style={{ fontWeight: '700', color: '#c084fc', marginBottom: '16px', fontSize: '1rem' }}>
                  🗺️ Hành Trình 5 Bước Sử Dụng Ứng Dụng
                </div>

                <div className="pres-journey-grid">
                  {projectMilestones.map((m, idx) => (
                    <div key={idx} className="glass-card pres-journey-card">
                      <div className="pres-journey-step">{m.step}</div>
                      <h4 style={{ color: '#fff', fontWeight: '700', margin: '6px 0 2px 0', fontSize: '0.92rem' }}>{m.title}</h4>
                      <p style={{ color: '#9ca3af', fontSize: '0.78rem', lineHeight: '1.3' }}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SLIDE 4: PROTOTYPE APP DEMO */}
        {currentSlide === 3 && (
          <div className="pres-slide-content" style={{ maxWidth: '950px' }}>
            <div className="pres-layer-item fade-in-up">
              <AppDemo />
            </div>
          </div>
        )}

        {/* SLIDE 5: IMPACT & PRICING */}
        {currentSlide === 4 && (
          <div className="pres-slide-content">
            {currentStep >= 0 && (
              <div className="pres-layer-item fade-in-up">
                <div style={{ color: '#c084fc', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem', marginBottom: '4px' }}>
                  Tác Động Xã Hội & Doanh Thu
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: '800', marginBottom: '16px' }}>
                  Mô Hình Hoạt Động Hướng Đến <span className="cyber-text">SDG 3 & 8</span>
                </h2>

                <div className="pres-impact-grid">
                  <div className="glass-card" style={{ padding: '16px' }}>
                    <GraduationCap size={24} color="#c084fc" />
                    <h4 style={{ color: '#fff', margin: '6px 0 2px 0', fontSize: '0.95rem' }}>Sinh Viên</h4>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Ghi nhận cảm xúc riêng tư & giảm áp lực học tập.</p>
                  </div>
                  <div className="glass-card" style={{ padding: '16px' }}>
                    <Briefcase size={24} color="#06b6d4" />
                    <h4 style={{ color: '#fff', margin: '6px 0 2px 0', fontSize: '0.95rem' }}>Người Đi Làm Trẻ</h4>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Theo dõi tâm trạng & giảm căng thẳng công sở.</p>
                  </div>
                  <div className="glass-card" style={{ padding: '16px' }}>
                    <Building size={24} color="#f43f5e" />
                    <h4 style={{ color: '#fff', margin: '6px 0 2px 0', fontSize: '0.95rem' }}>B2B Pilot</h4>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Gói phúc lợi tinh thần cho trường học & doanh nghiệp.</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep >= 1 && (
              <div className="pres-layer-item fade-in-up" style={{ marginTop: '20px' }}>
                <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '12px', fontSize: '0.95rem' }}>
                  💳 3 Gói Dịch Vụ Linh Hoạt
                </div>

                <div className="pres-pricing-grid">
                  <div className="glass-card" style={{ padding: '14px' }}>
                    <div style={{ color: '#9ca3af', fontWeight: '700', fontSize: '0.75rem' }}>Miễn Phí</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>0 VNĐ</div>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Check-in & Chat AI Caly cơ bản</p>
                  </div>

                  <div className="glass-card" style={{ padding: '14px', border: '2px solid #a855f7' }}>
                    <div style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.75rem' }}>Gói Medium</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>69.000 VNĐ</div>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Lưu nhật ký & báo cáo xu hướng</p>
                  </div>

                  <div className="glass-card" style={{ padding: '14px' }}>
                    <div style={{ color: '#06b6d4', fontWeight: '700', fontSize: '0.75rem' }}>Gói Premium</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>149.000 VNĐ</div>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Ưu tiên CalmX Care & nhạc sóng 432Hz</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SLIDE 6: FINAL MESSAGE & CONTACT */}
        {currentSlide === 5 && (
          <div className="pres-slide-content">
            {currentStep >= 0 && (
              <div className="pres-layer-item fade-in-up">
                <div style={{ color: '#f43f5e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem', marginBottom: '6px' }}>
                  Thông Điệp Cuối Dành Cho Bạn
                </div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
                  "Bạn Không Một Mình. <br />
                  <span className="cyber-text">CalmX Ở Đây Để Đồng Hành."</span>
                </h2>
                <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto 20px auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  CalmX - Lắng nghe • Thấu hiểu • Đồng hành | Team CalmX - HUIT STARTUP 2026.
                </p>
              </div>
            )}

            {currentStep >= 1 && (
              <div className="pres-layer-item fade-in-up">
                <div className="glass-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '20px' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px' }}>Gửi Lời Nhắn Tới Đội Ngũ CalmX</h4>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã gửi lời nhắn tới nhóm CalmX!'); }}>
                    <input type="text" placeholder="Họ tên của bạn" required className="pres-input" />
                    <input type="email" placeholder="Email liên hệ" required className="pres-input" />
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '10px' }}>
                      <Send size={15} /> Gửi Tin Nhắn Đồng Hành
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="pres-footer">
        <button onClick={handlePrev} className="pres-nav-btn">
          <ChevronLeft size={18} />
          <span>Trước</span>
        </button>

        <div className="pres-dots">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => jumpToSlide(idx)}
              className={`pres-dot ${currentSlide === idx ? 'active' : ''}`}
              title={s.title}
            >
              <span className="pres-dot-number">{idx + 1}</span>
            </button>
          ))}
        </div>

        <button onClick={handleNext} className="pres-nav-btn highlight">
          <span>{currentStep < slide.maxSteps - 1 ? `Hiện Lớp (${currentStep + 2}/${slide.maxSteps})` : 'Slide Sau ▶'}</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        /* ===== Presentation View Layout ===== */
        .presentation-container {
          min-height: 100vh;
          padding-top: 120px;
          padding-bottom: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .pres-header-bar {
          position: fixed;
          top: 68px;
          left: 0; right: 0;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 24px;
          background: rgba(7, 5, 16, 0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(192, 132, 252, 0.2);
        }

        .pres-slide-badge {
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pres-step-pill {
          background: rgba(6, 182, 212, 0.2);
          color: #38bdf8;
          border: 1px solid rgba(6, 182, 212, 0.4);
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .pres-kbd-hint {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #9ca3af;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 6px;
          margin-left: 6px;
        }

        .pres-header-actions {
          display: flex;
          gap: 8px;
        }

        .pres-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(192, 132, 252, 0.3);
          color: #d1d5db;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pres-btn:hover {
          background: rgba(168, 85, 247, 0.2);
          color: #c084fc;
        }
        .pres-btn.active-purple {
          background: rgba(168, 85, 247, 0.25);
          color: #c084fc;
          border-color: #a855f7;
        }

        .btn-secondary-sm {
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.4);
          color: #38bdf8;
        }

        /* ===== Stage Area ===== */
        .pres-stage {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pres-slide-content {
          width: 100%;
          text-align: center;
        }

        .fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Journey & Team & Pricing Grids inside Presentation */
        .pres-journey-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 12px;
        }
        .pres-journey-card {
          padding: 12px;
          text-align: center;
        }
        .pres-journey-step {
          font-weight: 800;
          color: #c084fc;
          font-size: 1.1rem;
        }

        .pres-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 800px;
          margin: 0 auto;
        }
        .pres-team-grid-bottom {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 850px;
          margin: 0 auto;
        }
        .pres-team-card {
          padding: 12px;
          text-align: center;
        }

        .pres-impact-grid, .pres-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 850px;
          margin: 0 auto;
        }

        .pres-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(192, 132, 252, 0.3);
          border-radius: 10px;
          padding: 8px 12px;
          color: #fff;
          outline: none;
          margin-bottom: 8px;
          font-size: 0.85rem;
        }

        /* ===== Footer Control Bar ===== */
        .pres-footer {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(19, 13, 38, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-glow);
          border-radius: 999px;
          padding: 6px 14px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.3);
        }

        .pres-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pres-nav-btn:hover {
          background: rgba(192, 132, 252, 0.2);
          transform: scale(1.04);
        }
        .pres-nav-btn.highlight {
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .pres-dots {
          display: flex;
          gap: 6px;
        }

        .pres-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #9ca3af;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .pres-dot.active {
          background: #a855f7;
          border-color: #c084fc;
          color: #fff;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
          transform: scale(1.1);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .pres-title-text { display: none; }
          .pres-header-bar {
            top: 60px;
            padding: 6px 12px;
          }
          .pres-team-grid, .pres-team-grid-bottom, .pres-impact-grid, .pres-pricing-grid {
            grid-template-columns: 1fr;
          }
          .pres-footer {
            width: 95%;
            justify-content: space-between;
            gap: 4px;
            padding: 6px 10px;
          }
          .pres-dots {
            gap: 4px;
          }
          .pres-dot {
            width: 24px;
            height: 24px;
            font-size: 0.68rem;
          }
          .pres-nav-btn span {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
