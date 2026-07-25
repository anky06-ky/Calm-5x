import React from 'react';
import { Target, Shield, Heart, Award, Check, Sparkles, GraduationCap, Briefcase, Building } from 'lucide-react';

export default function ImpactPricing() {
  return (
    <section id="impact" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '0.88rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Target size={16} /> Tác Động Xã Hội & Mô Hình Kinh Doanh
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '16px' }}>
            Giải Pháp Đột Phá Hướng Đến <span className="cyber-text">SDG 3 & SDG 8</span>
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            CalmX không chỉ là ứng dụng, mà là giải pháp giảm bớt rào cản tâm lý, giúp thế hệ trẻ tiếp cận việc chăm sóc tinh thần chủ động và nhẹ nhàng.
          </p>
        </div>

        {/* Target Groups Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '70px' }}>
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '16px' }}>
              <GraduationCap size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Dành Cho Sinh Viên</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Cung cấp không gian riêng tư để ghi nhận cảm xúc, giải tỏa áp lực học tập và lấy lại sự cân bằng tinh thần hàng ngày.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '16px' }}>
              <Briefcase size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Người Đi Làm Trẻ</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Công cụ theo dõi xu hướng tâm trạng, quản lý căng thẳng nơi công sở và duy trì năng lượng tích cực bền vững.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e', marginBottom: '16px' }}>
              <Building size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Trường Học & Doanh Nghiệp</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Gói thử nghiệm B2B giúp gia tăng phúc lợi tinh thần cho sinh viên và nhân viên với chi phí tối ưu nhất.
            </p>
          </div>
        </div>

        {/* Pricing Table */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>Bảng Giá Gói Dịch Vụ Linh Hoạt</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Freemium */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#9ca3af', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px' }}>Gói Miễn Phí</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
                0<span style={{ fontSize: '1rem', fontWeight: '500', color: '#9ca3af' }}> VNĐ</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '24px' }}>
                Dành cho người dùng mới bắt đầu hành trình check-in cảm xúc.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: '#e9d5ff', fontSize: '0.9rem', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Check-in 5 trạng thái cảm xúc</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Trò chuyện AI Caly cơ bản</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Tham gia Cộng đồng ẩn danh</li>
              </ul>
            </div>
            <a href="#demo" className="btn-secondary" style={{ justifyContent: 'center' }}>Trải Nghiệm Ngay</a>
          </div>

          {/* Medium Card - Highlighted */}
          <div
            className="glass-card"
            style={{
              padding: '32px',
              border: '2px solid #a855f7',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.35)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 14px', borderRadius: '99px' }}>
              KHUYÊN DÙNG
            </div>
            <div>
              <div style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px' }}>Gói Medium</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
                69.000<span style={{ fontSize: '1rem', fontWeight: '500', color: '#9ca3af' }}> VNĐ / tháng</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '24px' }}>
                Dành cho người dùng muốn theo dõi lịch sử dài hạn & báo cáo nâng cao.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: '#e9d5ff', fontSize: '0.9rem', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Mọi tính năng gói Miễn phí</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Lưu lịch sử nhật ký không giới hạn</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Báo cáo xu hướng cảm xúc 30 ngày</li>
              </ul>
            </div>
            <a href="#contact" className="btn-primary" style={{ justifyContent: 'center' }}>Đăng Ký Trải Nghiệm</a>
          </div>

          {/* Premium Card */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#06b6d4', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px' }}>Gói Premium</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
                149.000<span style={{ fontSize: '1rem', fontWeight: '500', color: '#9ca3af' }}> VNĐ / tháng</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '24px' }}>
                Cá nhân hóa chuyên sâu & trải nghiệm trọn vẹn nhất hệ sinh thái CalmX.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: '#e9d5ff', fontSize: '0.9rem', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Toàn bộ quyền lợi gói Medium</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Ưu tiên kết nối chuyên gia CalmX Care</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#4ade80" /> Kho nhạc sóng não 432Hz độc quyền</li>
              </ul>
            </div>
            <a href="#contact" className="btn-secondary" style={{ justifyContent: 'center' }}>Đăng Ký Premium</a>
          </div>
        </div>
      </div>
    </section>
  );
}
