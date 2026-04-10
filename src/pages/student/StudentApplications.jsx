import React, { useState, useEffect } from 'react';

function StudentApplications() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
     const stored = JSON.parse(localStorage.getItem('studentApplications') || '[]');
     setAppliedJobs(stored);
  }, []);

  return (
    <div style={{maxWidth: '900px'}}>
        <div style={{marginBottom: '32px'}}>
           <h2 style={{fontSize: '1.8rem', color: 'var(--text-hero)', marginBottom: '8px'}}>Мои отклики</h2>
           <p style={{color: 'var(--text-muted)'}}>Здесь отображаются все вакансии, на которые вы подали заявку.</p>
        </div>

        {appliedJobs.length === 0 ? (
            <div style={{background: 'white', padding: '60px 20px', borderRadius: '24px', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#94a3b8'}}>
                <i className="fa-solid fa-folder-open" style={{fontSize: '3rem', marginBottom: '16px', opacity: 0.5}}></i>
                <h3 style={{fontSize: '1.2rem', margin: '0 0 8px 0', color: 'var(--text-hero)'}}>Вы еще не откликались на вакансии</h3>
                <p style={{margin: 0}}>Перейдите в раздел "Все стажировки", чтобы найти идеальную позицию.</p>
            </div>
        ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {appliedJobs.map((job, idx) => (
                    <div key={idx} style={{background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)'}}>
                        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                            <div style={{width: '60px', height: '60px', background: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: job.color}}>
                                <i className={`fa-solid ${job.logo}`}></i>
                            </div>
                            <div>
                                <h4 style={{margin: '0 0 6px 0', fontSize: '1.2rem', color: 'var(--text-hero)'}}>{job.role}</h4>
                                <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 500}}>
                                    <span><i className="fa-solid fa-building-user"></i> {job.company}</span>
                                    <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px'}}>
                            <span style={{background: '#eff6ff', color: '#3b82f6', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700}}>
                                <i className="fa-solid fa-paper-plane" style={{marginRight: '6px'}}></i> Заявка отправлена
                            </span>
                            <span style={{fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500}}>Сегодня</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}

export default StudentApplications;
