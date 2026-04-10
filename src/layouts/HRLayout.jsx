import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

function HRLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Sidebar - Fixed Width, High contrast premium */}
      <aside style={{ width: '280px', minWidth: '280px', background: '#0f172a', display: 'flex', flexDirection: 'column', height: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
         <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            EduTrack <i className="fa-solid fa-graduation-cap" style={{marginLeft: '8px', color: '#38bdf8'}}></i>
         </div>
         <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>
            Employer Portal
         </div>

         <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <NavLink to="/hr" end style={({isActive}) => ({ padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: isActive ? 'white' : '#94a3b8', background: isActive ? '#1e293b' : 'transparent', fontWeight: isActive ? 600 : 500, transition: '0.2s', boxSizing: 'border-box' })}>
               <i className="fa-solid fa-chart-pie" style={{width: '20px', textAlign: 'center'}}></i> Аналитика
            </NavLink>
            <NavLink to="/hr/candidates" style={({isActive}) => ({ padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: isActive ? 'white' : '#94a3b8', background: isActive ? '#1e293b' : 'transparent', fontWeight: isActive ? 600 : 500, transition: '0.2s', boxSizing: 'border-box' })}>
               <i className="fa-solid fa-clapperboard" style={{width: '20px', textAlign: 'center'}}></i> Кандидаты (ATS)
            </NavLink>
            <NavLink to="/hr/post-job" style={({isActive}) => ({ padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: isActive ? 'white' : '#94a3b8', background: isActive ? '#1e293b' : 'transparent', fontWeight: isActive ? 600 : 500, transition: '0.2s', boxSizing: 'border-box' })}>
               <i className="fa-solid fa-pen-to-square" style={{width: '20px', textAlign: 'center'}}></i> Новая вакансия
            </NavLink>
         </nav>

         {/* Bottom User Area - Redesigned isolated box */}
         <div style={{ background: '#1e293b', borderRadius: '16px', padding: '16px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#38bdf8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>KS</div>
               <div style={{ overflow: 'hidden' }}>
                 <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Kaspi HR BP</div>
                 <div style={{ color: '#94a3b8', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Kaspi.kz Company</div>
               </div>
            </div>
            <button onClick={() => navigate('/')} style={{ width: '100%', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s', outline: 'none' }}>
                <i className="fa-solid fa-power-off"></i> Выйти
            </button>
         </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main style={{ flex: 1, height: '100%', overflowY: 'auto', padding: '40px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          {/* Top Navbar */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexShrink: 0}}>
               <h1 style={{fontSize: '2rem', margin: 0, fontWeight: 800, color: '#0f172a'}}>Кабинет Компании</h1>
               <div style={{display: 'flex', gap: '16px'}}>
                   <button onClick={() => alert('Настройки организации пока недоступны в рамках текущего демо.')} style={{width: '44px', height: '44px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                       <i className="fa-solid fa-gear"></i>
                   </button>
                   <button onClick={() => alert('Уведомления: У вас 0 новых сообщений в корпоративном чате.')} style={{width: '44px', height: '44px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                       <i className="fa-regular fa-bell"></i>
                   </button>
               </div>
          </div>
          
          <div style={{ flex: 1, minHeight: 0 }}>
             <Outlet />
          </div>
      </main>
    </div>
  );
}
export default HRLayout;
