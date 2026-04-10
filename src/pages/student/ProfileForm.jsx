import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kzUniversityData } from '../../data/kzData';

function ProfileForm() {
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [salary, setSalary] = useState('250 000 ₸');

  useEffect(() => {
    const savedProfile = localStorage.getItem('studentProfile');
    if(savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if(parsed.city) setCity(parsed.city);
        if(parsed.university) setUniversity(parsed.university);
        if(parsed.faculty) setFaculty(parsed.faculty);
        if(parsed.specialty) setSpecialty(parsed.specialty);
      } catch (e) {}
    }
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setUniversity(''); setFaculty(''); setSpecialty('');
  };

  const handleUniChange = (e) => {
    setUniversity(e.target.value);
    setFaculty(''); setSpecialty('');
  };

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
    setSpecialty('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(!university) return alert("Пожалуйста, выберите ВУЗ (Университет)");
    
    // Save to local persistence to simulate backend AI processing state
    localStorage.setItem('studentProfile', JSON.stringify({
       city, university, faculty, specialty, salary, name, course, savedAt: Date.now()
    }));
    
    navigate('/student');
  };

  const cities = Object.keys(kzUniversityData);
  const unis = city ? Object.keys(kzUniversityData[city]) : [];
  const faculties = university ? Object.keys(kzUniversityData[city][university]) : [];
  const specialties = faculty ? kzUniversityData[city][university][faculty] : [];

  const baseSelectStyle = {
    width: '100%', padding: '16px 20px', borderRadius: '16px', 
    background: 'rgba(255,255,255,0.8)', border: '1px solid #e2e8f0', 
    color: 'var(--text-hero)', fontSize: '1rem', outline: 'none',
    transition: 'all 0.3s'
  };
  const disabledSelectStyle = { ...baseSelectStyle, background: '#f8fafc', color: '#94a3b8', cursor: 'not-allowed' };

  return (
    <div style={{maxWidth: '800px', paddingBottom: '100px'}}>
      
      {/* 💳 Digital Profile Card Header */}
      <div style={{marginBottom: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '32px', borderRadius: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'}}>
          <div style={{position: 'absolute', right: -20, bottom: -40, fontSize: '12rem', opacity: 0.05}}><i className="fa-brands fa-apple"></i></div>
          
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 10}}>
             <div>
                 <div style={{color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px'}}>Digital ID</div>
                 <h2 style={{fontSize: '2rem', margin: '0 0 4px 0'}}>{name || 'Студент'}</h2>
                 <p style={{color: '#94a3b8', margin: 0}}>{course} Курс</p>
             </div>
             
             <div style={{width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(255,255,255,0.2)'}}>
                <i className="fa-solid fa-graduation-cap"></i>
             </div>
          </div>

          <div style={{marginTop: '40px', display: 'flex', gap: '32px', position: 'relative', zIndex: 10}}>
             <div>
                <div style={{fontSize: '0.75rem', color: '#64748b', marginBottom: '4px'}}>УНИВЕРСИТЕТ</div>
                <div style={{fontWeight: 600}}>{university ? university.split(' ')[0] : 'Не указан'}</div>
             </div>
             <div>
                <div style={{fontSize: '0.75rem', color: '#64748b', marginBottom: '4px'}}>ФАКУЛЬТЕТ</div>
                <div style={{fontWeight: 600}}>{faculty ? faculty.substring(0, 15) + '...' : 'Не указан'}</div>
             </div>
             <div>
                <div style={{fontSize: '0.75rem', color: '#64748b', marginBottom: '4px'}}>ЛОКАЦИЯ</div>
                <div style={{fontWeight: 600}}>{city || 'Не указан'}</div>
             </div>
          </div>
      </div>

      {/* Main Modifier Form */}
      <div style={{marginBottom: '32px'}}>
          <h2 style={{fontSize: '1.8rem', color: 'var(--text-hero)', marginBottom: '8px'}}>Настройки Профиля</h2>
          <p style={{color: 'var(--text-muted)'}}>Заполните данные ниже, чтобы обновить свою цифровую карту.</p>
      </div>

      <form onSubmit={handleSave}>
        <h4 style={{fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px'}}>
          <i className="fa-solid fa-building-columns" style={{color: 'var(--primary)', marginRight: '10px'}}></i>Академический бэкграунд
        </h4>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>Город обучения</label>
                <select style={baseSelectStyle} value={city} onChange={handleCityChange} required>
                    <option value="">-- Выберите город --</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>ВУЗ (Университет)</label>
                <select style={city ? baseSelectStyle : disabledSelectStyle} value={university} onChange={handleUniChange} disabled={!city} required>
                    <option value="">-- Выберите ВУЗ --</option>
                    {unis.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px'}}>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>Факультет</label>
                <select style={university ? baseSelectStyle : disabledSelectStyle} value={faculty} onChange={handleFacultyChange} disabled={!university}>
                    <option value="">-- Выберите факультет --</option>
                    {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>Специальность (Major)</label>
                <select style={faculty ? baseSelectStyle : disabledSelectStyle} value={specialty} onChange={(e) => setSpecialty(e.target.value)} disabled={!faculty}>
                    <option value="">-- Формирование списка... --</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

        <h4 style={{fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px'}}>
           <i className="fa-solid fa-chart-line" style={{color: 'var(--primary)', marginRight: '10px'}}></i>Ожидания от стажировки
        </h4>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px'}}>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>Ожидаемая зарплата</label>
                <input type="text" value={salary} onChange={e=>setSalary(e.target.value)} style={baseSelectStyle} required />
            </div>
            <div className="input-group" style={{margin: 0}}>
                <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600}}>Формат работы</label>
                <select style={baseSelectStyle}>
                    <option>Удаленно (Remote)</option><option>Гибрид (Hybrid)</option><option>Офис (Office)</option>
                </select>
            </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '24px', borderRadius: '16px'}}>
            <span style={{color: 'var(--text-muted)'}}><i className="fa-solid fa-bolt" style={{color: '#f59e0b', marginRight:'8px'}}></i>AI запустит поиск при сохранении</span>
            <div style={{display: 'flex', gap: '16px'}}>
               <button type="button" onClick={() => { localStorage.setItem('studentProfile', JSON.stringify({ skipped: true })); navigate('/student'); }} className="btn btn-outline" style={{padding: '12px 32px'}}>Пропустить (Skip)</button>
               <button type="submit" className="btn btn-primary" style={{padding: '12px 32px'}}>Сохранить и найти стажировки</button>
            </div>
        </div>

      </form>
    </div>
  );
}

export default ProfileForm;
