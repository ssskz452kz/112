import React, { useState, useEffect } from 'react';
import { categorizedJobs } from '../../data/mockJobs';
import { useNavigate } from 'react-router-dom';

function JobBoard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [categoryName, setCategoryName] = useState('персонализированных');

  useEffect(() => {
    const saved = localStorage.getItem('studentProfile');
    
    // 🔥 Force Onboarding Intercept: If no profile exists at all, kick them back to setup
    if (!saved) {
       navigate('/student/profile');
       return;
    }

    if (saved) {
       try {
         const p = JSON.parse(saved);
         setProfile(p);
         // Simulate AI Matching algorithm based on input strings
         const searchStr = `${p.faculty || ''} ${p.specialty || ''}`.toLowerCase();
         let chosenJobs = [];
         
         if (searchStr.includes('информацион') || searchStr.includes('вычислит') || searchStr.includes('программ')) {
             chosenJobs = categorizedJobs.IT;
             setCategoryName('IT и разработки');
         } else if (searchStr.includes('эконом') || searchStr.includes('финанс') || searchStr.includes('бизнес')) {
             chosenJobs = categorizedJobs.Finance;
             setCategoryName('финансов и экономики');
         } else if (searchStr.includes('юридическ') || searchStr.includes('право')) {
             chosenJobs = categorizedJobs.Law;
             setCategoryName('юриспруденции');
         } else {
             // Fallback Mix
             chosenJobs = [...categorizedJobs.General, categorizedJobs.IT[0]];
             setCategoryName('общей бизнес-аналитики');
         }
         setDisplayJobs(chosenJobs);
       } catch (e) {
         setDisplayJobs([...categorizedJobs.IT, ...categorizedJobs.General].slice(0, 3));
       }
    } else {
       // If totally empty, prompt them or show default
       setDisplayJobs([...categorizedJobs.IT, ...categorizedJobs.General].slice(0, 3));
    }
  }, []);

  return (
    <div>
      {/* Dynamic Header powered by Profile Data */}
      <div style={{display: 'flex', gap: '32px', marginBottom: '40px'}}>
        <div style={{flex: 1, padding: '32px', background: 'var(--gradient-brand)', borderRadius: '24px', color: 'white', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', right: '-10px', top: '-60px', fontSize: '14rem', opacity: 0.08}}>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            
            {profile?.university ? (
               <h2 style={{fontSize: '1.8rem', marginBottom: '8px', zIndex: 10, position: 'relative'}}>
                 Привет! Мы нашли {displayJobs.length} эксклюзивных стажировок в сфере {categoryName}!
               </h2>
            ) : (
               <h2 style={{fontSize: '1.8rem', marginBottom: '8px', zIndex: 10, position: 'relative'}}>Трендовые стажировки сегодня</h2>
            )}
            
            {profile?.specialty ? (
                <p style={{opacity: 0.95, zIndex: 10, position: 'relative'}}>
                  ИИ-алгоритм нашел 100% совпадения для вашей специальности <strong>{profile.specialty}</strong>, изученной в <strong>{profile.university.split(' ')[0]}</strong>. Компании уже ищут таких, как вы.
                </p>
            ) : (
                <p style={{opacity: 0.9, zIndex: 10, position: 'relative'}}>
                  <button onClick={() => navigate('/student/profile')} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: 600}}>Заполнить профиль</button> 
                  чтобы алгоритм настроил ленту под ваши навыки.
                </p>
            )}
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
         <h3 style={{fontSize: '1.4rem', color: 'var(--text-hero)'}}>Мэтчинг алгоритма</h3>
         <div style={{display: 'flex', gap: '12px'}}>
            <button style={{padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600}}>По релевантности (AI)</button>
         </div>
      </div>

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
                       {profile && <span style={{background: '#dbeafe', color: '#2563eb', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 700}}>Ideal Match</span>}
                    </div>
                    
                    <p style={{color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.95rem'}}>{job.company} • {job.location}</p>
                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {job.tags.map(tag => (
                            <span key={tag} style={{background: '#f1f5f9', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>{tag}</span>
                        ))}
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    {/* Dynamic Match Logic Visual */}
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, background: '#d1fae5', padding: '6px 14px', borderRadius: '100px', fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(16,185,129,0.1)'}}>
                        <i className="fa-solid fa-chart-pie"></i> {job.match}% Мэтч
                    </div>
                    <div style={{fontWeight: 600, color: 'var(--text-hero)'}}>{job.salary || profile?.salary || 'По результатам'}</div>
                    <button className="btn btn-primary" style={{padding: '8px 24px', fontSize: '0.9rem', borderRadius: '100px', marginTop: '12px'}}>Откликнуться</button>
                </div>

            </div>
        ))}
      </div>

    </div>
  );
}

export default JobBoard;
