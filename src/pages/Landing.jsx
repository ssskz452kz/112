import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ParticleBackground from '../ParticleBackground';

function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState('student');
  const observerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
      el.style.animationPlayState = 'paused';
      if(observerRef.current) observerRef.current.observe(el);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (role === 'student') {
        // Direct route to the job explorer
        navigate('/student');
    } else {
        // Direct route to HR roadshow dashboard
        navigate('/hr');
    }
  };

  return (
    <div style={{minHeight: '100vh', width: '100vw'}}>
      <ParticleBackground />

      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            <a href="#" className="logo">
              EduTrack <span><i className="fa-solid fa-graduation-cap"></i></span>
            </a>
            <div className="nav-links">
              <a href="#how" className="link">Как это работает</a>
              <a href="#audience" className="link">Для кого</a>
              <a href="#status" className="link">О нас</a>
              <button className="btn btn-outline" onClick={() => { setRole('student'); setModalOpen(true); }} style={{padding: '10px 24px'}}>Войти</button>
              <button className="btn btn-primary" onClick={() => { setRole('student'); setModalOpen(true); }} style={{padding: '10px 24px'}}>Присоединиться</button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <h1>Трансформация образования в <span>карьерный рост</span></h1>
            <p>Премиальная экосистема для найма. Студенты находят стажировки мечты, а инновационные компании моментально хантят лучшие молодые таланты.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => { setRole('student'); setModalOpen(true); }}>
                <i className="fa-regular fa-user"></i> Я студент
              </button>
              <button className="btn btn-outline" onClick={() => { setRole('company'); setModalOpen(true); }}>
                <i className="fa-regular fa-building"></i> Я работодатель
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="container">
          <div className="glass-grid">
            <div className="glass-card animate-fade-in-up delay-1">
              <div className="step-badge">Шаг 01</div>
              <div className="step-icon"><i className="fa-regular fa-id-badge"></i></div>
              <h3>Смарт-профиль</h3>
              <p>Создайте цифровое портфолио. Укажите вуз, факультет и навыки. Компании оформляют бренд работодателя.</p>
            </div>
            <div className="glass-card animate-fade-in-up delay-2">
              <div className="step-badge">Шаг 02</div>
              <div className="step-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <h3>AI-Мэтчинг</h3>
              <p>Наш алгоритм мгновенно предлагает студентам релевантные стажировки, отсеивая информационный шум.</p>
            </div>
            <div className="glass-card animate-fade-in-up delay-3">
              <div className="step-badge">Шаг 03</div>
              <div className="step-icon"><i className="fa-solid fa-rocket"></i></div>
              <h3>Карьерный взлет</h3>
              <p>Прямая коммуникация в чате, быстрая обратная связь от рекрутеров и долгожданные офферы.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="audience-section">
        <div className="container">
          <div className="glass-grid">
            <div className="glass-card animate-fade-in-up delay-1">
              <div className="step-badge" style={{background:'rgba(37,99,235,0.05)', color: '#334155'}}>Для кого</div>
              <h3>Студентам</h3>
              <ul className="feature-list">
                <li><i className="fa-solid fa-check"></i> Доступ к эксклюзивным стажировкам в Top-500</li>
                <li><i className="fa-solid fa-check"></i> Построение цифрового резюме, которое работает</li>
                <li><i className="fa-solid fa-check"></i> Трекинг прогресса и прямые отклики hr-отделам</li>
              </ul>
            </div>
            <div className="glass-card animate-fade-in-up delay-2">
              <div className="step-badge" style={{background:'rgba(37,99,235,0.05)', color: '#334155'}}>Для кого</div>
              <h3>Бизнесу</h3>
              <ul className="feature-list">
                <li><i className="fa-solid fa-check"></i> База проверенных студентов с сортировкой по GPA</li>
                <li><i className="fa-solid fa-check"></i> Оцифрованный поток найма молодых талантов</li>
                <li><i className="fa-solid fa-check"></i> Повышение узнаваемости бренда среди выпускников</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="status">
        <div className="container status-container">
          <div className="status-highlight animate-fade-in-up">
            <h2>Почему EduTrack?</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '32px'}}>Мы объединяем академическое сообщество и реальный бизнес.</p>
            <div className="step-badge" style={{background: 'var(--primary)', color:'white', fontSize:'1rem', padding:'8px 24px'}}>
              <i className="fa-solid fa-bolt" style={{marginRight:'8px'}}></i> Активная разработка
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="contact-wrap animate-fade-in-up">
            <h3 style={{textAlign: 'center', marginBottom: '16px', fontSize: '2rem', color: 'var(--text-hero)'}}>Готовы начать?</h3>
            <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px'}}>Оставьте запрос на ранний демо-доступ к платформе</p>
            <form action="https://formspree.io/f/mjgozdgr" method="POST">
              <div className="input-group">
                <input type="text" name="name" placeholder="Ваше имя или компания" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '16px'}}>Отправить заявку</button>
            </form>
          </div>
          <div className="footer-bottom">
            &copy; 2026 EduTrack Platform. Design Redefined.
          </div>
        </div>
      </footer>

      {/* Auth Modal Overlay */}
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target.className.includes('modal-overlay')) setModalOpen(false); }}>
        <div className="modal-content" style={{position: 'relative'}}>
          <button className="close-btn" onClick={() => setModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
          <h2 style={{textAlign: 'center', marginBottom: '24px', color: 'var(--text-hero)'}}>{role === 'student' ? 'Вход для Студентов' : 'Вход для HR'}</h2>
          
          <div className="role-selector">
            <button className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>Я Студент</button>
            <button className={`role-btn ${role === 'company' ? 'active' : ''}`} onClick={() => setRole('company')}>Компания</button>
          </div>

          <form onSubmit={handleAuth}>
            <div className="input-group">
              <input type="email" placeholder="Рабочий Email" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Пароль" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{
              width: '100%', marginTop: '10px', padding: '16px'
            }}>
              {role === 'student' ? 'Вход в профиль' : 'Войти в базу талантов'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
