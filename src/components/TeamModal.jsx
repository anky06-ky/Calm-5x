import React, { useEffect, useRef, useState } from 'react';
import { X, Facebook, Linkedin, Github, Mail, Info, Sparkles, Upload, Check } from 'lucide-react';

export default function TeamModal({ member, onClose }) {
  const [customAvatar, setCustomAvatar] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!member) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [member, onClose]);

  useEffect(() => () => {
    if (customAvatar) URL.revokeObjectURL(customAvatar);
  }, [customAvatar]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomAvatar(imageUrl);
    }
  };

  if (!member) return null;

  const displayedImage = customAvatar || member.image;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px' }} role="dialog" aria-modal="true" aria-labelledby="member-modal-title">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Đóng thông tin thành viên"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
          {/* Avatar frame */}
          <div>
            <div className="avatar-frame-3d" style={{ height: '360px' }}>
              <img
                src={displayedImage}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {member.isPlaceholder && !customAvatar && (
                <div className="placeholder-badge">
                  Avatar 3D (Chờ ảnh thật)
                </div>
              )}
              {customAvatar && (
                <div className="placeholder-badge" style={{ background: 'rgba(74, 222, 128, 0.9)', color: '#000' }}>
                  <Check size={12} inline="true" /> Ảnh Thật Đã Thử
                </div>
              )}
            </div>

            {/* Interactive Live Upload Test for Remaining Members */}
            <div
              style={{
                marginTop: '16px',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px dashed rgba(6, 182, 212, 0.4)',
                fontSize: '0.82rem',
                color: '#38bdf8',
                lineHeight: '1.4',
              }}
            >
              <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Info size={14} /> Thêm / Thử Ảnh Thật Cho Thành Viên:
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '8px' }}>
                Chép file <code>{member.name.replace(/ /g, '_')}.png</code> (hoặc <code>.jpg</code>) vào thư mục <code>public/members/</code>.
              </p>

              <label className="btn-secondary" style={{ display: 'inline-flex', padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer' }}>
                <Upload size={14} /> <span>Xem Trước File Ảnh Từ Máy</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={14} /> {member.role}
            </div>
            <h2 id="member-modal-title" style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>
              {member.name}
            </h2>
            <p style={{ color: '#06b6d4', fontWeight: '600', marginBottom: '16px' }}>
              {member.tagline}
            </p>

            <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '24px', fontSize: '0.98rem' }}>
              {member.bio}
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', color: '#c084fc', fontSize: '1.2rem' }}>{member.stats.contribution}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Đóng Góp</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', color: '#38bdf8', fontSize: '1.2rem' }}>{member.stats.projects}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Dự Án</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', color: '#f43f5e', fontSize: '1.2rem' }}>{member.stats.experience}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Kinh Nghiệm</div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '10px', color: '#d1d5db' }}>Kỹ Năng Nổi Bật</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {member.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(192, 132, 252, 0.3)',
                      color: '#e9d5ff',
                      fontSize: '0.8rem',
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              style={{
                fontStyle: 'italic',
                color: '#9ca3af',
                borderLeft: '3px solid #a855f7',
                paddingLeft: '12px',
                marginBottom: '24px',
                fontSize: '0.9rem',
              }}
            >
              "{member.quote}"
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '10px' }} title="Facebook">
                <Facebook size={18} />
              </a>
              <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '10px' }} title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={member.socials.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '10px' }} title="GitHub">
                <Github size={18} />
              </a>
              <a href={`mailto:${member.socials.email}`} className="btn-secondary" style={{ padding: '10px' }} title="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
