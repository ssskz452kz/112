import React, { useState } from 'react';
import { kzUniversityData } from '../../data/kzData';

function HRJobPost() {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [specialty, setSpecialty] = useState('');

  const [toast, setToast] = useState('');

  const cities = Object.keys(kzUniversityData);
  const unis = city && city !== 'Any' ? Object.keys(kzUniversityData[city]) : [];
  const faculties = university && university !== 'Any' ? Object.keys(kzUniversityData[city][university] || {}) : [];
  const specialties = faculty && faculty !== 'Any' ? (kzUniversityData[city]?.[university]?.[faculty] || []) : [];

  const handleCityChange = (e) => { setCity(e.target.value); setUniversity(''); setFaculty(''); setSpecialty(''); };
  const handleUniChange = (e) => { setUniversity(e.target.value); setFaculty(''); setSpecialty(''); };
  const handleFacultyChange = (e) => { setFaculty(e.target.value); setSpecialty(''); };

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const newJob = {
          id: `hr_custom_${Date.now()}`,
          company: 'Твоя Компания (Your Company)',
          role: title,
          location: city === 'Any' ? 'Любой город' : city,
          salary: salary || 'По результатам',
          match: 100, // custom employer posts always rank top
          tags: ['🔥 От работодателя', 'Targeted', 'New'],
          logo: 'fa-building-user',
          color: '#0ea5e9',
          targetUni: university || 'Any',
          targetFaculty: faculty || 'Any',
          targetSpecialty: specialty || 'Any'
      };

      // Push exactly to localStorage pipeline to bridge with /student !
      const existing = JSON.parse(localStorage.getItem('hrPostedJobs') || '[]');
      localStorage.setItem('hrPostedJobs', JSON.stringify([newJob, ...existing]));

      setToast('🎉 Вакансия успешно опубликована в базу! Перейдите в портал студента.');
      
      // Clear form
      setTitle(''); setSalary(''); setSpecialty('');
      setTimeout(()=> setToast(''), 4000);
  };

  const inputStyle = {
    padding: '16px', borderRadius: '16px', border: '1px solid #cbd5e1', 
    width: '100%', fontSize: '1rem', background: '#f8fafc',
    color: 'var(--text-hero)', outline: 'none', transition: '0.3s'
  };

  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' };

  return (
    <div style={{maxWidth: '800px', position: 'relative'}}>
      
      {toast && (
        <div style={{position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '16px 32px', borderRadius: '100px', fontWeight: 600, boxShadow: '0 10px 40px -10px rgba(16,185,129,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center'}}>
           <i className="fa-solid fa-circle-check" style={{marginRight: '8px', fontSize: '1.2rem'}}></i> {toast}
        </div>
      )}

      <div style={{marginBottom: '32px'}}>
         <h2 style={{fontSize: '1.8rem', color: 'var(--text-hero)', marginBottom: '8px'}}>Создание целевой вакансии</h2>
         <p style={{color: 'var(--text-muted)'}}>Опубликуйте стажировку и настройте фильтр так, чтобы ее увидели только студенты конкретного факультета или специальности.</p>
      </div>

      <form onSubmit={handleSubmit} style={{background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'}}>
         
         <div style={{marginBottom: '24px'}}>
             <label style={labelStyle}>Название позиции (Job Title)</label>
             <input type="text" required placeholder="Например: Junior Data Analyst" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#cbd5e1'} />
         </div>

         <div style={{marginBottom: '32px'}}>
             <label style={labelStyle}>Оклад или условия (Compensation)</label>
             <div style={{display: 'flex', gap: '16px'}}>
                 <input type="text" placeholder="от 150 000 ₸" value={salary} onChange={(e)=>setSalary(e.target.value)} style={inputStyle} />
                 <select style={inputStyle}>
                     <option>Полный день</option>
                     <option>Частичная занятость</option>
                     <option>Удаленно</option>
                 </select>
             </div>
         </div>

         <hr style={{border: 'none', borderTop: '1px dashed #cbd5e1', marginBottom: '32px'}} />

         <h3 style={{fontSize: '1.2rem', color: 'var(--text-hero)', marginBottom: '24px', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'}}>
                <i className="fa-solid fa-bullseye"></i>
            </div>
            Таргетинг по ВУЗам (Уникальная фича EduTrack)
         </h3>

         <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
             <div>
                 <label style={labelStyle}>1. Город</label>
                 <select required style={inputStyle} value={city} onChange={handleCityChange}>
                     <option value="" disabled>Выберите город...</option>
                     {cities.map(c => <option key={c} value={c}>{c}</option>)}
                     <option value="Any">Любой (Не важно)</option>
                 </select>
             </div>

             <div>
                 <label style={labelStyle}>2. Университет</label>
                 <select required style={inputStyle} value={university} onChange={handleUniChange} disabled={!city || city === 'Any'}>
                     <option value="" disabled>Выберите ВУЗ...</option>
                     {unis.map(u => <option key={u} value={u}>{u}</option>)}
                     <option value="Any">Любой ВУЗ</option>
                 </select>
             </div>

             <div>
                 <label style={labelStyle}>3. Факультет / Школа</label>
                 <select style={inputStyle} value={faculty} onChange={handleFacultyChange} disabled={!university || university === 'Any'}>
                     <option value="">(Опционально) Все факультеты</option>
                     {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                 </select>
             </div>

             <div>
                 <label style={labelStyle}>4. Специальность</label>
                 <select style={inputStyle} value={specialty} onChange={(e) => setSpecialty(e.target.value)} disabled={!faculty}>
                     <option value="">(Опционально) Все специальности</option>
                     {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
             </div>
         </div>

         {/* Visual verification block for HR */}
         {(university && university !== 'Any') && (
             <div style={{background: '#f8fafc', borderLeft: '4px solid #3b82f6', padding: '16px 20px', borderRadius: '0 12px 12px 0', marginTop: '24px', fontSize: '0.95rem', color: '#475569'}}>
                 <i className="fa-solid fa-circle-info" style={{color: '#3b82f6', marginRight: '8px'}}></i>
                 Эту вакансию увидят в первую очередь студенты <strong>{specialty || faculty || university}</strong>. Алгоритм уведомит их пуш-уведомлением.
             </div>
         )}
         
         <div style={{marginTop: '40px', display: 'flex', justifyContent: 'flex-end'}}>
             <button type="submit" className="btn btn-primary" style={{padding: '16px 32px', fontSize: '1.1rem'}}>Опубликовать в систему</button>
         </div>
      </form>
    </div>
  );
}

export default HRJobPost;
