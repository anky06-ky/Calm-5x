import React from 'react';
import { ArrowDown, ArrowRight, Sparkles, Users } from 'lucide-react';
import { teamMembers } from '../data/membersData';
import Reveal from './Reveal';

export default function Hero({ onSelectMember }) {
  const marqueeMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="hero" className="team-first-hero">
      <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-two" aria-hidden="true" />

      <div className="container team-first-hero-inner">
        <Reveal className="hero-copy">
          <div className="hero-badge">
            <Sparkles size={16} /> Team Khát Vọng · HUIT STARTUP 2026
          </div>

          <h1 className="hero-title">
            5 cá tính. 1 quỹ đạo.
            <br />
            <span className="cyber-text">Cùng tạo nên CalmX.</span>
          </h1>

          <p className="hero-subtitle">
            Gặp gỡ đội ngũ trẻ đứng sau nền tảng chăm sóc sức khỏe tinh thần:
            từ điều phối, tài chính, thị trường đến AI Caly và dữ liệu cảm xúc.
          </p>

          <div className="hero-buttons">
            <a href="#team" className="btn-primary">
              <Users size={18} /> Khám Phá Đội Ngũ <ArrowDown size={18} />
            </a>
            <a href="#demo" className="btn-secondary">
              Trải Nghiệm CalmX <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-member-stage" delay={120}>
          <div className="stage-motion-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="hero-member-stage-head">
            <div>
              <span className="hero-member-kicker">The minds behind CalmX</span>
              <h2>Những người biến sự thấu cảm thành sản phẩm</h2>
            </div>
            <div className="hero-team-count" aria-label="Năm thành viên">
              <strong>05</strong>
              <span>thành viên</span>
            </div>
          </div>

          <div className="hero-member-rail" aria-label="Danh sách thành viên CalmX">
            {teamMembers.map((member, index) => (
              <button
                type="button"
                key={member.id}
                className="hero-member-card"
                style={{ '--member-index': index }}
                onClick={() => onSelectMember(member)}
                aria-label={`Xem hồ sơ ${member.name}`}
              >
                <span className="hero-member-image">
                  <img
                    src={member.image}
                    alt=""
                    loading={index < 2 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    draggable="false"
                  />
                  <span className="hero-member-number">0{index + 1}</span>
                </span>
                <span className="hero-member-info">
                  <strong>{member.name}</strong>
                  <span>{member.shortRole}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="hero-member-hint">
            Chạm vào từng thành viên để xem câu chuyện, kỹ năng và dấu ấn cá nhân.
          </div>
        </Reveal>

        <div className="team-marquee" aria-hidden="true">
          <div className="team-marquee-track">
            {marqueeMembers.map((member, index) => (
              <div className="team-marquee-item" key={`${member.id}-${index}`}>
                <span>0{(index % teamMembers.length) + 1}</span>
                <strong>{member.name}</strong>
                <i>{member.shortRole}</i>
                <b>✦</b>
              </div>
            ))}
          </div>
        </div>

        <a className="hero-scroll-cue" href="#team" aria-label="Cuộn xuống khu vực đội ngũ">
          <span className="hero-scroll-mouse">
            <i />
          </span>
          <span>Cuộn để khám phá</span>
        </a>
      </div>
    </section>
  );
}
