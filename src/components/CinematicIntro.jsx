import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookHeart,
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  SkipForward,
} from 'lucide-react';
import { teamMembers } from '../data/membersData';

const scenes = [
  { id: 'prelude', label: 'Mở đầu', duration: 2400 },
  { id: 'welcome', label: 'Xin chào', duration: 3800 },
  { id: 'team', label: 'Đội ngũ', duration: 7500 },
  { id: 'project', label: 'Dự án', duration: 5000 },
];

const memberAccents = ['#c084fc', '#f472b6', '#38bdf8', '#34d399', '#facc15'];
const confettiColors = ['#c084fc', '#f472b6', '#38bdf8', '#34d399', '#facc15'];
const teamConfetti = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37 + 5) % 98}%`,
  top: `${(index * 53 + 3) % 94}%`,
  size: 5 + (index % 4) * 2,
  color: confettiColors[index % confettiColors.length],
  duration: 6.8 + (index % 5) * 0.8,
  delay: -(index % 9) * 0.7,
  round: index % 3 === 0,
}));

const floatingEmotions = [
  { symbol: '😄', left: '7%', top: '28%', size: 46, duration: 9.5, delay: -1.2 },
  { symbol: '😌', left: '88%', top: '24%', size: 42, duration: 11, delay: -6.4 },
  { symbol: '🥰', left: '92%', top: '58%', size: 48, duration: 10.2, delay: -3.5 },
  { symbol: '🥺', left: '5%', top: '66%', size: 40, duration: 12.5, delay: -8.1 },
  { symbol: '😔', left: '19%', top: '84%', size: 36, duration: 10.8, delay: -5.2 },
  { symbol: '🤗', left: '78%', top: '82%', size: 44, duration: 9.8, delay: -7.3 },
  { symbol: '😮', left: '68%', top: '16%', size: 34, duration: 11.8, delay: -2.6 },
  { symbol: '😊', left: '30%', top: '15%', size: 38, duration: 10.6, delay: -4.4 },
];

const floatingFlowers = [
  { symbol: '🌸', left: '12%', top: '46%', delay: 0.4, duration: 7.5 },
  { symbol: '🌼', left: '83%', top: '42%', delay: 1.1, duration: 8.4 },
  { symbol: '🌸', left: '24%', top: '73%', delay: 1.8, duration: 9.2 },
  { symbol: '🌺', left: '73%', top: '70%', delay: 2.5, duration: 8.8 },
  { symbol: '🌼', left: '48%', top: '9%', delay: 3.1, duration: 9.6 },
];

const projectFeatures = [
  {
    icon: HeartPulse,
    title: 'Check-in cảm xúc',
    description: 'Nhận diện và ghi lại trạng thái mỗi ngày.',
    color: '#f472b6',
  },
  {
    icon: BrainCircuit,
    title: 'AI Caly đồng hành',
    description: 'Lắng nghe, phản hồi và gợi ý bước chăm sóc phù hợp.',
    color: '#c084fc',
  },
  {
    icon: BookHeart,
    title: 'Nhật ký riêng tư',
    description: 'Theo dõi hành trình cảm xúc trong một không gian an toàn.',
    color: '#38bdf8',
  },
];

export default function CinematicIntro({
  onComplete,
  onSelectMember,
  paused = false,
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(() => !document.hidden);
  const onCompleteRef = useRef(onComplete);
  const remainingTimeRef = useRef(scenes[0].duration);
  const timerStartedAtRef = useRef(0);
  const scene = scenes[sceneIndex];
  const sceneDuration = scene.duration;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    teamMembers.forEach((member) => {
      const image = new Image();
      image.src = member.image;
    });
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    remainingTimeRef.current = sceneDuration;
  }, [sceneDuration, sceneIndex]);

  useEffect(() => {
    if (!isPageVisible || paused) return undefined;

    timerStartedAtRef.current = performance.now();
    const timer = window.setTimeout(() => {
      if (sceneIndex < scenes.length - 1) {
        setSceneIndex((index) => index + 1);
      } else {
        onCompleteRef.current?.();
      }
    }, remainingTimeRef.current);

    return () => {
      window.clearTimeout(timer);
      const elapsed = performance.now() - timerStartedAtRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    };
  }, [isPageVisible, paused, sceneDuration, sceneIndex]);

  const finishIntro = () => onCompleteRef.current?.();

  return (
    <main
      className={`cinematic-intro ${paused || !isPageVisible ? 'is-paused' : ''}`}
      aria-label="Mở đầu giới thiệu CalmX"
    >
      <div className="intro-grid-glow" aria-hidden="true" />
      <div className="intro-light-beam intro-light-beam-one" aria-hidden="true" />
      <div className="intro-light-beam intro-light-beam-two" aria-hidden="true" />
      <div className="intro-sky-decor" aria-hidden="true">
        <span className="intro-cloud intro-cloud-one" />
        <span className="intro-cloud intro-cloud-two" />
        <span className="intro-cloud intro-cloud-three" />
        {floatingEmotions.map((emotion, index) => (
          <span
            key={`${emotion.symbol}-${index}`}
            className="intro-emotion"
            style={{
              '--emotion-left': emotion.left,
              '--emotion-top': emotion.top,
              '--emotion-size': `${emotion.size}px`,
              '--emotion-duration': `${emotion.duration}s`,
              '--emotion-delay': `${emotion.delay}s`,
            }}
          >
            {emotion.symbol}
          </span>
        ))}
        {floatingFlowers.map((flower, index) => (
          <span
            key={`${flower.symbol}-${index}`}
            className="intro-flower"
            style={{
              '--flower-left': flower.left,
              '--flower-top': flower.top,
              '--flower-delay': `${flower.delay}s`,
              '--flower-duration': `${flower.duration}s`,
            }}
          >
            {flower.symbol}
          </span>
        ))}
      </div>

      <header className="intro-topbar">
        <button type="button" className="intro-skip" onClick={finishIntro}>
          Bỏ qua <SkipForward size={17} />
        </button>
      </header>

      <section
        key={scene.id}
        className={`intro-scene intro-scene-${scene.id}`}
        style={{ '--scene-duration': `${sceneDuration}ms` }}
        aria-label={`${scene.label}, bước ${sceneIndex + 1} trên ${scenes.length}`}
      >
        <span className="intro-live-status" role="status" aria-live="polite">
          {scene.label}, bước {sceneIndex + 1} trên {scenes.length}
        </span>
        {scene.id === 'prelude' && (
          <div className="intro-prelude">
            <div className="intro-logo-stage" aria-hidden="true">
              <span className="intro-logo-orbit" />
              <span className="intro-logo-orbit intro-logo-orbit-inner" />
              <img src="/calmx-cloud-logo.png" alt="" />
            </div>
            <h1>CALM<span>X</span></h1>
            <strong>HUIT STARTUP 2026</strong>
            <p>TEAM KHÁT VỌNG</p>
          </div>
        )}

        {scene.id === 'welcome' && (
          <div className="intro-welcome">
            <div className="intro-eyebrow">
              Team Khát Vọng xin gửi lời
            </div>
            <h1>
              <span>Xin Chào</span>
              <span>Từ CalmX</span>
            </h1>
            <div className="intro-floral-divider" aria-hidden="true">
              <i>🌿</i><span /><b>🌸</b><span /><i>🌿</i>
            </div>
            <div className="intro-welcome-card">
              <strong>CALMX · CHĂM SÓC CẢM XÚC MỖI NGÀY</strong>
              <p>
                Năm con người, năm góc nhìn cùng tạo nên một không gian
                lắng nghe, thấu hiểu và đồng hành.
              </p>
            </div>
          </div>
        )}

        {scene.id === 'team' && (
          <div className="intro-team">
            <div className="intro-team-confetti" aria-hidden="true">
              {teamConfetti.map((particle, index) => (
                <span
                  key={index}
                  style={{
                    '--confetti-left': particle.left,
                    '--confetti-top': particle.top,
                    '--confetti-size': `${particle.size}px`,
                    '--confetti-color': particle.color,
                    '--confetti-duration': `${particle.duration}s`,
                    '--confetti-delay': `${particle.delay}s`,
                    '--confetti-radius': particle.round ? '50%' : '2px',
                  }}
                />
              ))}
            </div>

            <blockquote className="intro-team-quote">
              <span>❞</span>
              <p>
                Chúng mình không chỉ xây một ứng dụng,
                <br />
                chúng mình tạo nên một nơi để <strong>cảm xúc được lắng nghe.</strong>
              </p>
              <span>❞</span>
            </blockquote>

            <div className="intro-scene-heading">
              <h2>Đội ngũ CalmX</h2>
            </div>

            <div className="intro-team-grid">
              {teamMembers.map((member, index) => (
                <button
                  type="button"
                  key={member.id}
                  className="intro-member-card"
                  style={{
                    '--intro-member-index': index,
                    '--member-accent': memberAccents[index],
                  }}
                  onClick={() => onSelectMember?.(member)}
                  aria-label={`Xem hồ sơ ${member.name}`}
                >
                  <div className="intro-member-image">
                    <img
                      src={member.image}
                      alt={`Ảnh chân dung ${member.name}`}
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                  <div className="intro-member-copy">
                    <strong>{member.name}</strong>
                    <small>{member.shortRole}</small>
                  </div>
                </button>
              ))}
            </div>
            <p className="intro-team-hint">Chạm vào chân dung để xem câu chuyện từng thành viên.</p>
          </div>
        )}

        {scene.id === 'project' && (
          <div className="intro-project">
            <div className="intro-project-copy">
              <div className="intro-eyebrow">
                <ShieldCheck size={16} /> CalmX xin giới thiệu
              </div>
              <h2>
                Chạm vào
                <span>Cảm Xúc.</span>
              </h2>
              <p>
                CalmX kết hợp trải nghiệm check-in, nhật ký cảm xúc và trợ lý AI Caly
                để tạo nên một điểm chạm hỗ trợ ban đầu riêng tư, thân thiện.
              </p>
              <button type="button" className="btn-primary intro-enter" onClick={finishIntro}>
                Bắt đầu khám phá <ArrowRight size={18} />
              </button>
            </div>

            <div className="intro-feature-list">
              {projectFeatures.map(({ icon: Icon, title, description, color }, index) => (
                <article
                  key={title}
                  className="intro-feature-card"
                  style={{ '--feature-color': color, '--feature-index': index }}
                >
                  <span>
                    <Icon size={22} />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="intro-timeline" aria-label="Tiến trình mở đầu">
        <div className="intro-progress-track" aria-hidden="true">
          <span
            key={scene.id}
            className="intro-progress-fill"
            style={{ '--intro-duration': `${sceneDuration}ms` }}
          />
        </div>
        <div className="intro-scene-labels">
          {scenes.map((item, index) => (
            <span
              key={item.id}
              className={index === sceneIndex ? 'active' : index < sceneIndex ? 'done' : ''}
              aria-current={index === sceneIndex ? 'step' : undefined}
            >
              <i>{index < sceneIndex ? '✓' : `0${index + 1}`}</i>
              {item.label}
            </span>
          ))}
        </div>
      </footer>

      <style>{`
        .cinematic-intro {
          position: relative;
          z-index: 5;
          min-height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          color: #fff;
          background:
            radial-gradient(circle at 50% 45%, rgba(88, 28, 135, 0.22), transparent 38%),
            linear-gradient(145deg, rgba(7, 5, 16, 0.78), rgba(5, 4, 14, 0.96));
          isolation: isolate;
        }

        .intro-grid-glow {
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: 0.22;
          background-image:
            linear-gradient(rgba(192, 132, 252, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, #000, transparent 74%);
          animation: introGridDrift 12s linear infinite;
        }

        .intro-light-beam {
          position: absolute;
          z-index: -1;
          width: 38vw;
          height: 140vh;
          opacity: 0.18;
          filter: blur(26px);
          background: linear-gradient(180deg, transparent, #a855f7 45%, transparent);
          transform: rotate(24deg);
          animation: introBeamSweep 8s ease-in-out infinite alternate;
        }

        .intro-light-beam-one { top: -30vh; left: -18vw; }
        .intro-light-beam-two {
          right: -16vw;
          bottom: -42vh;
          background: linear-gradient(180deg, transparent, #06b6d4 45%, transparent);
          animation-delay: -4s;
        }

        .intro-sky-decor {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .intro-cloud {
          position: absolute;
          width: 180px;
          height: 54px;
          opacity: 0.13;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(216, 180, 254, 0.14));
          box-shadow: 0 0 42px rgba(192, 132, 252, 0.18);
          filter: blur(0.2px);
          animation: introCloudDrift 18s ease-in-out infinite alternate;
        }

        .intro-cloud::before,
        .intro-cloud::after {
          content: '';
          position: absolute;
          bottom: 13px;
          border-radius: 50%;
          background: inherit;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .intro-cloud::before {
          left: 28px;
          width: 72px;
          height: 72px;
        }

        .intro-cloud::after {
          right: 24px;
          width: 92px;
          height: 92px;
        }

        .intro-cloud-one {
          top: 18%;
          left: -42px;
        }

        .intro-cloud-two {
          top: 53%;
          right: -58px;
          width: 220px;
          animation-duration: 22s;
          animation-delay: -7s;
        }

        .intro-cloud-three {
          right: 28%;
          bottom: 9%;
          width: 145px;
          transform: scale(0.7);
          animation-duration: 20s;
          animation-delay: -12s;
        }

        .intro-emotion {
          position: absolute;
          top: var(--emotion-top);
          left: var(--emotion-left);
          display: grid;
          width: var(--emotion-size);
          height: var(--emotion-size);
          place-items: center;
          font-size: calc(var(--emotion-size) * 0.55);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(168, 85, 247, 0.08));
          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 20px rgba(168, 85, 247, 0.13);
          backdrop-filter: blur(9px);
          animation: introEmotionFloat var(--emotion-duration) var(--emotion-delay) ease-in-out infinite;
        }

        .intro-flower {
          position: absolute;
          top: var(--flower-top);
          left: var(--flower-left);
          font-size: clamp(20px, 2.4vw, 34px);
          opacity: 0;
          filter: drop-shadow(0 0 10px rgba(244, 114, 182, 0.42));
          transform-origin: center bottom;
          animation:
            introFlowerBloom 1.6s var(--flower-delay) cubic-bezier(0.16, 1, 0.3, 1) forwards,
            introFlowerSway var(--flower-duration) calc(var(--flower-delay) + 1.6s) ease-in-out infinite;
        }

        .intro-topbar {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding:
            calc(20px + env(safe-area-inset-top, 0px))
            max(24px, env(safe-area-inset-right, 0px))
            14px
            max(24px, env(safe-area-inset-left, 0px));
        }

        .intro-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .intro-brand > span:last-child {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .intro-brand strong { color: #38bdf8; }
        .intro-brand small {
          margin-top: 4px;
          color: #c084fc;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .intro-brand-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          box-shadow: 0 0 22px rgba(168, 85, 247, 0.42);
        }

        .intro-skip {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          gap: 7px;
          padding: 9px 15px;
          color: #d8d9e4;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.055);
          backdrop-filter: blur(12px);
          transition: color 200ms ease, border-color 200ms ease, transform 200ms ease;
        }

        .intro-skip:hover,
        .intro-skip:focus-visible {
          color: #fff;
          border-color: rgba(192, 132, 252, 0.65);
          transform: translateY(-2px);
        }

        .intro-scene {
          display: grid;
          width: min(1220px, 100%);
          min-height: 100vh;
          min-height: 100dvh;
          margin: 0 auto;
          padding:
            calc(92px + env(safe-area-inset-top, 0px))
            clamp(18px, 4vw, 54px)
            calc(112px + env(safe-area-inset-bottom, 0px));
          place-items: center;
          animation: introSceneLifecycle var(--scene-duration) ease-in-out both;
        }

        .intro-live-status {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        .intro-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #c084fc;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .intro-prelude,
        .intro-welcome {
          max-width: 850px;
          text-align: center;
        }

        .intro-prelude h1 {
          margin: 14px 0 10px;
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 6vw, 4.6rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 1;
          animation: introTitleIn 800ms 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .intro-prelude h1 span {
          color: #38bdf8;
        }

        .intro-prelude > strong,
        .intro-prelude > p {
          display: block;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .intro-prelude > strong {
          color: #facc15;
          font-size: clamp(0.72rem, 1.4vw, 1rem);
        }

        .intro-prelude > p {
          margin-top: 14px;
          color: #8f94a6;
          font-size: clamp(0.58rem, 1vw, 0.72rem);
          font-weight: 800;
        }

        .intro-logo-stage {
          position: relative;
          display: grid;
          width: clamp(118px, 15vw, 170px);
          aspect-ratio: 1;
          margin: 0 auto 28px;
          place-items: center;
          animation: introLogoFloat 3s ease-in-out infinite;
        }

        .intro-logo-stage img {
          width: 56%;
          aspect-ratio: 1;
          object-fit: contain;
          border-radius: 24%;
          filter: drop-shadow(0 0 24px rgba(56, 189, 248, 0.48));
        }

        .intro-logo-orbit {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(192, 132, 252, 0.5);
          border-radius: 50%;
          box-shadow: inset 0 0 22px rgba(168, 85, 247, 0.14);
          animation: introOrbit 8s linear infinite;
        }

        .intro-logo-orbit::after {
          content: '';
          position: absolute;
          top: 8%;
          left: 12%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 14px #38bdf8;
        }

        .intro-logo-orbit-inner {
          inset: 15%;
          border-style: dashed;
          border-color: rgba(56, 189, 248, 0.46);
          animation-direction: reverse;
          animation-duration: 5.5s;
        }

        .intro-scene-heading h2,
        .intro-project h2 {
          font-family: var(--font-display);
          letter-spacing: -0.035em;
        }

        .intro-welcome h1 {
          margin: 13px 0 18px;
          font-family: var(--font-display);
          font-size: clamp(4rem, 9vw, 7.6rem);
          letter-spacing: -0.055em;
          line-height: 0.82;
        }

        .intro-welcome .intro-eyebrow {
          animation: introCopyIn 620ms 80ms ease backwards;
        }

        .intro-welcome h1 span,
        .intro-project h2 span {
          display: block;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: introTitleIn 760ms 180ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .intro-welcome h1 span:last-child {
          animation-delay: 330ms;
        }

        .intro-welcome h1 span:first-child {
          background-image: linear-gradient(105deg, #f472b6, #d946ef 52%, #a855f7);
        }

        .intro-welcome h1 span:last-child {
          background-image: linear-gradient(105deg, #22d3ee, #38bdf8 52%, #34d399);
        }

        .intro-floral-divider {
          display: flex;
          max-width: 390px;
          align-items: center;
          justify-content: center;
          gap: 13px;
          margin: 0 auto 20px;
          color: #a3e635;
          animation: introCopyIn 720ms 430ms ease backwards;
        }

        .intro-floral-divider span {
          width: 78px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.55));
        }

        .intro-floral-divider span:nth-of-type(2) {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.55), transparent);
        }

        .intro-floral-divider i {
          font-style: normal;
        }

        .intro-floral-divider b {
          font-size: 1.2rem;
        }

        .intro-welcome-card {
          max-width: 640px;
          margin: 0 auto;
          padding: 22px 28px;
          color: #aeb1be;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          background: rgba(25, 31, 45, 0.62);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(16px);
          animation: introCopyIn 720ms 560ms ease backwards;
        }

        .intro-welcome-card strong {
          color: #facc15;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
        }

        .intro-welcome-card p {
          margin-top: 10px;
          font-size: 0.92rem;
          line-height: 1.7;
        }

        .intro-team {
          position: relative;
          width: 100%;
          max-width: 980px;
          text-align: center;
        }

        .intro-team-confetti {
          position: absolute;
          inset: -18vh -10vw;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          contain: paint;
          animation: introConfettiFieldIn 800ms 520ms ease backwards;
        }

        .intro-team-confetti span {
          position: absolute;
          top: var(--confetti-top);
          left: var(--confetti-left);
          width: var(--confetti-size);
          height: var(--confetti-size);
          opacity: 0.9;
          border-radius: var(--confetti-radius);
          background: var(--confetti-color);
          box-shadow: 0 0 13px color-mix(in srgb, var(--confetti-color) 65%, transparent);
          animation: introConfettiDrift var(--confetti-duration) var(--confetti-delay)
            ease-in-out infinite;
        }

        .intro-team-quote,
        .intro-scene-heading,
        .intro-team-grid,
        .intro-team-hint {
          position: relative;
          z-index: 1;
        }

        .intro-team-quote {
          display: grid;
          max-width: 680px;
          grid-template-columns: auto 1fr auto;
          gap: 14px;
          align-items: center;
          margin: 0 auto 22px;
          padding: 22px 28px;
          color: #f5f3ff;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 22px;
          background: linear-gradient(115deg, rgba(31, 27, 48, 0.74), rgba(20, 48, 48, 0.45));
          box-shadow: 0 22px 58px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(14px);
          animation: introQuoteIn 760ms 100ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .intro-team-quote > span {
          color: #fb7185;
          font-family: var(--font-display);
          font-size: 2rem;
        }

        .intro-team-quote p {
          font-size: clamp(0.88rem, 1.7vw, 1.15rem);
          font-style: italic;
          line-height: 1.7;
        }

        .intro-team-quote strong {
          color: #34d399;
          font-weight: 800;
        }

        .intro-scene-heading {
          margin-bottom: 20px;
          animation: introCopyIn 620ms 280ms ease backwards;
        }

        .intro-scene-heading h2,
        .intro-project h2 {
          margin: 7px 0 9px;
          font-size: clamp(2rem, 5vw, 4.3rem);
          line-height: 1;
        }

        .intro-scene-heading h2 {
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
        }

        .intro-project h2 span {
          background-image: linear-gradient(105deg, #f472b6, #c084fc 45%, #38bdf8);
        }

        .intro-team-grid {
          display: grid;
          max-width: 880px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px 26px;
          margin: 0 auto;
        }

        .intro-member-card {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          padding: 0;
          color: inherit;
          text-align: center;
          cursor: pointer;
          border: 0;
          background: none;
          animation:
            introMemberIn 760ms calc(440ms + var(--intro-member-index) * 110ms)
              cubic-bezier(0.16, 1, 0.3, 1) backwards;
          transition: transform 260ms ease;
        }

        .intro-member-card:last-child {
          width: 50%;
          grid-column: 2 / span 2;
          justify-self: center;
        }

        .intro-member-card:hover,
        .intro-member-card:focus-visible {
          transform: translateY(-6px) scale(1.04);
        }

        .intro-member-image {
          position: relative;
          width: clamp(86px, 8vw, 116px);
          aspect-ratio: 1;
          padding: 4px;
          overflow: hidden;
          border: 3px solid var(--member-accent);
          border-radius: 50%;
          background: rgba(7, 5, 16, 0.85);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.12),
            0 0 24px color-mix(in srgb, var(--member-accent) 42%, transparent);
          animation: introAvatarPulse 3.4s calc(var(--intro-member-index) * -0.6s)
            ease-in-out infinite;
        }

        .intro-member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          animation: introPortraitZoom 5s ease-out both;
        }

        .intro-member-copy {
          padding-top: 10px;
        }

        .intro-member-copy strong,
        .intro-member-copy small {
          display: block;
        }

        .intro-member-copy strong {
          color: #fff;
          font-size: clamp(0.72rem, 1.1vw, 0.9rem);
        }

        .intro-member-copy small {
          display: -webkit-box;
          min-height: 2.4em;
          margin-top: 4px;
          overflow: hidden;
          color: #777d8f;
          font-size: clamp(0.54rem, 0.75vw, 0.64rem);
          font-weight: 600;
          line-height: 1.3;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .intro-team-hint {
          margin-top: 14px;
          color: #707688;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .intro-project {
          display: grid;
          width: 100%;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: clamp(34px, 6vw, 84px);
          align-items: center;
        }

        .intro-project h2 span {
          margin-top: 4px;
        }

        .intro-project-copy > p {
          max-width: 640px;
          margin: 18px 0 26px;
          color: #aeb1be;
          font-size: clamp(0.95rem, 1.4vw, 1.08rem);
          line-height: 1.75;
        }

        .intro-enter {
          min-height: 48px;
        }

        .intro-feature-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .intro-feature-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid color-mix(in srgb, var(--feature-color) 32%, transparent);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(13px);
          animation: introFeatureIn 680ms calc(180ms + var(--feature-index) * 150ms)
            cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .intro-feature-card > span {
          display: grid;
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          place-items: center;
          color: var(--feature-color);
          border-radius: 14px;
          background: color-mix(in srgb, var(--feature-color) 13%, transparent);
          box-shadow: 0 0 22px color-mix(in srgb, var(--feature-color) 16%, transparent);
        }

        .intro-feature-card strong {
          color: #fff;
          font-size: 1rem;
        }

        .intro-feature-card p {
          margin-top: 3px;
          color: #9fa2b1;
          font-size: 0.82rem;
          line-height: 1.5;
        }

        .intro-timeline {
          position: absolute;
          right: max(24px, env(safe-area-inset-right, 0px));
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          left: max(24px, env(safe-area-inset-left, 0px));
          z-index: 10;
          max-width: 720px;
          margin: 0 auto;
        }

        .intro-progress-track {
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }

        .intro-progress-fill {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #a855f7, #38bdf8);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.65);
          transform-origin: left;
          animation: introProgress var(--intro-duration) linear both;
        }

        .intro-scene-labels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 10px;
        }

        .intro-scene-labels span {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #737787;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          transition: color 220ms ease;
        }

        .intro-scene-labels span.active { color: #e9d5ff; }
        .intro-scene-labels span.done { color: #38bdf8; }
        .intro-scene-labels i {
          font-size: 0.62rem;
          font-style: normal;
        }

        .cinematic-intro.is-paused .intro-scene,
        .cinematic-intro.is-paused .intro-progress-fill {
          animation-play-state: paused;
        }

        @keyframes introSceneLifecycle {
          0% {
            opacity: 0;
            transform: translate3d(0, 24px, 0) scale(0.985);
          }
          10%, 86% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, -12px, 0) scale(0.992);
          }
        }

        @keyframes introTitleIn {
          from { opacity: 0; transform: translate3d(0, 34px, 0); letter-spacing: -0.08em; }
          to { opacity: 1; transform: translate3d(0, 0, 0); letter-spacing: -0.045em; }
        }

        @keyframes introCopyIn {
          from { opacity: 0; transform: translate3d(0, 18px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes introLogoFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -9px, 0); }
        }

        @keyframes introOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes introGridDrift {
          to { background-position: 64px 64px; }
        }

        @keyframes introBeamSweep {
          from { transform: translate3d(-4vw, 0, 0) rotate(24deg); }
          to { transform: translate3d(9vw, 0, 0) rotate(18deg); }
        }

        @keyframes introCloudDrift {
          from { transform: translate3d(-18px, 5px, 0) scale(0.92); }
          to { transform: translate3d(56px, -12px, 0) scale(1.06); }
        }

        @keyframes introEmotionFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg) scale(0.96);
          }
          35% {
            transform: translate3d(15px, -20px, 0) rotate(7deg) scale(1.05);
          }
          70% {
            transform: translate3d(-11px, -8px, 0) rotate(-2deg) scale(1);
          }
        }

        @keyframes introFlowerBloom {
          0% {
            opacity: 0;
            transform: translate3d(0, 16px, 0) rotate(-22deg) scale(0);
          }
          65% {
            opacity: 0.9;
            transform: translate3d(0, -3px, 0) rotate(6deg) scale(1.16);
          }
          100% {
            opacity: 0.72;
            transform: translate3d(0, 0, 0) rotate(0) scale(1);
          }
        }

        @keyframes introFlowerSway {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-5deg); }
          50% { transform: translate3d(8px, -13px, 0) rotate(8deg); }
        }

        @keyframes introMemberIn {
          from { opacity: 0; transform: translate3d(0, 36px, 0) scale(0.92); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes introQuoteIn {
          from { opacity: 0; transform: translate3d(0, -18px, 0) scale(0.97); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes introConfettiDrift {
          0%, 100% {
            opacity: 0.32;
            transform: translate3d(-10px, 14px, 0) rotate(0deg) scale(0.72);
          }
          45% {
            opacity: 1;
            transform: translate3d(18px, -22px, 0) rotate(170deg) scale(1.15);
          }
          75% {
            opacity: 0.7;
            transform: translate3d(-5px, -10px, 0) rotate(290deg) scale(0.9);
          }
        }

        @keyframes introConfettiFieldIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes introAvatarPulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.12),
              0 0 18px color-mix(in srgb, var(--member-accent) 30%, transparent);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.2),
              0 0 32px color-mix(in srgb, var(--member-accent) 58%, transparent);
          }
        }

        @keyframes introPortraitZoom {
          from { transform: scale(1.1); filter: saturate(0.78); }
          to { transform: scale(1); filter: saturate(1); }
        }

        @keyframes introFeatureIn {
          from { opacity: 0; transform: translate3d(36px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes introProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (max-width: 900px) {
          .intro-team {
            max-width: 760px;
          }
          .intro-team-grid {
            max-width: 680px;
            gap: 16px;
          }
          .intro-team-quote {
            max-width: 620px;
          }
          .intro-project {
            max-width: 760px;
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .intro-project-copy { text-align: center; }
          .intro-project-copy > p { margin-right: auto; margin-left: auto; }
          .intro-feature-list {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .intro-feature-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 600px) {
          .intro-topbar {
            padding-right: max(16px, env(safe-area-inset-right, 0px));
            padding-left: max(16px, env(safe-area-inset-left, 0px));
          }
          .intro-brand small { display: none; }
          .intro-scene {
            padding-right: 14px;
            padding-left: 14px;
          }
          .intro-logo-stage {
            width: 108px;
            margin-bottom: 20px;
          }
          .intro-prelude h1 {
            font-size: clamp(2.3rem, 14vw, 3.5rem);
          }
          .intro-welcome h1 {
            font-size: clamp(3.35rem, 17vw, 4.8rem);
          }
          .intro-welcome h1 span {
            white-space: nowrap;
          }
          .intro-welcome-card {
            padding: 17px 18px;
          }
          .intro-team-quote {
            gap: 7px;
            margin-bottom: 12px;
            padding: 13px 14px;
            border-radius: 16px;
          }
          .intro-team-quote p {
            font-size: 0.78rem;
            line-height: 1.5;
          }
          .intro-team-quote br {
            display: none;
          }
          .intro-team-quote > span {
            font-size: 1.25rem;
          }
          .intro-scene-heading {
            margin-bottom: 12px;
          }
          .intro-scene-heading h2 {
            font-size: 1.6rem;
          }
          .intro-team-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px 5px;
            max-width: 410px;
          }
          .intro-member-card:last-child {
            width: 50%;
            grid-column: 2 / span 2;
            justify-self: center;
          }
          .intro-member-card {
            display: flex;
            padding: 0;
          }
          .intro-member-image {
            width: clamp(52px, 16vw, 68px);
          }
          .intro-member-copy { padding-top: 6px; }
          .intro-member-copy strong {
            display: -webkit-box;
            min-height: 2.5em;
            overflow: hidden;
            font-size: clamp(0.58rem, 2.7vw, 0.68rem);
            line-height: 1.25;
            overflow-wrap: anywhere;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .intro-member-copy small {
            min-height: 0;
            font-size: 0.52rem;
          }
          .intro-team-confetti span:nth-child(even) {
            display: none;
          }
          .intro-team-hint {
            margin-top: 8px;
            font-size: 0.58rem;
          }
          .intro-feature-list {
            display: flex;
            gap: 8px;
          }
          .intro-feature-card {
            flex-direction: row;
            align-items: center;
            padding: 11px 13px;
          }
          .intro-feature-card > span {
            width: 40px;
            height: 40px;
          }
          .intro-feature-card p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .intro-enter { width: 100%; justify-content: center; }
          .intro-emotion:nth-of-type(even),
          .intro-flower:nth-of-type(even) {
            display: none;
          }
          .intro-emotion {
            opacity: 0.72;
            transform: scale(0.82);
          }
          .intro-cloud {
            opacity: 0.08;
          }
          .intro-scene-labels span {
            gap: 3px;
            font-size: 0.58rem;
          }
        }

        @media (max-width: 359px) {
          .intro-logo-stage {
            width: 84px;
          }
          .intro-member-copy small {
            display: none;
          }
          .intro-team-hint {
            display: none;
          }
          .intro-welcome h1 {
            font-size: 3rem;
          }
        }

        @media (max-height: 650px) and (orientation: portrait) {
          .intro-scene {
            padding-top: calc(76px + env(safe-area-inset-top, 0px));
            padding-bottom: calc(78px + env(safe-area-inset-bottom, 0px));
          }
          .intro-scene-heading {
            margin-bottom: 12px;
          }
          .intro-project-copy > p,
          .intro-feature-card p {
            display: none;
          }
          .intro-project {
            gap: 14px;
          }
          .intro-project h2 {
            font-size: clamp(1.8rem, 9vw, 2.4rem);
          }
          .intro-feature-list {
            gap: 6px;
          }
          .intro-feature-card {
            padding: 8px 11px;
          }
          .intro-team-quote {
            margin-bottom: 7px;
            padding: 9px 11px;
          }
          .intro-team-quote p {
            font-size: 0.7rem;
          }
          .intro-member-image {
            width: 58px;
          }
          .intro-member-copy small {
            display: none;
          }
        }

        @media (max-height: 480px) and (orientation: landscape) {
          .intro-scene {
            width: 100%;
            height: 100dvh;
            min-height: 0;
            padding-top: calc(60px + env(safe-area-inset-top, 0px));
            padding-right: max(16px, env(safe-area-inset-right, 0px));
            padding-bottom: calc(52px + env(safe-area-inset-bottom, 0px));
            padding-left: max(16px, env(safe-area-inset-left, 0px));
          }
          .intro-logo-stage {
            width: 82px;
            margin-bottom: 8px;
          }
          .intro-welcome h1 { font-size: clamp(2.6rem, 8vw, 4.4rem); }
          .intro-team {
            display: grid;
            grid-template-columns: 0.72fr 1.28fr;
            grid-template-areas:
              "quote members"
              "heading members";
            gap: 8px 24px;
            align-items: center;
          }
          .intro-team-quote {
            grid-area: quote;
            margin: 0;
            padding: 12px 14px;
          }
          .intro-team-quote br {
            display: none;
          }
          .intro-scene-heading {
            grid-area: heading;
            margin-bottom: 0;
            text-align: center;
          }
          .intro-team-grid {
            grid-area: members;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
          }
          .intro-member-card:last-child {
            width: 50%;
            grid-column: 2 / span 2;
          }
          .intro-member-image { width: clamp(54px, 8vw, 76px); }
          .intro-member-copy small { display: none; }
          .intro-team-confetti span:nth-child(3n) {
            display: none;
          }
          .intro-project {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .intro-feature-list {
            display: flex;
          }
          .intro-feature-card {
            flex-direction: row;
            padding: 10px 13px;
          }
        }

        @media (max-height: 340px) and (orientation: landscape) {
          .intro-member-image {
            width: clamp(48px, 7vw, 54px);
          }
          .intro-scene-labels span {
            font-size: 0;
          }
          .intro-scene-labels i {
            font-size: 0.58rem;
          }
          .intro-team-quote {
            padding: 8px 10px;
          }
          .intro-team-quote p {
            font-size: 0.66rem;
          }
        }

        .performance-mode .intro-grid-glow,
        .performance-mode .intro-light-beam {
          animation: none !important;
        }

        .performance-mode .intro-cloud-three,
        .performance-mode .intro-emotion:nth-of-type(even),
        .performance-mode .intro-flower:nth-of-type(even) {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .cinematic-intro .intro-scene {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }

          .cinematic-intro *,
          .cinematic-intro *::before,
          .cinematic-intro *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </main>
  );
}
