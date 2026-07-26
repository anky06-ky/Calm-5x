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
  { id: 'team', label: 'Đội ngũ', duration: 12000 },
  { id: 'project', label: 'Dự án', duration: 5000 },
];

const memberAccents = ['#c084fc', '#f472b6', '#38bdf8', '#34d399', '#facc15'];
const confettiColors = ['#c084fc', '#f472b6', '#38bdf8', '#34d399', '#facc15'];
const teamConfetti = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37 + 5) % 98}%`,
  size: 5 + (index % 4) * 2,
  color: confettiColors[index % confettiColors.length],
  duration: 5.6 + (index % 5) * 0.72,
  delay: -(index % 9) * 0.64,
  drift: `${((index * 29) % 76) - 38}px`,
  round: index % 3 === 0,
}));

const ambientClouds = [
  {
    top: '8%',
    size: 'clamp(210px, 25vw, 390px)',
    duration: 44,
    delay: -11,
    opacity: 0.18,
    blur: 3,
    rise: '-18px',
    tone: 'violet',
    depth: 'far',
  },
  {
    top: '24%',
    size: 'clamp(150px, 18vw, 280px)',
    duration: 31,
    delay: -23,
    opacity: 0.24,
    blur: 1,
    rise: '14px',
    tone: 'cyan',
    depth: 'mid',
    reverse: true,
  },
  {
    top: '41%',
    size: 'clamp(250px, 31vw, 470px)',
    duration: 49,
    delay: -36,
    opacity: 0.14,
    blur: 5,
    rise: '-12px',
    tone: 'pearl',
    depth: 'far',
  },
  {
    top: '57%',
    size: 'clamp(170px, 21vw, 320px)',
    duration: 35,
    delay: -7,
    opacity: 0.21,
    blur: 2,
    rise: '-22px',
    tone: 'pink',
    depth: 'mid',
  },
  {
    top: '70%',
    size: 'clamp(300px, 38vw, 560px)',
    duration: 52,
    delay: -27,
    opacity: 0.13,
    blur: 7,
    rise: '10px',
    tone: 'cyan',
    depth: 'far',
    reverse: true,
  },
  {
    top: '81%',
    size: 'clamp(190px, 24vw, 360px)',
    duration: 38,
    delay: -18,
    opacity: 0.23,
    blur: 2,
    rise: '-16px',
    tone: 'violet',
    depth: 'near',
    reverse: true,
  },
];

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
  { left: '7%', top: '18%', delay: 0.4, duration: 12.5, size: 34, color: '#f472b6' },
  { left: '91%', top: '19%', delay: 1.1, duration: 14.2, size: 26, color: '#c084fc' },
  { left: '9%', top: '75%', delay: 1.8, duration: 15.6, size: 30, color: '#38bdf8' },
  { left: '90%', top: '78%', delay: 2.5, duration: 13.8, size: 38, color: '#34d399' },
  { left: '22%', top: '90%', delay: 3.1, duration: 16.4, size: 24, color: '#facc15' },
  { left: '79%', top: '91%', delay: 3.7, duration: 14.8, size: 28, color: '#f472b6' },
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
  const wasPausedRef = useRef(paused);
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
    if (wasPausedRef.current && !paused && scene.id === 'team') {
      remainingTimeRef.current = Math.max(remainingTimeRef.current, 4000);
    }
    wasPausedRef.current = paused;
  }, [paused, scene.id]);

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
      className={`cinematic-intro intro-theme-${scene.id} ${
        paused || !isPageVisible ? 'is-paused' : ''
      }`}
      aria-label="Mở đầu giới thiệu CalmX"
    >
      <div className="intro-grid-glow" aria-hidden="true" />
      <div className="intro-light-beam intro-light-beam-one" aria-hidden="true" />
      <div className="intro-light-beam intro-light-beam-two" aria-hidden="true" />
      <div className="intro-sky-decor" aria-hidden="true">
        <span className="intro-aurora-field" />
        <span className="intro-dust-field intro-dust-field-far" />
        <span className="intro-dust-field intro-dust-field-near" />

        <div className="intro-cloud-field">
          {ambientClouds.map((cloud, index) => (
            <span
              key={`${cloud.top}-${index}`}
              className={`intro-cloud-lane intro-cloud-${cloud.depth} ${
                cloud.reverse ? 'is-reverse' : ''
              }`}
              style={{
                '--cloud-top': cloud.top,
                '--cloud-size': cloud.size,
                '--cloud-duration': `${cloud.duration}s`,
                '--cloud-delay': `${cloud.delay}s`,
                '--cloud-opacity': cloud.opacity,
                '--cloud-blur': `${cloud.blur}px`,
                '--cloud-rise': cloud.rise,
              }}
            >
              <i className={`intro-cloud intro-cloud-${cloud.tone}`} />
            </span>
          ))}
        </div>

        <span className="intro-cloud-bank intro-cloud-bank-back" />
        <span className="intro-cloud-bank intro-cloud-bank-front" />

        <div className="intro-emotion-field">
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
        </div>

        <div className="intro-flower-field">
          {floatingFlowers.map((flower, index) => (
            <span
              key={`${flower.left}-${flower.top}`}
              className="intro-flower"
              style={{
                '--flower-left': flower.left,
                '--flower-top': flower.top,
                '--flower-delay': `${flower.delay}s`,
                '--flower-duration': `${flower.duration}s`,
                '--flower-size': `${flower.size}px`,
                '--flower-color': flower.color,
              }}
            >
              {Array.from({ length: 6 }, (_, petalIndex) => (
                <i key={petalIndex} style={{ '--petal-index': petalIndex }} />
              ))}
              <b />
            </span>
          ))}
        </div>

        <span className="intro-atmosphere-clarity" />
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
                    '--confetti-size': `${particle.size}px`,
                    '--confetti-color': particle.color,
                    '--confetti-duration': `${particle.duration}s`,
                    '--confetti-delay': `${particle.delay}s`,
                    '--confetti-drift': particle.drift,
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
            radial-gradient(circle at 50% 43%, rgba(88, 28, 135, 0.24), transparent 38%),
            radial-gradient(circle at 10% 18%, rgba(14, 116, 144, 0.11), transparent 28%),
            radial-gradient(circle at 88% 82%, rgba(190, 24, 93, 0.08), transparent 26%),
            linear-gradient(145deg, rgba(6, 7, 20, 0.88), rgba(3, 6, 16, 0.98));
          isolation: isolate;
        }

        .intro-grid-glow {
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: 0.07;
          background-image:
            linear-gradient(rgba(192, 132, 252, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, #000, transparent 74%);
          animation: introGridDrift 12s linear infinite;
        }

        .intro-light-beam {
          position: absolute;
          z-index: -1;
          width: 38vw;
          height: 140vh;
          opacity: 0.13;
          filter: blur(46px);
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
          --clarity-width: 48%;
          --clarity-height: 54%;
          --emotion-opacity: 0.28;
          --flower-opacity: 0.48;
          --cloud-field-opacity: 0.82;
          --bank-opacity: 0.18;
        }

        .intro-theme-prelude .intro-sky-decor {
          --clarity-width: 38%;
          --clarity-height: 46%;
          --emotion-opacity: 0.08;
          --flower-opacity: 0.16;
          --cloud-field-opacity: 0.68;
          --bank-opacity: 0.14;
        }

        .intro-theme-welcome .intro-sky-decor {
          --clarity-width: 62%;
          --clarity-height: 62%;
          --emotion-opacity: 0.18;
          --flower-opacity: 0.56;
          --cloud-field-opacity: 0.88;
          --bank-opacity: 0.2;
        }

        .intro-theme-team .intro-sky-decor {
          --clarity-width: 84%;
          --clarity-height: 78%;
          --emotion-opacity: 0.72;
          --flower-opacity: 0.86;
          --cloud-field-opacity: 0.76;
          --bank-opacity: 0.22;
        }

        .intro-theme-project .intro-sky-decor {
          --clarity-width: 86%;
          --clarity-height: 74%;
          --emotion-opacity: 0.38;
          --flower-opacity: 0.5;
          --cloud-field-opacity: 0.82;
          --bank-opacity: 0.2;
        }

        .intro-aurora-field {
          position: absolute;
          inset: -28%;
          z-index: 0;
          opacity: 0.46;
          background:
            radial-gradient(ellipse at 24% 36%, rgba(168, 85, 247, 0.22), transparent 31%),
            radial-gradient(ellipse at 76% 32%, rgba(34, 211, 238, 0.16), transparent 32%),
            radial-gradient(ellipse at 58% 78%, rgba(52, 211, 153, 0.1), transparent 30%);
          filter: blur(54px);
          transform-origin: center;
          animation: introAuroraBreathe 24s ease-in-out infinite alternate;
        }

        .intro-dust-field {
          position: absolute;
          inset: -12%;
          z-index: 1;
          opacity: 0.52;
          background-image:
            radial-gradient(circle, rgba(244, 114, 182, 0.85) 0 1px, transparent 1.7px),
            radial-gradient(circle, rgba(56, 189, 248, 0.72) 0 1.2px, transparent 1.9px),
            radial-gradient(circle, rgba(52, 211, 153, 0.56) 0 0.8px, transparent 1.5px);
          background-position: 12px 24px, 62px 88px, 19px 57px;
          background-size: 127px 151px, 181px 203px, 97px 113px;
          mask-image: radial-gradient(ellipse at 50% 48%, transparent 0 27%, #000 69%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 48%, transparent 0 27%, #000 69%);
          animation: introDustDrift 30s linear infinite;
        }

        .intro-dust-field-near {
          z-index: 3;
          opacity: 0.3;
          background-image:
            radial-gradient(circle, rgba(250, 204, 21, 0.82) 0 1.7px, transparent 2.5px),
            radial-gradient(circle, rgba(192, 132, 252, 0.82) 0 1.4px, transparent 2.2px);
          background-position: 42px 18px, 18px 76px;
          background-size: 233px 271px, 197px 223px;
          animation-duration: 20s;
          animation-direction: reverse;
        }

        .intro-cloud-field {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: var(--cloud-field-opacity);
          transition: opacity 800ms ease;
        }

        .intro-cloud-lane {
          position: absolute;
          top: var(--cloud-top);
          left: -42vw;
          width: var(--cloud-size);
          opacity: var(--cloud-opacity);
          animation: introCloudTravel var(--cloud-duration) var(--cloud-delay) linear infinite;
          will-change: transform;
        }

        .intro-cloud-lane.is-reverse {
          animation-direction: reverse;
        }

        .intro-cloud {
          --cloud-a: rgba(224, 231, 255, 0.66);
          --cloud-b: rgba(168, 85, 247, 0.16);
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 3.2 / 1;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--cloud-a), var(--cloud-b));
          box-shadow:
            inset 0 9px 22px rgba(255, 255, 255, 0.13),
            0 18px 54px rgba(7, 5, 20, 0.28);
          filter: blur(var(--cloud-blur));
          animation: introCloudBreathe 8s ease-in-out infinite alternate;
        }

        .intro-cloud::before,
        .intro-cloud::after {
          content: '';
          position: absolute;
          bottom: 16%;
          border-radius: 52% 52% 46% 46%;
          background: linear-gradient(155deg, var(--cloud-a), var(--cloud-b));
        }

        .intro-cloud::before {
          left: 13%;
          width: 44%;
          aspect-ratio: 1.15;
        }

        .intro-cloud::after {
          right: 12%;
          width: 53%;
          aspect-ratio: 1.28;
        }

        .intro-cloud-cyan {
          --cloud-a: rgba(207, 250, 254, 0.58);
          --cloud-b: rgba(14, 116, 144, 0.13);
        }

        .intro-cloud-pink {
          --cloud-a: rgba(253, 242, 248, 0.58);
          --cloud-b: rgba(219, 39, 119, 0.12);
        }

        .intro-cloud-pearl {
          --cloud-a: rgba(248, 250, 252, 0.5);
          --cloud-b: rgba(148, 163, 184, 0.11);
        }

        .intro-cloud-bank {
          position: absolute;
          right: -12%;
          bottom: -104px;
          left: -12%;
          z-index: 4;
          height: 238px;
          opacity: var(--bank-opacity);
          background:
            radial-gradient(ellipse at 7% 92%, rgba(224, 231, 255, 0.7) 0 10%, transparent 23%),
            radial-gradient(ellipse at 21% 84%, rgba(216, 180, 254, 0.62) 0 13%, transparent 27%),
            radial-gradient(ellipse at 39% 98%, rgba(207, 250, 254, 0.65) 0 15%, transparent 30%),
            radial-gradient(ellipse at 59% 86%, rgba(224, 231, 255, 0.64) 0 14%, transparent 29%),
            radial-gradient(ellipse at 78% 96%, rgba(216, 180, 254, 0.58) 0 14%, transparent 29%),
            radial-gradient(ellipse at 96% 86%, rgba(207, 250, 254, 0.62) 0 12%, transparent 26%);
          filter: blur(12px);
          transform-origin: center bottom;
          animation: introCloudBankSway 19s ease-in-out infinite alternate;
          transition: opacity 800ms ease;
        }

        .intro-cloud-bank-front {
          right: -18%;
          bottom: -142px;
          left: -18%;
          height: 292px;
          opacity: var(--bank-opacity);
          filter: blur(20px) opacity(72%);
          transform: scaleX(1.08);
          animation-duration: 25s;
          animation-direction: alternate-reverse;
        }

        .intro-emotion-field,
        .intro-flower-field {
          position: absolute;
          inset: 0;
          z-index: 5;
          opacity: var(--emotion-opacity);
          transition: opacity 800ms ease;
        }

        .intro-flower-field {
          z-index: 6;
          opacity: var(--flower-opacity);
        }

        .intro-theme-prelude .intro-emotion-field,
        .intro-theme-prelude .intro-flower-field,
        .intro-theme-prelude .intro-dust-field,
        .intro-theme-welcome .intro-emotion-field,
        .intro-theme-welcome .intro-dust-field,
        .intro-theme-team .intro-dust-field,
        .intro-theme-project .intro-emotion-field,
        .intro-theme-project .intro-flower-field,
        .intro-theme-project .intro-dust-field {
          display: none;
        }

        .intro-theme-welcome .intro-aurora-field,
        .intro-theme-team .intro-aurora-field {
          animation: none;
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
          filter: saturate(0.86);
          animation: introEmotionFloat var(--emotion-duration) var(--emotion-delay) ease-in-out infinite;
        }

        .intro-flower {
          position: absolute;
          top: var(--flower-top);
          left: var(--flower-left);
          width: var(--flower-size);
          height: var(--flower-size);
          opacity: 0;
          filter: drop-shadow(0 0 9px color-mix(in srgb, var(--flower-color) 48%, transparent));
          transform-origin: center;
          animation:
            introFlowerBloom 1.2s var(--flower-delay) cubic-bezier(0.16, 1, 0.3, 1) forwards,
            introFlowerSway var(--flower-duration) calc(var(--flower-delay) + 1.2s) ease-in-out infinite;
        }

        .intro-flower i {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38%;
          height: 56%;
          border: 1px solid color-mix(in srgb, var(--flower-color) 72%, white);
          border-radius: 70% 70% 58% 58%;
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--flower-color) 58%, white),
            color-mix(in srgb, var(--flower-color) 48%, transparent)
          );
          transform:
            translate(-50%, -100%)
            rotate(calc(var(--petal-index) * 60deg))
            translateY(-8%);
          transform-origin: 50% 100%;
        }

        .intro-flower b {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 26%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #fef08a;
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
          transform: translate(-50%, -50%);
        }

        .intro-atmosphere-clarity {
          position: absolute;
          inset: 0;
          z-index: 7;
          background: radial-gradient(
            ellipse var(--clarity-width) var(--clarity-height) at 50% 47%,
            rgba(5, 7, 18, 0.7),
            rgba(5, 7, 18, 0.42) 56%,
            transparent 84%
          );
          transition: background 800ms ease;
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
          position: relative;
          max-width: 850px;
          text-align: center;
          isolation: isolate;
        }

        .intro-prelude::before,
        .intro-welcome::before {
          content: '';
          position: absolute;
          z-index: -1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 68%);
          pointer-events: none;
          animation: introContentHalo 10s ease-in-out infinite alternate;
        }

        .intro-prelude::before {
          inset: -18% 8%;
        }

        .intro-welcome::before {
          inset: -9% -5%;
          background:
            radial-gradient(circle at 38% 42%, rgba(244, 114, 182, 0.15), transparent 38%),
            radial-gradient(circle at 63% 57%, rgba(34, 211, 238, 0.13), transparent 40%);
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
          isolation: isolate;
        }

        .intro-team::before {
          content: '';
          position: absolute;
          inset: 10% 3% 1%;
          z-index: 0;
          opacity: 0.34;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at center, transparent 0 56%, rgba(192, 132, 252, 0.2) 57%, transparent 59%),
            radial-gradient(ellipse at center, rgba(56, 189, 248, 0.07), transparent 67%);
          filter: blur(0.2px);
          animation: introTeamHalo 13s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .intro-team-confetti {
          position: absolute;
          inset: -5vh -4vw;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          contain: paint;
          animation: introConfettiFieldIn 800ms 520ms ease backwards;
        }

        .intro-team-confetti span {
          position: absolute;
          top: -10vh;
          left: var(--confetti-left);
          width: var(--confetti-size);
          height: var(--confetti-size);
          opacity: 0.9;
          border-radius: var(--confetti-radius);
          background: var(--confetti-color);
          box-shadow: 0 0 13px color-mix(in srgb, var(--confetti-color) 65%, transparent);
          animation: introConfettiFall var(--confetti-duration) var(--confetti-delay)
            linear infinite;
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
          animation: introAvatarPulse 2.8s calc(1s + var(--intro-member-index) * 0.14s)
            ease-in-out 1 both;
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
          animation: introHintPulse 1.7s 1.6s ease-in-out 2 backwards;
        }

        .intro-project {
          position: relative;
          display: grid;
          width: 100%;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: clamp(34px, 6vw, 84px);
          align-items: center;
          isolation: isolate;
        }

        .intro-project::before {
          content: '';
          position: absolute;
          inset: -14% -5%;
          z-index: -1;
          opacity: 0.55;
          border-radius: 42%;
          background:
            radial-gradient(circle at 24% 48%, rgba(244, 114, 182, 0.12), transparent 34%),
            radial-gradient(circle at 76% 52%, rgba(56, 189, 248, 0.13), transparent 36%);
          animation: introContentHalo 12s ease-in-out infinite alternate-reverse;
          pointer-events: none;
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

        .cinematic-intro.is-paused *,
        .cinematic-intro.is-paused *::before,
        .cinematic-intro.is-paused *::after {
          animation-play-state: paused !important;
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

        @keyframes introAuroraBreathe {
          from { transform: translate3d(-3vw, -1vh, 0) rotate(-2deg) scale(0.98); }
          to { transform: translate3d(4vw, 2vh, 0) rotate(3deg) scale(1.06); }
        }

        @keyframes introDustDrift {
          from { transform: translate3d(-2vw, 1vh, 0) rotate(0.01deg); }
          to { transform: translate3d(3vw, -3vh, 0) rotate(1.2deg); }
        }

        @keyframes introCloudTravel {
          from { transform: translate3d(-10vw, 0, 0); }
          to { transform: translate3d(152vw, var(--cloud-rise), 0); }
        }

        @keyframes introCloudBreathe {
          from { transform: translate3d(0, 2px, 0) scale(0.97); }
          to { transform: translate3d(0, -4px, 0) scale(1.025); }
        }

        @keyframes introCloudBankSway {
          from { transform: translate3d(-2.5vw, 4px, 0) scaleX(1.02); }
          to { transform: translate3d(2.5vw, -7px, 0) scaleX(1.08); }
        }

        @keyframes introContentHalo {
          from { opacity: 0.52; transform: translate3d(-1.5%, 1%, 0) scale(0.96); }
          to { opacity: 0.84; transform: translate3d(1.5%, -1%, 0) scale(1.06); }
        }

        @keyframes introTeamHalo {
          from { transform: translate3d(-1.5%, 0, 0) scale(0.96) rotate(-1deg); }
          to { transform: translate3d(1.5%, -1%, 0) scale(1.04) rotate(1deg); }
        }

        @keyframes introHintPulse {
          0%, 100% { opacity: 0.46; transform: translate3d(0, 0, 0); }
          50% { opacity: 1; transform: translate3d(0, -2px, 0); }
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

        @keyframes introConfettiFall {
          0% {
            opacity: 0;
            transform: translate3d(0, -8vh, 0) rotate(0deg) scale(0.72);
          }
          14% { opacity: 0.92; }
          78% { opacity: 0.78; }
          100% {
            opacity: 0;
            transform: translate3d(var(--confetti-drift), 122vh, 0) rotate(540deg) scale(1.06);
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
          .intro-team-confetti span:nth-child(5n) {
            display: none;
          }
          .intro-team-confetti {
            inset: 0;
          }
          .intro-team-confetti span {
            box-shadow: none;
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
          .intro-light-beam {
            display: none;
          }
          .intro-dust-field-near,
          .intro-cloud-bank-front,
          .intro-cloud-lane:nth-child(n + 3),
          .intro-emotion:nth-child(n + 3),
          .intro-flower:nth-child(n + 3) {
            display: none;
          }
          .intro-grid-glow {
            animation: none;
          }
          .intro-emotion {
            transform: scale(0.82);
            backdrop-filter: none;
          }
          .intro-cloud,
          .intro-member-image,
          .intro-prelude::before,
          .intro-welcome::before,
          .intro-team::before,
          .intro-project::before {
            animation: none;
          }
          .intro-cloud-bank {
            filter: blur(15px);
          }
          .intro-welcome-card,
          .intro-team-quote,
          .intro-feature-card {
            backdrop-filter: none;
          }
          .intro-scene-labels span {
            gap: 5px;
            font-size: 0;
          }
          .intro-scene-labels span.active {
            font-size: 0.58rem;
          }
          .intro-scene-labels i {
            width: 7px;
            height: 7px;
            overflow: hidden;
            font-size: 0;
            border-radius: 50%;
            background: currentColor;
          }
          .intro-scene-labels span.active i {
            width: 9px;
            height: 9px;
            box-shadow: 0 0 10px currentColor;
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

        @media (max-height: 700px) and (min-width: 901px) {
          .intro-scene {
            padding-top: calc(64px + env(safe-area-inset-top, 0px));
            padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px));
          }
          .intro-logo-stage {
            width: 94px;
            margin-bottom: 10px;
          }
          .intro-prelude h1 {
            margin-top: 8px;
            font-size: 2.8rem;
          }
          .intro-welcome h1 {
            margin: 8px 0 12px;
            font-size: clamp(3.4rem, 8vw, 5.6rem);
          }
          .intro-welcome-card {
            padding: 14px 22px;
          }
          .intro-team-quote {
            max-width: 760px;
            gap: 10px;
            margin-bottom: 8px;
            padding: 10px 18px;
          }
          .intro-team-quote br {
            display: none;
          }
          .intro-team-quote p {
            font-size: 0.8rem;
            line-height: 1.45;
          }
          .intro-scene-heading {
            margin-bottom: 8px;
          }
          .intro-scene-heading h2 {
            font-size: 1.8rem;
          }
          .intro-team-grid {
            max-width: 900px;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 14px;
          }
          .intro-member-card:last-child {
            width: auto;
            grid-column: auto;
          }
          .intro-member-image {
            width: 76px;
          }
          .intro-member-copy {
            padding-top: 6px;
          }
          .intro-member-copy small {
            display: none;
          }
          .intro-team-hint {
            margin-top: 7px;
          }
          .intro-project {
            gap: 26px;
          }
          .intro-project-copy > p {
            margin: 10px 0 14px;
          }
          .intro-feature-list {
            gap: 8px;
          }
          .intro-feature-card {
            padding: 10px 13px;
          }
          .intro-feature-card p {
            display: none;
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
          .intro-team-confetti span:nth-child(even),
          .intro-team-confetti span:nth-child(5n) {
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
          .intro-cloud-lane:nth-child(n + 3),
          .intro-emotion:nth-child(n + 3),
          .intro-flower:nth-child(n + 3),
          .intro-cloud-bank-front,
          .intro-dust-field-near {
            display: none;
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

        .performance-mode .intro-grid-glow {
          animation: none !important;
        }

        .performance-mode .intro-light-beam,
        .performance-mode .intro-aurora-field,
        .performance-mode .intro-dust-field-near,
        .performance-mode .intro-cloud-lane:nth-child(n + 3),
        .performance-mode .intro-emotion:nth-child(n + 3),
        .performance-mode .intro-flower,
        .performance-mode .intro-cloud-bank-front,
        .performance-mode .intro-team-confetti span:nth-child(n + 9) {
          display: none;
        }

        .performance-mode .intro-cloud,
        .performance-mode .intro-member-image,
        .performance-mode .intro-cloud-bank,
        .performance-mode .intro-prelude::before,
        .performance-mode .intro-welcome::before,
        .performance-mode .intro-team::before,
        .performance-mode .intro-project::before {
          animation: none !important;
        }

        .performance-mode .intro-emotion,
        .performance-mode .intro-welcome-card,
        .performance-mode .intro-team-quote,
        .performance-mode .intro-feature-card {
          backdrop-filter: none;
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
            animation: none !important;
            transition-duration: 0.01ms !important;
          }

          .cinematic-intro .intro-cloud-field,
          .cinematic-intro .intro-emotion-field,
          .cinematic-intro .intro-flower-field,
          .cinematic-intro .intro-dust-field-near,
          .cinematic-intro .intro-light-beam,
          .cinematic-intro .intro-team-confetti {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
