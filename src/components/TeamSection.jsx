import React, { useState } from 'react';
import { teamMembers, advisors } from '../data/membersData';
import { Users, Eye, Sparkles, Award, Facebook, Linkedin, Github, Mail, HelpCircle } from 'lucide-react';

export default function TeamSection({ onSelectMember }) {
  const [filter, setFilter] = useState('all'); // all, real, placeholder, advisors
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle((prev) => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    }));
  };

  const filteredMembers = teamMembers.filter((m) => {
    if (filter === 'real') return !m.isPlaceholder;
    if (filter === 'placeholder') return m.isPlaceholder;
    return true;
  });

  return (
    <section id="team" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#c084fc',
              fontSize: '0.88rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: '10px',
              letterSpacing: '1px',
            }}
          >
            <Users size={16} /> Đội Nữ Nòng Cốt CalmX
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '16px' }}>
            5 Thành Viên <span className="cyber-text">Siêu Ngầu & Nhiệt Huyết</span>
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Đội ngũ kết hợp hoàn hảo giữa Quản lý chiến lược, Lập trình ứng dụng, Thiết kế UI/UX thấu cảm, Trí tuệ nhân tạo AI và Phát triển cộng đồng.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '45px',
          }}
        >
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          >
            Tất Cả 5 Thành Viên Nòng Cốt
          </button>
          <button
            onClick={() => setFilter('advisors')}
            className={filter === 'advisors' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          >
            Ban Cố Vấn Dự Án (2)
          </button>
        </div>

        {/* Members 3D Grid */}
        {filter !== 'advisors' && (
          <div className="team-members-grid">
            {filteredMembers.map((m) => (
              <div
                key={m.id}
                className="glass-card interactive"
                onMouseMove={(e) => handleMouseMove(e, m.id)}
                onMouseLeave={() => handleMouseLeave(m.id)}
                onClick={() => onSelectMember(m)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectMember(m);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Xem thông tin ${m.name}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  transform: tiltStyle[m.id] || 'none',
                  transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Avatar */}
                  <div className="avatar-frame-3d team-member-avatar" style={{ marginBottom: '20px' }}>
                    <img
                      src={m.image}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    {m.isPlaceholder && (
                      <div className="placeholder-badge">
                        Avatar 3D Tạm Thời
                      </div>
                    )}
                  </div>

                  {/* Role */}
                  <div style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {m.role}
                  </div>

                  {/* Name */}
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                    {m.name}
                  </h3>

                  {/* Tagline */}
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {m.tagline}
                  </p>

                  {/* Skills badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {m.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(192, 132, 252, 0.2)',
                          color: '#e9d5ff',
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={14} /> Xem Hồ Sơ 3D
                  </span>
                  <div style={{ display: 'flex', gap: '8px', color: '#9ca3af' }}>
                    <Facebook size={16} />
                    <Linkedin size={16} />
                    <Github size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Advisors Display */}
        {(filter === 'all' || filter === 'advisors') && (
          <div style={{ marginTop: filter === 'all' ? '60px' : '0' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.88rem', fontWeight: '700' }}>
                <Award size={16} /> Ban Cố Vấn & Hướng Dẫn
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>Đồng Hành Cùng Dự Án</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {advisors.map((adv, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #06b6d4' }}>
                  <div style={{ color: '#06b6d4', fontWeight: '700', fontSize: '0.85rem' }}>{adv.org}</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '6px 0 4px 0', color: '#fff' }}>{adv.name}</h4>
                  <div style={{ color: '#c084fc', fontSize: '0.88rem', fontWeight: '600', marginBottom: '12px' }}>{adv.role}</div>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5' }}>{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
