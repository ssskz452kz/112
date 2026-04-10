import React, { useState, useEffect, useRef } from 'react';

function AIAnalysis() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('eduTrackGeminiKey') || '');
  const [isUnlocked, setIsUnlocked] = useState(!!localStorage.getItem('eduTrackGeminiKey'));
  const [inputKey, setInputKey] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const scrollRef = useRef(null);

  const handleUnlock = () => {
    if (inputKey.trim().length > 10) {
      localStorage.setItem('eduTrackGeminiKey', inputKey.trim());
      setApiKey(inputKey.trim());
      setIsUnlocked(true);
    } else {
      alert('Неверный формат ключа API.');
    }
  };

  const lockVault = () => {
    localStorage.removeItem('eduTrackGeminiKey');
    setApiKey('');
    setIsUnlocked(false);
    setAiResponse('');
    setDisplayedText('');
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAiResponse('');
    setDisplayedText('');

    const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
    const name = profile.name || 'Студент';
    const uni = profile.university || 'Университет';
    const major = profile.specialty || profile.faculty || 'Специальность';

    const prompt = `Ты наставник по карьере 'EduTrack AI'. Общайся на профессиональном русском языке. 
Ученик: ${name}. ВУЗ: ${uni}. Направление: ${major} (Казахстан).
Сделай короткий, мощный анализ в 3 пунктах:
1. Краткая оценка востребованности этой профессии в Казахстане.
2. 2 ключевых навыка, которые нужно выучить прямо сейчас.
3. Какую стажировку искать для старта.
Используй списки и выделение жирным. Не лей воду, максимум 150 слов.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
        setAiResponse('**Ошибка:** Не удалось связаться с ядром Gemini. Проверьте ваш API ключ или интернет-соединение.');
    }
  };

  // Typewriter sci-fi effect
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

  if (!isUnlocked) {
    return (
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '60px 20px', textAlign: 'center'}}>
          <div style={{background: 'var(--bg-body)', padding: '60px 40px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.05)'}}>
              <i className="fa-solid fa-microchip" style={{fontSize: '4rem', color: '#cbd5e1', marginBottom: '24px'}}></i>
              <h2 style={{fontSize: '2rem', color: 'var(--text-hero)', margin: '0 0 16px 0'}}>Google Gemini <span style={{background: 'linear-gradient(to right, #3b82f6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>AI Hub</span></h2>
              <p style={{color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem'}}>
                  Для активации нейросетевого анализатора EduTrack в режиме демонстрации, пожалуйста, введите ваш приватный ключ API Gemini.
                  <br/><span style={{fontSize:'0.9rem', color:'#f59e0b'}}><i className="fa-solid fa-shield-halved"></i> Ключ останется только в вашем браузере.</span>
              </p>
              
              <div style={{display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto'}}>
                  <input 
                    type="password" 
                    placeholder="AIzaSy..." 
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    style={{flex: 1, padding: '16px 20px', borderRadius: '16px', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem'}}
                  />
                  <button onClick={handleUnlock} style={{padding: '0 32px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', transition: '0.2s'}}>
                      Подключить
                  </button>
              </div>
          </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
           <div>
             <h2 style={{fontSize: '2rem', color: 'var(--text-hero)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
               <i className="fa-solid fa-sparkles" style={{color: '#f59e0b'}}></i> ИИ-Анализ Профиля
             </h2>
             <p style={{color: 'var(--text-muted)'}}>Нейросеть Google Gemini Flash 1.5 анализирует вашу траекторию.</p>
           </div>
           <button onClick={lockVault} style={{background: 'transparent', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '100px', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600}}>
               <i className="fa-solid fa-lock" style={{marginRight: '6px'}}></i> Отключить ядро
           </button>
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
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Синхронизация...</>
                  ) : (
                      <><i className="fa-solid fa-bolt"></i> Запуск Аналитики</>
                  )}
                </button>
            </div>

            {/* Right Box: Sci-fi Terminal Area */}
            <div ref={scrollRef} style={{background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', minHeight: '400px', maxHeight: '500px', overflowY: 'auto'}}>
                {!aiResponse && !isAnalyzing && (
                    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', opacity: 0.6}}>
                        <i className="fa-solid fa-satellite-dish" style={{fontSize: '4rem', marginBottom: '16px'}}></i>
                        <h3>Ядро ИИ ожидает команды</h3>
                    </div>
                )}
                
                {isAnalyzing && !aiResponse && (
                    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#3b82f6'}}>
                        <i className="fa-solid fa-microchip fa-beat-fade" style={{fontSize: '4rem', marginBottom: '16px'}}></i>
                        <h3>Обработка графа навыков...</h3>
                    </div>
                )}

                {/* Render Text with some basic Markdown conversion for bolding */}
                {displayedText && (
                    <div style={{lineHeight: '1.8', fontSize: '1.05rem', color: '#334155'}}
                        dangerouslySetInnerHTML={{
                            __html: displayedText
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
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
