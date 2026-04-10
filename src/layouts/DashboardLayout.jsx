import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../index.css'; 

function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar protected by strong CSS Classes */}
      <aside className="dashboard-sidebar">
        <div style={{ marginBottom: '48px', paddingLeft: '8px' }}>
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration:'none'}}>
            <span className="sidebar-logo-text">EduTrack</span> 
            <i className="fa-solid fa-graduation-cap" style={{color: 'var(--primary)', fontSize: '1.2rem'}}></i>
          </a>
          <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px'}}>Student Portal</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/student/explore" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
             <i className="fa-solid fa-magnifying-glass"></i>
             <span>Все стажировки</span>
          </NavLink>
          
          <NavLink to="/student/applications" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
             <i className="fa-solid fa-paper-plane"></i>
             <span>Мои отклики</span>
          </NavLink>
          
          <button onClick={() => alert('Блок анализа навыков и тестирования ИИ откроется на следующей фазе! Ваш профиль уже анализируется в фоне.')} style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '1rem', width: '100%', padding: '0'}} className="sidebar-link">
             <i className="fa-solid fa-wand-magic-sparkles"></i>
             <span>Анализ навыков (AI)</span>
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
             <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
               A
             </div>
             <div>
               <p style={{margin: 0, fontWeight: 700, color: 'var(--text-hero)', fontSize: '0.95rem'}}>Алдияр С.</p>
               <p style={{margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem'}}>Студент 3 курса</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
             <h1 style={{fontSize: '2rem', fontWeight: 800, color: 'var(--text-hero)'}}>Добро пожаловать</h1>
             <div style={{display: 'flex', gap: '16px'}}>
                 <button style={{width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     <i className="fa-regular fa-bell"></i>
                 </button>
             </div>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
