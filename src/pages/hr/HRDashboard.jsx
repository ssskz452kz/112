import React from 'react';

function HRDashboard() {
  return (
    <div>
        <div style={{display: 'flex', gap: '24px', marginBottom: '40px'}}>
            {/* Stat Card 1 */}
            <div style={{flex: 1, background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
                        <i className="fa-solid fa-briefcase"></i>
                    </div>
                    <span style={{fontSize: '0.85rem', color: '#10b981', fontWeight: 600, background: '#d1fae5', padding: '2px 8px', borderRadius: '4px'}}>+2 За неделю</span>
                </div>
                <h3 style={{fontSize: '2rem', fontWeight: 800, margin: '16px 0 4px 0', color: 'var(--text-hero)'}}>14</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>Активных стажировок</p>
            </div>

            {/* Stat Card 2 */}
            <div style={{flex: 1, background: '#0f172a', padding: '24px', borderRadius: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'}}>
                <div style={{position: 'absolute', right: '-10px', top: -40, fontSize: '10rem', opacity: 0.1}}>
                    <i className="fa-solid fa-users"></i>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
                        <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <span style={{fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600}}>⚡ Горячий поток</span>
                </div>
                <h3 style={{fontSize: '2rem', fontWeight: 800, margin: '16px 0 4px 0', position: 'relative', zIndex: 10}}>892</h3>
                <p style={{color: '#94a3b8', fontSize: '0.95rem', position: 'relative', zIndex: 10}}>Новых откликов за месяц</p>
            </div>

            {/* Stat Card 3 */}
            <div style={{flex: 1, background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#faf5ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
                        <i className="fa-solid fa-database"></i>
                    </div>
                </div>
                <h3 style={{fontSize: '2rem', fontWeight: 800, margin: '16px 0 4px 0', color: 'var(--text-hero)'}}>18,450</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>Студентов в базе EduTrack</p>
            </div>
        </div>

        <h2 style={{fontSize: '1.4rem', color: 'var(--text-hero)', marginBottom: '24px'}}>Последние действия (Activity)</h2>
        <div style={{background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '24px'}}>
            {[
                { time: '10 мин назад', title: 'Новый отклик', desc: 'Алия Мухамедова (КазНУ) откликнулась на Frontend Intern' },
                { time: '2 часа назад', title: 'Оффер принят', desc: 'Еркин Б. подписал документы на позицию Младший Аналитик' },
                { time: 'Вчера', title: 'Новая целевая вакансия', desc: 'Создан лот "Data Scientist" эксклюзивно для студентов NU' }
            ].map((item, idx) => (
                <div key={idx} style={{display: 'flex', padding: '16px 0', borderBottom: idx !== 2 ? '1px solid #f1f5f9' : 'none'}}>
                    <div style={{minWidth: '120px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500}}>{item.time}</div>
                    <div>
                        <div style={{fontWeight: 600, color: 'var(--text-hero)', marginBottom: '4px'}}>{item.title}</div>
                        <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{item.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default HRDashboard;
