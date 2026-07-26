import React, { useState } from 'react';
import { Sparkles, Send, Heart, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" style={{ padding: '80px 0 40px 0', borderTop: '1px solid rgba(192, 132, 252, 0.2)', position: 'relative', zIndex: 2, background: 'rgba(5, 3, 14, 0.9)' }}>
      <div className="container">
        {/* CTA Card Header */}
        <div
          className="glass-card"
          style={{
            padding: '50px 30px',
            textAlign: 'center',
            marginBottom: '70px',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.15))',
            border: '1px solid rgba(192, 132, 252, 0.4)',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Heart size={18} fill="#c084fc" /> Đồng Hành Cùng Chúng Tôi
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '16px' }}>
            Bạn Không Một Mình. CalmX Ở Đây Để Đồng Hành Cùng Bạn.
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto 30px auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Mọi thắc mắc, đề xuất hợp tác hoặc tài trợ cho dự án CalmX tại HUIT STARTUP 2026 xin vui lòng gửi thông tin trực tiếp cho đội ngũ CalmX!
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <input
                type="text"
                required
                placeholder="Họ và tên của bạn"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(192, 132, 252, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
              <input
                type="email"
                required
                placeholder="Địa chỉ Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(192, 132, 252, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
            <textarea
              placeholder="Lời nhắn của bạn tới dự án CalmX..."
              rows={3}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(192, 132, 252, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#fff',
                outline: 'none',
                resize: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              <Send size={18} /> {submitted ? 'Đã Gửi Thành Công! ✨' : 'Gửi Tin Nhắn Cho Nhóm'}
            </button>
          </form>
        </div>

        {/* Footer Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>
              Calm<span style={{ color: '#06b6d4' }}>X</span> Digital Orbit
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Lắng nghe • Thấu hiểu • Đồng hành. Giải pháp tự chăm sóc sức khỏe tinh thần độc đáo tại HUIT STARTUP 2026.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#c084fc' }}>Thành Viên Nòng Cốt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: '#d1d5db' }}>
              <div>• Hoàng Phú Thịnh (Điều phối & Chiến lược)</div>
              <div>• Huỳnh Quang Sang (Tài chính & Vận hành)</div>
              <div>• Đặng Khánh Linh (Marketing & Đối tác)</div>
              <div>• Nguyễn Phạm Trọng Khang (Dữ liệu & Dashboard)</div>
              <div>• Trần An Kỳ (Kỹ thuật AI Caly)</div>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#06b6d4' }}>Cố Vấn & Hướng Dẫn</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: '#d1d5db' }}>
              <div>• Th.S Phạm Thiên Vũ</div>
              <div>• BS.CK1 Lư Trọng Tín</div>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#f43f5e' }}>Đơn Vị Chủ Quản</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#9ca3af' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> HUIT - Trường Đại học Công Thương TP.HCM</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> contact@calmx.app</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={16} /> Cuộc thi HUIT STARTUP 2026</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#9ca3af', fontSize: '0.85rem' }}>
          © 2026 CalmX - Team CalmX (Khát Vọng) | HUIT STARTUP 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
