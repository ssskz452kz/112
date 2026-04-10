import React, { useState, useEffect, useRef } from 'react';

function AIAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const scrollRef = useRef(null);

  // Здесь вставлен рабочий API ключ
  const API_KEY = "AIzaSyDJsp-IhXXQ1UWgtqMzJctqB6IRbAmeZns";

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAiResponse('');
    setDisplayedText('');

    const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
    const name = profile.name || 'Студент';
    const uni = profile.university || 'Университет';
    const major = profile.specialty || profile.faculty || 'Специальность';

    const prompt = `Ты строгий, но полезный ИИ-наставник по карьере от EduTrack. Твоя задача — дать профессиональную дорожную карту студенту из Казахстана.
Студент: ${name}. Университет: ${uni}. Направление: ${major}.
Выдай короткий анализ из 3 пунктов (маркированный список, используй жирный шрифт для главного):
1. Оценка рыночного спроса на эту специальность в Казахстане.
2. Два самых важных навыка, которые ему нужно выучить за этот год.
3. Какую стажировку ему искать в Казахстане прямо сейчас.
Пиши без вводных слов. Сразу к делу. Максимум 120 слов.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        setAiResponse(text);
        setIsAnalyzing(false);

    } catch (err) {
        setIsAnalyzing(false);
        setAiResponse('**Сбой связи:** Нейросеть недоступна. Пожалуйста, проверьте API ключ или подключение.');
    }
  };

  // Sci-fi Typewriter effect
  useEffect(() => {
    if (!aiResponse) return;
    let i = 0;
    const interval = setInterval(() => {
       setDisplayedText(aiResponse.substring(0, i + 1));
       i++;
       if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
       if (i >= aiResponse.length) clearInterval(interval);
    }, 15); // Fast typing speed
    return () => clearInterval(interval);
  }, [aiResponse]);

  return (
    <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
           <div>
             <h2 style={{fontSize: '2rem', color: 'var(--text-hero)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
               <i className="fa-solid fa-brain" style={{color: '#8b5cf6'}}></i> EduTrack AI Assistant
             </h2>
             <p style={{color: 'var(--text-muted)'}}>Нейросетевое ядро прямиком подключено к облачным API кластерам.</p>
           </div>
           <div style={{background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700}}>
               <i className="fa-solid fa-check-circle" style={{marginRight: '6px'}}></i> Real API Node
           </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px'}}>
            {/* Left Box: Profile context */}
            <div style={{background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0', height: 'fit-content'}}>
                <div style={{marginBottom: '24px'}}>
                    <div style={{fontSize: '0.8rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, letterSpacing: '1px', marginBottom: '8px'}}>Источник данных</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{width:'40px', height:'40px', background:'var(--gradient-brand)', borderRadius:'10px', color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <i className="fa-regular fa-user"></i>
                        </div>
                        <div>
                            <div style={{fontWeight: 700, color:'var(--text-hero)'}}>{JSON.parse(localStorage.getItem('studentProfile') || '{}').name || 'Аноним'}</div>
                            <div style={{fontSize: '0.8rem', color:'var(--text-muted)'}}>Ваша анкета</div>
                        </div>
                    </div>
                </div>
                
                <hr style={{border: 'none', borderTop: '1px dashed #cbd5e1', marginBottom: '24px'}} />

                <button 
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  style={{width: '100%', padding: '16px', background: isAnalyzing ? '#cbd5e1' : '#0f172a', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: isAnalyzing ? 'not-allowed' : 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}
                >
                  {isAnalyzing ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Обработка запроса...</>
                  ) : (
                      <><i className="fa-solid fa-bolt"></i> Запуск Истинного ИИ</>
                  )}
                </button>
            </div>

            {/* Right Box: Sci-fi Terminal Area */}
            <div ref={scrollRef} style={{background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.06)', minHeight: '400px', maxHeight: '500px', overflowY: 'auto'}}>
                {!aiResponse && !isAnalyzing && (
                     <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', opacity: 0.6}}>
                        <i className="fa-solid fa-radar" style={{fontSize: '4rem', marginBottom: '16px'}}></i>
                        <h3 style={{fontWeight: 600}}>Ядро ИИ ожидает команды</h3>
                    </div>
                )}
                
                {isAnalyzing && !aiResponse && (
                    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6'}}>
                        <i className="fa-solid fa-microchip fa-beat-fade" style={{fontSize: '4rem', marginBottom: '16px'}}></i>
                        <h3>Стучимся в Google Gemini API...</h3>
                    </div>
                )}

                {/* Render Text with some basic Markdown conversion for bolding */}
                {displayedText && (
                    <div style={{lineHeight: '1.8', fontSize: '1.05rem', color: '#334155'}}
                        dangerouslySetInnerHTML={{
                            __html: displayedText
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em style="color:#8b5cf6">$1</em>')
                                .replace(/\n/g, '<br/>')
                        }}
                    ></div>
                )}
            </div>
        </div>
    </div>
  );
}

export default AIAnalysis;
