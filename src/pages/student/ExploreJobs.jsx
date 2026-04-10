import React, { useState, useEffect } from 'react';
import { categorizedJobs } from '../../data/mockJobs';
import { kzUniversityData } from '../../data/kzData';

function ExploreJobs() {
  // Cascading Filter States
  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [applied, setApplied] = useState({});

  const handleApply = (job) => {
    setApplied({...applied, [job.id]: true});
    const existingApps = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    localStorage.setItem('studentApplications', JSON.stringify([{...job, appliedAt: Date.now()}, ...existingApps]));

    const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
    const newCandidate = {
       id: `cand_${Date.now()}`, 
       name: profile.name || 'Анонимный студент', 
       uni: profile.university || 'ВУЗ не указан', 
       major: profile.specialty || profile.faculty || 'IT Специальность', 
       match: job.match || Math.floor(Math.random()*(99-80)+80), 
       role: job.role, 
       avatarGrad: 'linear-gradient(135deg, #10b981, #0ea5e9)'
    };
    const existingCands = JSON.parse(localStorage.getItem('hrCandidatesFromStudent') || '[]');
    localStorage.setItem('hrCandidatesFromStudent', JSON.stringify([newCandidate, ...existingCands]));
    alert(`🎉 Резюме успешно отправлено в "${job.company}"!`);
  };

  // Combined flatten jobs array + HR User Custom Posts injected magically!
  const getCombinedJobs = () => {
      try {
          const hrGenerated = JSON.parse(localStorage.getItem('hrPostedJobs') || '[]');
          return [
              ...hrGenerated,
              ...categorizedJobs.IT, 
              ...categorizedJobs.Finance, 
              ...categorizedJobs.Law, 
              ...categorizedJobs.General
          ];
      } catch (err) {
          return [...categorizedJobs.IT, ...categorizedJobs.Finance, ...categorizedJobs.Law, ...categorizedJobs.General];
      }
  };

  const allFlattenJobs = getCombinedJobs();

  const [filteredJobs, setFilteredJobs] = useState(allFlattenJobs);

  // Cascading Logic
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
  }

  const cities = Object.keys(kzUniversityData);
  const unis = city ? Object.keys(kzUniversityData[city]) : [];
  const faculties = university ? Object.keys(kzUniversityData[city][university]) : [];
  const specialties = faculty ? (kzUniversityData[city][university][faculty] || []) : [];

  // Super Filter Engine with Infinite Target Guarantee!
  useEffect(() => {
     let temp = allFlattenJobs;
     if (university) {
         temp = temp.filter(job => job.targetUni === university || job.targetUni === 'Any');
     }
     if (faculty) {
         temp = temp.filter(job => job.targetFaculty === faculty || job.targetFaculty === 'Any' || !job.targetFaculty);
     }
     if (specialty) {
         temp = temp.filter(job => job.targetSpecialty === specialty || job.targetSpecialty === 'Any' || !job.targetSpecialty);
     }

     // 🔥 Infinite Matching Generator: Guarantee at least 12 jobs for ANY specialty chosen by the user
     if (faculty || specialty) {
        const focusName = specialty || faculty;
        // If the database has fewer than 12 jobs for this ultra-specific major, AI generates realistic ones on the fly!
        if (temp.length < 12) {
             const needed = 12 - temp.length;
             const generatedJobs = [];
             
             const prefixes = ['Junior Specialist', 'Стажер-аналитик', 'Trainee', 'Младший консультант', 'Assistant', 'Менеджер инициатив', 'Graduate', 'Исследователь'];
             const companies = ['National Enterprise Corp', 'Global Partners Group', 'Kazakhstan Tech Hub', 'Eurasian Holdings', 'Samruk-Energy Ventures', 'Central Asian Consultants', 'NextGen Solutions', 'Qazaq Innovate'];
             const locations = ['Алматы (Офис)', 'Астана (Гибрид)', 'Удаленно (Remote)'];
             const colors = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6'];
             const logos = ['fa-building-columns', 'fa-globe', 'fa-chart-pie', 'fa-laptop-code', 'fa-seedling', 'fa-network-wired'];

             for(let i=0; i<needed; i++) {
                 // Deterministic pseudorandom to keep React from bouncing, but varied enough for demo
                 const pIdx = (i * 3 + temp.length) % prefixes.length;
                 const cIdx = (i * 7 + temp.length) % companies.length;
                 const loc = locations[i % 3];
                 const sal = `${(15 + (i % 6)*3)}0 000 ₸`;
                 const mScore = 99 - i;
                 
                 generatedJobs.push({
                    id: `dyn_${focusName}_${i}`, 
                    company: companies[cIdx], 
                    role: `${prefixes[pIdx]} / ${focusName}`,
                    location: loc, 
                    salary: sal, 
                    match: mScore,
                    tags: ['Аналитика', focusName.split(' ')[0], 'Карьерный рост'], 
                    logo: logos[i % logos.length], 
                    color: colors[i % colors.length],
                    targetUni: university || 'Any', 
                    targetSpecialty: specialty || 'Any'
                 });
             }
             temp = [...temp, ...generatedJobs];
        }
     }

     setDisplayJobs(temp);
  }, [city, university, faculty, specialty]);

  const [displayJobs, setDisplayJobs] = useState(allFlattenJobs);

  const filterStyle = {
    padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0',
    background: 'white', color: 'var(--text-hero)', outline: 'none',
    fontWeight: 500, flex: 1, minWidth: '180px'
  };

  return (
    <div>
       <div style={{marginBottom: '32px'}}>
         <h2 style={{fontSize: '1.8rem', color: 'var(--text-hero)', marginBottom: '8px'}}>Стажировки и вакансии</h2>
         <p style={{color: 'var(--text-muted)'}}>Используйте фильтры ниже, чтобы найти вакансии, открытые специально для вашего факультета.</p>
       </div>

       {/* Real-time Cascading Filter Bar */}
       <div style={{display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap', background: 'rgba(255,255,255,0.6)', padding: '20px', borderRadius: '24px', border: 'var(--glass-border)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)'}}>
           <div style={{display: 'flex', alignItems: 'center', color: 'var(--primary)', padding: '0 10px', fontWeight: 800}}>
               <i className="fa-solid fa-filter"></i>
           </div>
           
           <select style={filterStyle} value={city} onChange={handleCityChange}>
               <option value="">🗺️ Города (City)</option>
               {cities.map(c => <option key={c} value={c}>{c}</option>)}
           </select>
           
           <select style={filterStyle} value={university} onChange={handleUniChange} disabled={!city}>
               <option value="">🏫 ВУЗы (Uni)</option>
               {unis.map(u => <option key={u} value={u}>{u}</option>)}
           </select>

           <select style={filterStyle} value={faculty} onChange={handleFacultyChange} disabled={!university}>
               <option value="">🏛️ Факультеты (Faculty)</option>
               {faculties.map(f => <option key={f} value={f}>{f}</option>)}
           </select>

           <select style={filterStyle} value={specialty} onChange={(e)=>setSpecialty(e.target.value)} disabled={!faculty}>
               <option value="">🚀 Специальности (Major)</option>
               {specialties.map(s => <option key={s} value={s}>{s}</option>)}
           </select>
           
           {/* Clear Filters Button */}
           {(city || university || faculty || specialty) && (
               <button onClick={() => { setCity(''); setUniversity(''); setFaculty(''); setSpecialty(''); }} style={{padding: '12px 16px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'}} onMouseOver={e => e.currentTarget.style.background = '#fef2f2'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <i className="fa-solid fa-xmark" style={{marginRight: '6px'}}></i> Сбросить
               </button>
           )}
       </div>

       {/* Jobs Render Feed */}
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
         <h3 style={{fontSize: '1.2rem', color: 'var(--text-main)'}}>Найдено позиций: <strong>{displayJobs.length}</strong></h3>
       </div>

       {displayJobs.length === 0 ? (
           <div style={{textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '24px', border: '1px dashed #cbd5e1'}}>
                 <i className="fa-solid fa-ghost" style={{fontSize: '3rem', color: '#cbd5e1', marginBottom: '16px'}}></i>
                 <h3 style={{color: 'var(--text-muted)'}}>Для данного факультета целевых вакансий пока нет</h3>
                 <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Сбросьте фильтр, чтобы посмотреть открытые стажировки.</p>
           </div>
       ) : (
           <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {displayJobs.map(job => (
                <div key={job.id} style={{
                    background: 'white', borderRadius: '20px', padding: '24px', 
                    border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                    display: 'flex', gap: '24px', transition: 'var(--transition-smooth)', cursor: 'pointer'
                }} className="job-card-hover">
                    <div style={{width: '64px', height: '64px', borderRadius: '16px', background: `${job.color}15`, color: job.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'}}>
                        <i className={`fa-brands ${job.logo}`}></i>
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px'}}>
                           <h4 style={{fontSize: '1.25rem', color: 'var(--text-hero)', margin: 0}}>{job.role}</h4>
                        </div>
                        <p style={{color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.95rem'}}>{job.company} • {job.location}</p>
                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                            {job.tags.map(tag => (
                                <span key={tag} style={{background: '#f1f5f9', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>{tag}</span>
                            ))}
                            {/* Explicit UI flag if tagged for university */}
                            {job.targetUni !== 'Any' && (
                                <button 
                                   onClick={() => handleApply(job)}
                                   disabled={applied[job.id]}
                                   style={{padding: '12px 24px', background: applied[job.id] ? '#f1f5f9' : 'transparent', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, color: applied[job.id] ? '#10b981' : 'var(--text-main)', cursor: applied[job.id] ? 'default' : 'pointer', transition: '0.2s', alignSelf: 'flex-start'}}
                                >
                                  {applied[job.id] ? <span><i className="fa-solid fa-check" style={{marginRight: '8px'}}></i>Отправлено</span> : <span>Откликнуться <i className="fa-solid fa-paper-plane" style={{marginLeft: '8px', fontSize: '0.8rem'}}></i></span>}
                                </button>
                            )}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                        <div style={{fontWeight: 600, color: 'var(--text-hero)'}}>{job.salary || 'По результатам'}</div>
                        <button className="btn " style={{padding: '8px 24px', fontSize: '0.9rem', borderRadius: '100px', marginTop: '12px', background: 'rgba(0,0,0,0.05)', border: 'none', fontWeight: 600}}>Подробнее</button>
                    </div>
                </div>
            ))}
          </div>
       )}
    </div>
  );
}

export default ExploreJobs;
