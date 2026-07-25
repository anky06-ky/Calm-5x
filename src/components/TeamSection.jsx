import React, { useState } from 'react';
import { Award, ArrowUpRight, Eye, Sparkles, Users } from 'lucide-react';
import { advisors, teamMembers } from '../data/membersData';
import Reveal from './Reveal';

const memberAccents = ['#c084fc', '#38bdf8', '#f472b6', '#22d3ee', '#a78bfa'];

export default function TeamSection({ onSelectMember }) {
  const [filter, setFilter] = useState('all');

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--rotate-x', '0deg');
    event.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section id="team" className="team-section">
      <div className="container">
        <Reveal className="team-section-heading">
          <div className="section-eyebrow">
            <Users size={16} /> Con người là trung tâm
          </div>
          <h2>
            Mỗi thành viên là một <span className="cyber-text">mảnh ghép khác biệt</span>
          </h2>
          <p>
            CalmX được tạo nên bởi năm góc nhìn bổ trợ lẫn nhau. Không chỉ là chức
            danh, mỗi người mang một câu chuyện, một thế mạnh và một phần trách nhiệm
            rõ ràng trong hành trình chung.
          </p>
        </Reveal>

        <Reveal className="team-manifesto" delay={80}>
          <div className="team-manifesto-copy">
            <Sparkles size={20} />
            <div>
              <strong>Đa chuyên môn, cùng một mục tiêu</strong>
              <span>
                Biến công nghệ thành một không gian an toàn, gần gũi và thật sự hữu ích
                cho sức khỏe tinh thần người trẻ.
              </span>
            </div>
          </div>
          <div className="team-role-map" aria-label="Năm lĩnh vực chuyên môn">
            {['Chiến lược', 'Công nghệ', 'Trải nghiệm', 'AI & Dữ liệu', 'Cộng đồng'].map(
              (role, index) => (
                <span key={role} style={{ '--role-color': memberAccents[index] }}>
                  {role}
                </span>
              )
            )}
          </div>
        </Reveal>

        <div className="team-filter" role="group" aria-label="Lọc thông tin đội ngũ">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}
            aria-pressed={filter === 'all'}
          >
            5 Thành Viên Nòng Cốt
          </button>
          <button
            type="button"
            onClick={() => setFilter('advisors')}
            className={filter === 'advisors' ? 'btn-primary' : 'btn-secondary'}
            aria-pressed={filter === 'advisors'}
          >
            Ban Cố Vấn (2)
          </button>
        </div>

        {filter === 'all' && (
          <div className="team-members-grid">
            {teamMembers.map((member, index) => (
              <Reveal key={member.id} className="team-card-reveal" delay={index * 90}>
                <article
                  className="member-card"
                  style={{ '--member-accent': memberAccents[index] }}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={resetTilt}
                  onClick={() => onSelectMember(member)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectMember(member);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Xem câu chuyện của ${member.name}`}
                >
                  <div className="member-card-topline">
                    <span>CalmX / 0{index + 1}</span>
                    <ArrowUpRight size={16} />
                  </div>

                  <div className="member-card-photo">
                    <img
                      src={member.image}
                      alt={`Ảnh chân dung ${member.name}`}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                    <div className="member-card-role">{member.role}</div>
                  </div>

                  <div className="member-card-body">
                    <h3>{member.name}</h3>
                    <p>{member.tagline}</p>
                    <div className="member-skill-list">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="member-card-footer">
                    <span>
                      <Eye size={15} /> Xem hồ sơ
                    </span>
                    <span>{member.stats.contribution} đóng góp</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {filter === 'advisors' && (
          <div className="advisor-panel">
            <Reveal className="advisor-heading">
              <Award size={20} />
              <div>
                <span>Ban cố vấn & hướng dẫn</span>
                <h3>Những người đồng hành cùng dự án</h3>
              </div>
            </Reveal>
            <div className="advisor-grid">
              {advisors.map((advisor, index) => (
                <Reveal
                  key={advisor.name}
                  className="advisor-card glass-card"
                  delay={index * 100}
                >
                  <span>{advisor.org}</span>
                  <h4>{advisor.name}</h4>
                  <strong>{advisor.role}</strong>
                  <p>{advisor.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
