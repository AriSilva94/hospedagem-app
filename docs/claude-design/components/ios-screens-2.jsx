// ─────────────────────────────────────────────────────────────
// 04. RESERVATION DETAIL (arriving today, has pending)
// ─────────────────────────────────────────────────────────────
const ScResDetail = () => {
  const r = RESERVATIONS.find(x=>x.id==='r1025'); // Helena & Tomás, pending contract+id
  const g = GUESTS.find(x=>x.id===r.guestId);
  const u = UNITS.find(x=>x.id===r.unitId);
  const p = PROPERTIES.find(x=>x.id===r.propertyId);
  const nights = 4;
  return (
    <IOSScreen pad={false}>
      {/* Hero header with cover */}
      <div style={{
        paddingTop: 100, paddingBottom: 18,
        background:`linear-gradient(180deg, oklch(0.75 0.10 ${p.coverHue}) 0%, oklch(0.88 0.06 ${p.coverHue}) 100%)`,
        position:'relative',
      }}>
        <IOSTopBar back rightIcon="chat" dark />
        <div style={{ padding:'0 20px' }}>
          <div style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)' }}>
            {r.code} · {r.source}
          </div>
          <div style={{ fontFamily:'Instrument Serif, serif', fontSize:34, color:'#fff', letterSpacing:-0.3, lineHeight:1.1, marginTop:4, textShadow:'0 1px 2px rgba(0,0,0,0.15)' }}>
            {g.name}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6, color:'rgba(255,255,255,0.92)', fontSize:14 }}>
            <IIco n="pin" s={14} c="#fff"/>
            <span>{u.name}</span>
          </div>
        </div>
      </div>

      {/* Pending banner */}
      <div style={{ padding:'16px 16px 0' }}>
        <div style={{
          background: iosC.warnSoft, borderRadius:14, padding:'14px 14px',
          border:`0.5px solid rgba(217,119,6,0.25)`,
          display:'flex', gap:12, alignItems:'flex-start',
        }}>
          <div style={{
            width:32, height:32, borderRadius:10, background:'#D97706',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>
            <IIco n="clock" s={18} c="#fff"/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#7A4008' }}>Pendências antes do check-in</div>
            <div style={{ fontSize:13, color:'#7A4008', marginTop:2 }}>Contrato não assinado · Documento do hóspede</div>
          </div>
        </div>
      </div>

      {/* Dates */}
      <IOSSection title="Estadia">
        <IOSCard>
          <div style={{ display:'flex', alignItems:'stretch' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:iosC.ink3, fontWeight:600, letterSpacing:0.2, textTransform:'uppercase' }}>Check-in</div>
              <div style={{ fontSize:22, fontFamily:'Instrument Serif, serif', color:iosC.ink, letterSpacing:-0.3, marginTop:2 }}>17 abr</div>
              <div style={{ fontSize:13, color:iosC.accent, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>hoje · ETA 17:00</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, margin:'0 12px' }}>
              <div style={{ fontSize:11, color:iosC.ink4 }}>{nights} noites</div>
              <div style={{ width:40, height:1, background:iosC.line, position:'relative' }}>
                <div style={{ position:'absolute', right:-3, top:-2, width:0, height:0, borderLeft:`5px solid ${iosC.line}`, borderTop:'2.5px solid transparent', borderBottom:'2.5px solid transparent' }}/>
              </div>
            </div>
            <div style={{ flex:1, textAlign:'right' }}>
              <div style={{ fontSize:11, color:iosC.ink3, fontWeight:600, letterSpacing:0.2, textTransform:'uppercase' }}>Check-out</div>
              <div style={{ fontSize:22, fontFamily:'Instrument Serif, serif', color:iosC.ink, letterSpacing:-0.3, marginTop:2 }}>21 abr</div>
              <div style={{ fontSize:13, color:iosC.ink3 }}>terça · 11:00</div>
            </div>
          </div>
          <div style={{ height:1, background:iosC.line, margin:'14px 0' }}/>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <div style={{ fontSize:13, color:iosC.ink3 }}>{r.guests} hóspedes · lua de mel</div>
            <div style={{ fontSize:13, fontWeight:600, color:iosC.ink, fontVariantNumeric:'tabular-nums' }}>R$ {r.total.toLocaleString('pt-BR')}</div>
          </div>
        </IOSCard>
      </IOSSection>

      <IOSSection title="Hóspede">
        <IOSCard>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <IOSAvatar name={g.name} size={48} hue={p.coverHue}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600, color:iosC.ink }}>{g.name}</div>
              <div style={{ fontSize:13, color:iosC.ink3, overflow:'hidden', textOverflow:'ellipsis' }}>{g.phone}</div>
            </div>
            <IOSPill>
              <IIco n="chat" s={14} c={iosC.accent}/>
              <span style={{ color:iosC.accent, fontWeight:500 }}>Mensagem</span>
            </IOSPill>
          </div>
          <div style={{ display:'flex', gap:6, marginTop:12, flexWrap:'wrap' }}>
            {g.tags.map(t => <IOSChip key={t} tone="accent" size="sm">{t}</IOSChip>)}
            <IOSChip tone="neutral" size="sm">1ª estadia</IOSChip>
          </div>
        </IOSCard>
      </IOSSection>

      {/* CTA */}
      <div style={{ padding:'20px 20px 0' }}>
        <IOSButton primary icon={<IIco n="arrIn" s={20} c="#fff"/>}>Iniciar check-in</IOSButton>
      </div>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 05. CHECK-IN FLOW (ID capture step)
// ─────────────────────────────────────────────────────────────
const ScCheckIn = () => {
  return (
    <IOSScreen pad={false} hasTabs={false} bg={iosC.darkBg}>
      {/* Top bar on dark */}
      <IOSTopBar back title="Check-in · 2 de 4" rightIcon="plus" dark />
      {/* Step indicator */}
      <div style={{ position:'absolute', top:110, left:0, right:0, padding:'0 20px', zIndex:5 }}>
        <div style={{ display:'flex', gap:6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              flex:1, height:3, borderRadius:2,
              background: i<=2 ? iosC.accent : 'rgba(255,255,255,0.18)',
            }}/>
          ))}
        </div>
      </div>
      {/* Camera viewport — simulated ID capture */}
      <div style={{
        position:'absolute', top:140, left:20, right:20, bottom:230,
        borderRadius:22, overflow:'hidden',
        background:'linear-gradient(135deg, #2a2622, #1a1613)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {/* Simulated ID card */}
        <div style={{
          width:'82%', aspectRatio:'1.586', borderRadius:12,
          background:`
            linear-gradient(135deg, #e8e3db 0%, #c6bfb3 100%)
          `,
          border:'1px solid rgba(255,255,255,0.2)',
          padding:16, position:'relative', overflow:'hidden',
          boxShadow:'0 4px 16px rgba(0,0,0,0.4)',
          transform:'rotate(-2deg)',
        }}>
          <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(45deg, transparent 0 8px, rgba(255,255,255,0.25) 8px 9px)' }}/>
          <div style={{ position:'relative', display:'flex', gap:12 }}>
            <div style={{ width:56, height:70, background:'rgba(60,50,40,0.2)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <IIco n="user" s={32} c="rgba(60,50,40,0.5)"/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:8, color:'rgba(60,50,40,0.7)', fontWeight:600, letterSpacing:0.3, textTransform:'uppercase' }}>República Federativa do Brasil</div>
              <div style={{ fontSize:7, color:'rgba(60,50,40,0.5)', marginTop:2 }}>Registro Geral</div>
              <div style={{ marginTop:8 }}>
                <div style={{ fontSize:7, color:'rgba(60,50,40,0.5)' }}>NOME</div>
                <div style={{ fontSize:11, fontWeight:700, color:'rgba(40,30,20,0.85)' }}>HELENA M. BRANDÃO</div>
                <div style={{ fontSize:7, color:'rgba(60,50,40,0.5)', marginTop:4 }}>RG</div>
                <div style={{ fontSize:10, fontWeight:600, color:'rgba(40,30,20,0.85)', fontVariantNumeric:'tabular-nums' }}>33.914.229-8 SSP/RJ</div>
              </div>
            </div>
          </div>
        </div>
        {/* Corner guides */}
        {['tl','tr','bl','br'].map(pos => {
          const s = { position:'absolute', width:28, height:28, border:`3px solid ${iosC.accent}` };
          if (pos==='tl') Object.assign(s, { top:30, left:30, borderRight:'none', borderBottom:'none', borderTopLeftRadius:8 });
          if (pos==='tr') Object.assign(s, { top:30, right:30, borderLeft:'none', borderBottom:'none', borderTopRightRadius:8 });
          if (pos==='bl') Object.assign(s, { bottom:30, left:30, borderRight:'none', borderTop:'none', borderBottomLeftRadius:8 });
          if (pos==='br') Object.assign(s, { bottom:30, right:30, borderLeft:'none', borderTop:'none', borderBottomRightRadius:8 });
          return <div key={pos} style={s}/>;
        })}
        {/* Scanning line */}
        <div style={{
          position:'absolute', left:30, right:30, top:'50%',
          height:2, background:`linear-gradient(90deg, transparent, ${iosC.accent}, transparent)`,
          boxShadow:`0 0 14px ${iosC.accent}`,
        }}/>
      </div>
      {/* Bottom panel */}
      <div style={{
        position:'absolute', bottom:110, left:0, right:0,
        padding:'0 20px',
      }}>
        <div style={{ textAlign:'center', color:'rgba(255,255,255,0.92)', marginBottom:16 }}>
          <div style={{ fontFamily:'Instrument Serif, serif', fontSize:26, letterSpacing:-0.3, lineHeight:1.15 }}>
            Posicione o <em style={{ color:iosC.accent, fontStyle:'italic' }}>documento</em> no quadro
          </div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)', marginTop:6 }}>
            RG ou passaporte · detecção automática
          </div>
        </div>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:24,
        }}>
          <div style={{
            width:48, height:48, borderRadius:24,
            background:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <IIco n="doc" s={22} c="#fff"/>
          </div>
          <div style={{
            width:72, height:72, borderRadius:36,
            background:'#fff', border:`4px solid ${iosC.accent}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 4px 24px ${iosC.accent}80`,
          }}>
            <div style={{ width:56, height:56, borderRadius:28, background:iosC.accent }}/>
          </div>
          <div style={{
            width:48, height:48, borderRadius:24,
            background:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <IIco n="moon" s={22} c="#fff"/>
          </div>
        </div>
      </div>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 06. CALENDAR
// ─────────────────────────────────────────────────────────────
const ScCalendar = () => {
  const days = Array.from({length:31}, (_,i)=>i+1);
  // Month: April 2026 — 1 April = Wednesday (0=Sun)
  const startDay = 3;
  return (
    <IOSScreen>
      <IOSLargeTitle title="Abril" sub="2026" accessoryRight={
        <IOSPill>
          <IIco n="filter" s={16} c={iosC.accent}/>
          <span style={{ color:iosC.accent, fontWeight:500 }}>3 imóveis</span>
        </IOSPill>
      }/>
      {/* Month nav */}
      <div style={{ padding:'0 20px 14px', display:'flex', gap:6, alignItems:'center' }}>
        <div style={{ display:'flex', gap:8 }}>
          <IOSPill><IIco n="chevR" s={14} c={iosC.accent} style={{ transform:'rotate(180deg)' }}/></IOSPill>
          <IOSPill style={{ paddingLeft:16, paddingRight:16 }}><span style={{ color:iosC.ink, fontWeight:600 }}>Hoje</span></IOSPill>
          <IOSPill><IIco n="chevR" s={14} c={iosC.accent}/></IOSPill>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
          <IOSChip tone="ok" size="sm">16 in-house</IOSChip>
          <IOSChip tone="accent" size="sm">3 hoje</IOSChip>
        </div>
      </div>
      {/* Week header */}
      <div style={{ padding:'0 20px 6px', display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:0 }}>
        {['D','S','T','Q','Q','S','S'].map((d,i)=>(
          <div key={i} style={{ fontSize:11, fontWeight:600, color:iosC.ink4, textAlign:'center', padding:'4px 0' }}>{d}</div>
        ))}
      </div>
      {/* Month grid */}
      <div style={{ padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:4 }}>
        {Array.from({length: startDay}).map((_,i)=><div key={`e${i}`}/>)}
        {days.map(d => {
          const isToday = d === 17;
          const hasArr = [17,18,20,22,25].includes(d);
          const hasDep = [17,19,21,23,24].includes(d);
          const hasBlock = d===15;
          return (
            <div key={d} style={{
              aspectRatio:'1', borderRadius:10, padding:'6px 4px',
              background: isToday ? iosC.accent : iosC.card,
              color: isToday ? '#fff' : iosC.ink,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start',
              boxShadow: isToday ? '0 2px 10px rgba(194,90,62,0.35)' : '0 1px 2px rgba(0,0,0,0.03)',
              position:'relative',
            }}>
              <div style={{ fontSize:15, fontWeight:isToday?700:500, fontVariantNumeric:'tabular-nums', lineHeight:1 }}>{d}</div>
              <div style={{ display:'flex', gap:2, marginTop:'auto', flexWrap:'wrap', justifyContent:'center' }}>
                {hasArr && <div style={{ width:5, height:5, borderRadius:3, background: isToday?'#fff':iosC.accent }}/>}
                {hasDep && <div style={{ width:5, height:5, borderRadius:3, background: isToday?'rgba(255,255,255,0.7)':iosC.warn }}/>}
                {hasBlock && <div style={{ width:5, height:5, borderRadius:3, background: isToday?'rgba(255,255,255,0.5)':iosC.err }}/>}
              </div>
            </div>
          );
        })}
      </div>
      {/* Day detail */}
      <IOSSection title="Quinta · 17 abr" action="3 chegadas">
        <IOSCard style={{ padding:0 }}>
          {RESERVATIONS.filter(r=>r.status==='arriving_today').slice(0,3).map((r, i, arr) => {
            const g = GUESTS.find(x=>x.id===r.guestId);
            const u = UNITS.find(x=>x.id===r.unitId);
            return (
              <div key={r.id} style={{
                padding:'12px 14px', display:'flex', alignItems:'center', gap:10,
                borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}`:'none',
              }}>
                <div style={{
                  width:34, height:34, borderRadius:10,
                  background:iosC.accentSoft, color:iosC.accentInk,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <IIco n="arrIn" s={16} c={iosC.accentInk}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>{g.name.split(' ')[0]} {g.name.split(' ').pop()}</div>
                  <div style={{ fontSize:12, color:iosC.ink3 }}>{u.name} · {r.eta}</div>
                </div>
                <IIco n="chevR" s={14} c={iosC.ink4}/>
              </div>
            );
          })}
        </IOSCard>
      </IOSSection>
    </IOSScreen>
  );
};

window.ScResDetail = ScResDetail;
window.ScCheckIn = ScCheckIn;
window.ScCalendar = ScCalendar;
