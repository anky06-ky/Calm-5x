import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Smile, Frown, Meh, Laugh, HeartPulse, Send, MessageSquare, BookOpen,
  TrendingUp, Users, Calendar, Heart, PlusCircle, CheckCircle, Sparkles, AlertCircle
} from 'lucide-react';

export default function AppDemo() {
  const [activeTab, setActiveTab] = useState('checkin');

  // Check-in State
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Chat AI Caly State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'caly', text: 'Xin chào bạn! Mình là AI Caly. Hôm nay ngày của bạn thế nào? Hãy chia sẻ với mình nhé! 💜' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Journal State
  const [journalNote, setJournalNote] = useState('');
  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('calmx_journal_entries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, text: 'Hôm nay chuẩn bị xong slide HUIT STARTUP 2026, nhóm Khát Vọng làm việc rất ăn ý!', date: 'Hôm nay, 14:30', mood: '😄 Rất tốt' },
      { id: 2, text: 'Dành 10 phút hít thở sâu cùng AI Caly, cảm giác áp lực tan biến nhiều.', date: 'Hôm qua, 21:15', mood: '🙂 Tốt' }
    ];
  });

  // Anonymous Community State
  const [posts, setPosts] = useState([
    { id: 1204, author: 'Ẩn danh #1204', content: 'Hôm nay mình thấy hơi áp lực công việc, nhưng đọc chia sẻ của mọi người ở đây làm mình cảm thấy dễ chịu hơn rất nhiều.', likes: 24, liked: false, time: '10 phút trước' },
    { id: 821, author: 'Ẩn danh #0821', content: 'Mình đang tập thói quen check-in cảm xúc với CalmX mỗi ngày. Hy vọng mọi chuyện sẽ ngày một ổn hơn! ✨', likes: 45, liked: false, time: '1 giờ trước' },
    { id: 4510, author: 'Ẩn danh #4510', content: 'Cảm ơn team CalmX vì đã tạo ra một không gian ấm áp để tâm sự mà không sợ bị phán xét.', likes: 38, liked: false, time: '3 giờ trước' }
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  // CalmX Care Modal State
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Emotion options
  const emotions = [
    { id: 'very_bad', label: 'Rất tệ', emoji: '😭', color: '#f43f5e', text: 'Bạn đã rất vất vả rồi. Thả lỏng vai và nghỉ ngơi một chút nhé.' },
    { id: 'bad', label: 'Tệ', emoji: '😔', color: '#fb923c', text: 'Caly nghe bạn rồi. Hãy nhớ rằng mọi cảm xúc mệt mỏi chỉ là tạm thời.' },
    { id: 'normal', label: 'Bình thường', emoji: '😐', color: '#facc15', text: 'Một ngày tĩnh lặng. Bạn muốn dành 5 phút nghe nhạc 432Hz không?' },
    { id: 'good', label: 'Tốt', emoji: '🙂', color: '#4ade80', text: 'Tuyệt vời! Hãy giữ vững năng lượng tích cực này nhé!' },
    { id: 'very_good', label: 'Rất tốt', emoji: '😄', color: '#38bdf8', text: 'Một ngày bùng nổ năng lượng! Hãy lan tỏa niềm vui đến mọi người!' }
  ];

  // Handle Checkin Click
  const handleCheckin = (emo) => {
    setSelectedEmotion(emo);
    setToastMessage(`CalmX đã ghi nhận cảm xúc hôm nay của bạn: ${emo.emoji} ${emo.label}!`);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    // Auto add response in Caly chat
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Handle Send Chat
  const handleSendMessage = (textToSend) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim()) return;

    const newChat = [...chatMessages, { sender: 'user', text: msg }];
    setChatMessages(newChat);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let calyReply = 'Caly đã lắng nghe bạn. Có vẻ hôm nay bạn đã trải qua nhiều cảm xúc. Hãy thử hít thở chậm trong 30 giây cùng Caly nhé? 💜';
      if (msg.includes('mệt') || msg.includes('áp lực')) {
        calyReply = 'Caly thấu hiểu cảm giác này. Bạn hãy tạm gác lại công việc, uống một ngụm nước ấm và nghỉ ngơi 5 phút nhé.';
      } else if (msg.includes('cảm ơn') || msg.includes('vui')) {
        calyReply = 'Caly rất vui vì được đồng hành cùng bạn! Bạn luôn có Caly và cộng đồng CalmX ở đây.';
      }

      setChatMessages([...newChat, { sender: 'caly', text: calyReply }]);
      setIsTyping(false);
    }, 1200);
  };

  // Handle Save Journal
  const handleSaveJournal = (e) => {
    e.preventDefault();
    if (!journalNote.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: journalNote,
      date: 'Vừa xong',
      mood: selectedEmotion ? `${selectedEmotion.emoji} ${selectedEmotion.label}` : '🙂 Tốt'
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('calmx_journal_entries', JSON.stringify(updated));
    setJournalNote('');
  };

  // Handle Toggle Like Post
  const handleToggleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  // Handle Add Post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newP = {
      id: randomId,
      author: `Ẩn danh #${randomId}`,
      content: newPostContent,
      likes: 1,
      liked: true,
      time: 'Vừa xong'
    };
    setPosts([newP, ...posts]);
    setNewPostContent('');
  };

  return (
    <section id="demo" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontSize: '0.88rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Sparkles size={16} /> Interactive Prototype App
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '16px' }}>
            Trải Nghiệm Tính Năng <span className="cyber-text">Ứng Dụng CalmX</span>
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Thử nghiệm 6 màn hình chức năng cốt lõi được thiết kế để xoa dịu áp lực và hình thành thói quen chăm sóc sức khỏe tinh thần hàng ngày.
          </p>
        </div>

        {/* Prototype Tabs */}
        <div
          className="app-demo-tabs"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '35px',
          }}
        >
          <button onClick={() => setActiveTab('checkin')} className={activeTab === 'checkin' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <Smile size={16} /> 1. Check-in Cảm Xúc
          </button>
          <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <MessageSquare size={16} /> 2. AI Caly Chat
          </button>
          <button onClick={() => setActiveTab('journal')} className={activeTab === 'journal' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <BookOpen size={16} /> 3. Nhật Ký Cảm Xúc
          </button>
          <button onClick={() => setActiveTab('chart')} className={activeTab === 'chart' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <TrendingUp size={16} /> 4. Biểu Đồ Mood 7 Ngày
          </button>
          <button onClick={() => setActiveTab('community')} className={activeTab === 'community' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <Users size={16} /> 5. Cộng Đồng Ẩn Danh
          </button>
          <button onClick={() => setActiveTab('care')} className={activeTab === 'care' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <HeartPulse size={16} /> 6. CalmX Care
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div
            className="app-demo-toast"
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 9999,
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              color: '#fff',
              padding: '14px 24px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '600',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <CheckCircle size={20} /> {toastMessage}
          </div>
        )}

        {/* App Frame Shell */}
        <div
          className="glass-card app-demo-frame"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '36px',
            borderRadius: '28px',
            boxShadow: '0 20px 50px rgba(7, 5, 16, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* SCREEN 1: CHECK-IN */}
          {activeTab === 'checkin' && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
              <div style={{ color: '#c084fc', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '8px' }}>
                Check-in Tâm Trạng Hôm Nay
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
                Hôm Nay Cảm Xúc Của Bạn Như Thế Nào?
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '36px', maxWidth: '550px', margin: '0 auto 36px auto' }}>
                Hãy chọn 1 biểu tượng cảm xúc gần nhất với bạn ngay lúc này. CalmX sẽ ghi nhận và điều chỉnh gợi ý phù hợp.
              </p>

              <div className="app-emotion-grid" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {emotions.map((emo) => (
                  <button
                    className="app-emotion-button"
                    key={emo.id}
                    onClick={() => handleCheckin(emo)}
                    style={{
                      background: selectedEmotion?.id === emo.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedEmotion?.id === emo.id ? `2px solid ${emo.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      padding: '20px 16px',
                      width: '120px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: selectedEmotion?.id === emo.id ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{emo.emoji}</div>
                    <div style={{ fontWeight: '700', color: emo.color, fontSize: '0.92rem' }}>{emo.label}</div>
                  </button>
                ))}
              </div>

              {selectedEmotion && (
                <div
                  style={{
                    background: 'rgba(168, 85, 247, 0.12)',
                    border: `1px solid ${selectedEmotion.color}`,
                    borderRadius: '16px',
                    padding: '20px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: '700', color: selectedEmotion.color, fontSize: '1.1rem', marginBottom: '6px' }}>
                    Phản hồi từ AI Caly:
                  </div>
                  <p style={{ color: '#e9d5ff', lineHeight: '1.6' }}>"{selectedEmotion.text}"</p>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 2: AI CALY CHAT */}
          {activeTab === 'chat' && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '20px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>AI Caly Assistant</div>
                  <div style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span> Trực tuyến • Lắng nghe không phán xét
                  </div>
                </div>
              </div>

              {/* Chat History */}
              <div style={{ height: '300px', overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      background: msg.sender === 'user' ? 'linear-gradient(135deg, #9333ea, #7c3aed)' : 'rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      padding: '12px 18px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(192, 132, 252, 0.2)',
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', color: '#c084fc', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    AI Caly đang gõ câu trả lời...
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <button onClick={() => handleSendMessage('Hôm nay mình hơi mệt và áp lực...')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db', padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  💬 Hôm nay mình hơi mệt
                </button>
                <button onClick={() => handleSendMessage('Caly gợi ý bài tập hít thở giúp mình với!')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db', padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  🌬️ Gợi ý bài tập hít thở
                </button>
                <button onClick={() => handleSendMessage('Cảm ơn Caly rất nhiều!')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db', padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  💜 Cảm ơn Caly
                </button>
              </div>

              {/* Input Form */}
              <form className="app-demo-inline-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tâm sự hoặc câu hỏi với AI Caly..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 3: JOURNAL */}
          {activeTab === 'journal' && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
                Nhật Ký Cảm Xúc Cá Nhân
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '0.92rem' }}>
                Ghi lại những suy nghĩ, niềm vui hoặc trăn trở trong ngày. Dữ liệu được bảo mật riêng tư tại thiết bị của bạn.
              </p>

              <form onSubmit={handleSaveJournal} style={{ marginBottom: '30px' }}>
                <textarea
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  placeholder="Hôm nay bạn muốn ghi nhận điều gì cho bản thân?"
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    borderRadius: '16px',
                    padding: '16px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    marginBottom: '14px',
                    resize: 'vertical',
                  }}
                />
                <button type="submit" className="btn-primary">
                  Lưu Nhật Ký Cảm Xúc
                </button>
              </form>

              {/* Journal Timeline */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ fontWeight: '700', color: '#c084fc', marginBottom: '14px', fontSize: '0.95rem' }}>
                  Các nhật ký đã ghi nhận ({journalEntries.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {journalEntries.map((item) => (
                    <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem', color: '#9ca3af' }}>
                        <span>{item.date}</span>
                        <span style={{ color: '#06b6d4', fontWeight: '600' }}>{item.mood}</span>
                      </div>
                      <p style={{ color: '#e9d5ff', lineHeight: '1.5', fontSize: '0.92rem' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: MOOD CHART */}
          {activeTab === 'chart' && (
            <div style={{ animation: 'fadeIn 0.4s ease', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>
                Biểu Đồ Xu Hướng Cảm Xúc 7 Ngày
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '0.92rem' }}>
                Theo dõi sự biến thiên tâm trạng để chủ động điều chỉnh nhịp sống và nghỉ ngơi hợp lý.
              </p>

              {/* SVG Curve Chart */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(192,132,252,0.2)', borderRadius: '20px', padding: '30px 20px', marginBottom: '20px' }}>
                <svg viewBox="0 0 700 240" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="40" x2="660" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="40" y1="100" x2="660" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="40" y1="160" x2="660" y2="160" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                  {/* Gradient Area under curve */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 60,100 Q 150,40 240,160 T 420,80 T 600,50 L 600,200 L 60,200 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Smooth Line */}
                  <path
                    d="M 60,100 Q 150,40 240,160 T 420,80 T 600,50"
                    fill="none"
                    stroke="url(#cyber-gradient-svg)"
                    strokeWidth="4"
                  />
                  <defs>
                    <linearGradient id="cyber-gradient-svg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>

                  {/* Nodes */}
                  {[
                    { x: 60, y: 100, day: 'T2', mood: 'Tốt' },
                    { x: 150, y: 40, day: 'T3', mood: 'Rất tốt' },
                    { x: 240, y: 160, day: 'T4', mood: 'Tệ' },
                    { x: 330, y: 120, day: 'T5', mood: 'Bình thường' },
                    { x: 420, y: 80, day: 'T6', mood: 'Tốt' },
                    { x: 510, y: 60, day: 'T7', mood: 'Rất tốt' },
                    { x: 600, y: 50, day: 'CN', mood: 'Tuyệt vời' },
                  ].map((node, i) => (
                    <g key={i}>
                      <circle cx={node.x} cy={node.y} r="7" fill="#a855f7" stroke="#fff" strokeWidth="2" />
                      <text x={node.x} y="225" fill="#9ca3af" fontSize="13" textAnchor="middle">{node.day}</text>
                      <text x={node.x} y={node.y - 12} fill="#c084fc" fontSize="11" textAnchor="middle" fontWeight="bold">{node.mood}</text>
                    </g>
                  ))}
                </svg>
              </div>

              <div style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: '600' }}>
                ✨ Đánh giá chung 7 ngày: Chỉ số trạng thái tích cực đạt 82%. Tiếp tục duy trì bạn nhé!
              </div>
            </div>
          )}

          {/* SCREEN 5: ANONYMOUS COMMUNITY */}
          {activeTab === 'community' && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Cộng Đồng Ẩn Danh</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem' }}>Không gian sẻ chia tích cực & an toàn</p>
                </div>
              </div>

              {/* Add Mock Post Form */}
              <form className="app-demo-inline-form" onSubmit={handleAddPost} style={{ marginBottom: '24px', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Chia sẻ tâm tư ẩn danh với cộng đồng..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px 20px', fontSize: '0.88rem' }}>
                  Đăng Ẩn Danh
                </button>
              </form>

              {/* Feed Posts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {posts.map((post) => (
                  <div key={post.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '700', color: '#c084fc', fontSize: '0.92rem' }}>{post.author}</span>
                      <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{post.time}</span>
                    </div>
                    <p style={{ color: '#e9d5ff', lineHeight: '1.5', fontSize: '0.95rem', marginBottom: '14px' }}>
                      {post.content}
                    </p>
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      style={{
                        background: post.liked ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: post.liked ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.1)',
                        color: post.liked ? '#f43f5e' : '#9ca3af',
                        padding: '6px 14px',
                        borderRadius: '99px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Heart size={14} fill={post.liked ? '#f43f5e' : 'none'} /> {post.likes} Thả tim đồng cảm
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 6: CALMX CARE */}
          {activeTab === 'care' && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '6px' }}>
                  CalmX Care — Định Hướng Kết Nối Chuyên Gia
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                  Khi bạn cần tham vấn chuyên sâu hơn cùng các nhà tâm lý lâm sàng & cố vấn sức khỏe tinh thần.
                </p>
              </div>

              <div className="app-care-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                  { name: 'Th.S Lê Minh Anh', spec: 'Tâm lý Lâm sàng', exp: '8 năm kinh nghiệm', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Th.S Trần Hoàng Nam', spec: 'Tham vấn Tâm lý Giới trẻ', exp: '6 năm kinh nghiệm', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Th.S Nguyễn Khánh Linh', spec: 'Tâm lý Vị thành niên', exp: '7 năm kinh nghiệm', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' }
                ].map((doc, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(192, 132, 252, 0.2)', borderRadius: '18px', padding: '20px', textAlign: 'center' }}>
                    <img src={doc.image} alt={doc.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '2px solid #c084fc' }} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{doc.name}</h4>
                    <div style={{ color: '#06b6d4', fontSize: '0.85rem', fontWeight: '600', margin: '4px 0' }}>{doc.spec}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '16px' }}>{doc.exp}</div>
                    <button
                      onClick={() => setSelectedExpert(doc)}
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}
                    >
                      Đặt Lịch Mô Phỏng
                    </button>
                  </div>
                ))}
              </div>

              {/* Expert Booking Simulation Modal */}
              {selectedExpert && (
                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid #06b6d4', color: '#e0f2fe', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <AlertCircle size={24} color="#06b6d4" style={{ shrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>
                      Thông báo mô phỏng CalmX Care ({selectedExpert.name}):
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>
                      Đây là tính năng trải nghiệm mô phỏng. CalmX Care sẽ chính thức triển khai kết nối trực tiếp khi dự án hợp tác cùng các đơn vị đối tác y tế chính thức.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
