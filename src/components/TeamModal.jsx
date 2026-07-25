import React, { useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Github,
  Linkedin,
  Mail,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import { teamMembers } from '../data/membersData';

export default function TeamModal({ member, onClose, onSelectMember }) {
  const closeButtonRef = useRef(null);
  const memberIndex = member
    ? teamMembers.findIndex((item) => item.id === member.id)
    : -1;

  const navigate = (direction) => {
    if (memberIndex < 0) return;
    const nextIndex = (memberIndex + direction + teamMembers.length) % teamMembers.length;
    onSelectMember(teamMembers[nextIndex]);
  };

  useEffect(() => {
    if (!member) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') navigate(-1);
      if (event.key === 'ArrowRight') navigate(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <article
        className="modal-content member-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="member-modal-close"
          aria-label="Đóng hồ sơ thành viên"
        >
          <X size={20} />
        </button>

        <div className="member-modal-grid">
          <div className="member-modal-media">
            <img src={member.image} alt={`Ảnh chân dung ${member.name}`} />
            <div className="member-modal-index">
              <span>Thành viên</span>
              <strong>0{memberIndex + 1} / 05</strong>
            </div>
          </div>

          <div className="member-modal-details">
            <div className="member-modal-role">
              <Sparkles size={14} /> {member.role}
            </div>
            <h2 id="member-modal-title">{member.name}</h2>
            <p className="member-modal-tagline">{member.tagline}</p>
            <p className="member-modal-bio">{member.bio}</p>

            <div className="member-modal-stats">
              <div>
                <strong>{member.stats.contribution}</strong>
                <span>Đóng góp</span>
              </div>
              <div>
                <strong>{member.stats.projects}</strong>
                <span>Dự án</span>
              </div>
              <div>
                <strong>{member.stats.experience}</strong>
                <span>Kinh nghiệm</span>
              </div>
            </div>

            <div className="member-modal-skills">
              <span className="member-modal-label">Năng lực nổi bật</span>
              <div>
                {member.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <blockquote className="member-modal-quote">
              <Quote size={18} />
              <p>{member.quote}</p>
            </blockquote>

            <div className="member-modal-actions">
              <div className="member-modal-socials" aria-label="Liên kết thành viên">
                {member.socials.facebook !== 'https://facebook.com' && (
                  <a href={member.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                )}
                {member.socials.linkedin !== 'https://linkedin.com' && (
                  <a href={member.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                )}
                {member.socials.github !== 'https://github.com' && (
                  <a href={member.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                )}
                <a href={`mailto:${member.socials.email}`} aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>

              <div className="member-modal-navigation">
                <button type="button" onClick={() => navigate(-1)} aria-label="Thành viên trước">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={() => navigate(1)} aria-label="Thành viên tiếp theo">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
