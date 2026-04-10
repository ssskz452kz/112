import React, { useState } from 'react';

function HRCandidates() {
  const initColumns = () => {
    const hrGeneratedCands = JSON.parse(localStorage.getItem('hrCandidatesFromStudent') || '[]');
    
    return {
      'col-new': {
        id: 'col-new', title: 'Новые заявки', count: 2 + hrGeneratedCands.length, color: '#3b82f6', bg: '#eff6ff',
        cards: [
          ...hrGeneratedCands,
          { id: 'c1', name: 'Алишер C.', uni: 'КБТУ (KBTU)', major: 'Информационные системы', match: 98, role: 'Data Engineer', avatarGrad: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' },
          { id: 'c2', name: 'Дильназ К.', uni: 'КазНУ (KAZNU)', major: 'Программная инженерия', match: 94, role: 'Frontend Intern', avatarGrad: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
        ]
      },
      'col-int': {
        id: 'col-int', title: 'Интервью', count: 1, color: '#f59e0b', bg: '#fffbeb',
        cards: [
          { id: 'c3', name: 'Аян М.', uni: 'Назарбаев Университет', major: 'Computer Science', match: 100, role: 'Junior Java', avatarGrad: 'linear-gradient(135deg, #f59e0b, #ea580c)' }
        ]
      },
      'col-off': {
        id: 'col-off', title: 'Сделан Оффер', count: 1, color: '#10b981', bg: '#ecfdf5',
        cards: [
          { id: 'c4', name: 'Камила А.', uni: 'ЕНУ', major: 'Математика', match: 95, role: 'Business Analyst', avatarGrad: 'linear-gradient(135deg, #10b981, #059669)' }
        ]
      }
    };
  };

  const [columns, setColumns] = useState(initColumns());

  const handleDragStart = (e, cardId, sourceColId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceCol', sourceColId);
    e.currentTarget.style.transform = 'scale(0.95)';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => { e.preventDefault(); };

  const handleDrop = (e, targetColId) => {
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColId = e.dataTransfer.getData('sourceCol');

    if (!sourceColId || sourceColId === targetColId) return;

    const sourceCards = [...columns[sourceColId].cards];
    const targetCards = [...columns[targetColId].cards];

    const cardIndex = sourceCards.findIndex(c => c.id === cardId);
    const [movedCard] = sourceCards.splice(cardIndex, 1);
    targetCards.push(movedCard);

    setColumns({
      ...columns,
      [sourceColId]: { ...columns[sourceColId], cards: sourceCards, count: sourceCards.length },
      [targetColId]: { ...columns[targetColId], cards: targetCards, count: targetCards.length }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* CSS Magic to completely eliminate system scrollbars while retaining mousewheel scrollability! */}
        <style>{`
          .hide-scroll::-webkit-scrollbar { display: none; }
          .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0}}>
           <div>
             <h2 style={{fontSize: '1.8rem', color: '#0f172a', margin: '0 0 8px 0'}}>Трекинг (ATS)</h2>
             <p style={{color: '#64748b', margin: 0}}>Перемещайте карточки кандидатов между колонками.</p>
           </div>
           <button style={{padding: '12px 24px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(15,23,42,0.3)'}}>
             <i className="fa-solid fa-plus" style={{marginRight: '8px'}}></i> Фильтр
           </button>
        </div>

        {/* The Rail Container for Kanban Columns */}
        <div className="hide-scroll" style={{ flex: 1, display: 'flex', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '24px', height: '100%', minHeight: '500px' }}>
                {Object.values(columns).map(col => (
                    <div 
                      key={col.id} 
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, col.id)}
                      style={{
                          width: '320px', 
                          flexShrink: 0,
                          background: 'rgba(241, 245, 249, 0.5)', // frosted glass background instead of solid grey!
                          backdropFilter: 'blur(20px)',
                          borderRadius: '24px', 
                          padding: '20px', 
                          display: 'flex', 
                          flexDirection: 'column',
                          height: '100%',
                          maxHeight: '100%',
                          boxSizing: 'border-box'
                      }}
                    >
                        {/* Column Header */}
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0}}>
                            <h4 style={{margin: 0, color: '#0f172a', fontSize: '1.05rem', display: 'flex', alignItems: 'center', fontWeight: 700}}>
                                <span style={{width: '10px', height: '10px', borderRadius: '50%', background: col.color, display: 'inline-block', marginRight: '10px', boxShadow: `0 0 10px ${col.color}`}}></span>
                                {col.title}
                            </h4>
                            <span style={{background: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>{col.count}</span>
                        </div>

                        {/* Cards Core Vertical Deck */}
                        <div className="hide-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
                            {col.cards.map(card => (
                                <div 
                                   draggable 
                                   onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                                   onDragEnd={handleDragEnd}
                                   key={card.id} 
                                   style={{
                                       background: 'white', 
                                       padding: '24px', 
                                       borderRadius: '20px', 
                                       border: '1px solid rgba(255,255,255,0.8)', // Invisible glassy border
                                       boxShadow: '0 10px 40px -10px rgba(0,0,0,0.06)', // Ultra premium soft drop shadow
                                       cursor: 'grab', 
                                       flexShrink: 0,
                                       transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                   }}
                                >
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                            {/* Dynamic Avatar Micro-UI */}
                                            <div style={{width: '36px', height: '36px', borderRadius: '10px', background: card.avatarGrad, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                                                {card.name.charAt(0)}
                                            </div>
                                            <h5 style={{margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 700}}>{card.name}</h5>
                                        </div>
                                        <span style={{background: col.bg, color: col.color, padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800}}>{card.match}% AI</span>
                                    </div>
                                    <div style={{color: '#475569', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px'}}>{card.role}</div>
                                    <div style={{color: '#94a3b8', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', wordBreak: 'break-word', fontWeight: 500}}>
                                        <i className="fa-solid fa-graduation-cap" style={{flexShrink: 0}}></i> 
                                        <span>{card.uni}</span>
                                    </div>
                                    <div style={{display: 'flex', gap: '8px'}}>
                                        <button style={{flex: 1, padding: '10px', background: '#f8fafc', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, color: '#0f172a', transition: '0.2s'}}>Профиль</button>
                                        <button style={{width: '40px', height: '40px', padding: 0, background: '#f8fafc', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s'}}>
                                           <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            {col.cards.length === 0 && (
                              <div style={{border: '2px dashed #cbd5e1', borderRadius: '16px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, flexShrink: 0, background: 'rgba(255,255,255,0.4)'}}>
                                  Зона приема карточки
                              </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default HRCandidates;
