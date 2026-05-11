// Aja Field — iOS screens. Each returns the inner content (no frame).
// Frames are applied in the canvas layout.

const fmtDayPT = (iso) => {
  const d = new Date(iso + 'T12:00');
  const days = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return { weekday: days[d.getDay()], day: d.getDate(), month: months[d.getMonth()] };
};

// ─────────────────────────────────────────────────────────────
// 01. LOGIN
// ─────────────────────────────────────────────────────────────
const ScLogin = () => (
  <div style={{
    position:'absolute', inset:0,
    background:`
      radial-gradient(ellipse at 20% 80%, oklch(0.88 0.10 40 / 0.45), transparent 55%),
      radial-gradient(ellipse at 80% 20%, oklch(0.88 0.09 70 / 0.35), transparent 55%),
      oklch(0.96 0.02 50)
    `,
    display:'flex', flexDirection:'column', justifyContent:'space-between',
    padding:'120px 28px 60px',
  }}>
    <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(45deg, transparent 0 40px, oklch(0.60 0.10 40 / 0.04) 40px 41px)' }}/>
    <div style={{ position:'relative' }}>
      <div style={{
        width:56, height:56, borderRadius:16,
        background:'oklch(0.28 0.04 40)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'oklch(0.85 0.08 40)', marginBottom:28,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M4 20L12 4l8 16" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round"/>
          <path d="M8 14h8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ fontSize:13, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', color:'oklch(0.45 0.08 40)', marginBottom:14 }}>Aja Field</div>
      <div style={{ fontFamily:'Instrument Serif, Georgia, serif', fontSize:44, fontWeight:400, lineHeight:1.05, letterSpacing:-0.5, color:'oklch(0.25 0.04 40)', textWrap:'balance' }}>
        Suas <em style={{ color: iosC.accent }}>operações</em> em cada bolso.
      </div>
      <div style={{ fontSize:15, lineHeight:1.5, color:'oklch(0.40 0.06 40)', marginTop:16 }}>
        Check-in, tarefas e reservas de onde quer que esteja.
      </div>
    </div>
    <div style={{ position:'relative', display:'flex', flexDirection:'column', gap:12 }}>
      <IOSButton primary icon={<IIco n="faceid" s={20} c="#fff"/>}>Entrar com Face ID</IOSButton>
      <IOSButton style={{ background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)' }}>Usar senha</IOSButton>
      <div style={{ textAlign:'center', fontSize:12, color:'oklch(0.45 0.04 40)', marginTop:8 }}>
        v3.8 · Mar &amp; Sal Properties · Florianópolis
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// 02. TODAY (Home)
// ─────────────────────────────────────────────────────────────
const ScToday = () => {
  const today = fmtDayPT('2026-04-17');
  const arriving = RESERVATIONS.filter(r=>r.status==='arriving_today');
  const departing = RESERVATIONS.filter(r=>r.status==='departing_today');
  const myTasks = TASKS.filter(t=>t.status !== 'done').slice(0, 3);
  return (
    <IOSScreen>
      <IOSLargeTitle
        sub={`${today.weekday} · ${today.day} ${today.month}`}
        title="Quase cheio hoje."
        accessoryRight={
          <div style={{ display:'flex', gap:8 }}>
            <IOSPill>
              <IIco n="bell" s={16} c={iosC.accent}/>
              <span style={{ width:6, height:6, borderRadius:3, background:iosC.err, marginLeft:-2, marginTop:-12 }}/>
            </IOSPill>
            <IOSAvatar name="Ana Oliveira" size={36} hue={40}/>
          </div>
        }
      />
      {/* Occupancy hero */}
      <div style={{ padding:'4px 20px 0' }}>
        <IOSCard style={{ padding:'18px 18px 16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div style={{ fontSize:13, color:iosC.ink3, fontWeight:500 }}>Ocupação de hoje</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:4 }}>
                <div style={{ fontFamily:'Instrument Serif, serif', fontSize:44, lineHeight:1, letterSpacing:-1, color:iosC.ink }}>21</div>
                <div style={{ fontSize:15, color:iosC.ink3 }}>/ 24 unidades</div>
              </div>
            </div>
            <IOSChip tone="ok" icon={<div style={{ width:6, height:6, borderRadius:3, background:iosC.ok, marginRight:2 }}/>}>+3 vs ontem</IOSChip>
          </div>
          <div style={{ marginTop:14, display:'flex', gap:3 }}>
            {Array.from({length:24}).map((_,i)=>{
              const state = i<21 ? (i<3?'arr':i>17?'dep':'in') : 'empty';
              const color = state==='empty' ? 'rgba(60,50,40,0.12)' : state==='arr' ? iosC.accent : state==='dep' ? iosC.warn : iosC.ok;
              return <div key={i} style={{ flex:1, height:26, borderRadius:5, background:color }}/>;
            })}
          </div>
          <div style={{ display:'flex', gap:14, marginTop:12, fontSize:11, color:iosC.ink3 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:8, height:8, borderRadius:2, background:iosC.accent }}/>3 chegando</div>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:8, height:8, borderRadius:2, background:iosC.ok }}/>16 hospedados</div>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:8, height:8, borderRadius:2, background:iosC.warn }}/>2 saindo</div>
          </div>
        </IOSCard>
      </div>

      {/* Priority row: Arriving */}
      <IOSSection title="Chegando hoje" action={`${arriving.length} ver todos`}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {arriving.map(r => {
            const g = GUESTS.find(x=>x.id===r.guestId);
            const u = UNITS.find(x=>x.id===r.unitId);
            const hue = PROPERTIES.find(p=>p.id===r.propertyId)?.coverHue || 40;
            return (
              <IOSCard key={r.id} tight>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <IOSAvatar name={g.name} size={40} hue={hue}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>{g.name}</div>
                    <div style={{ fontSize:13, color:iosC.ink3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {u.name}
                    </div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:iosC.accent, fontVariantNumeric:'tabular-nums' }}>ETA {r.eta}</div>
                    {r.pending.length>0
                      ? <IOSChip tone="warn" size="sm">{r.pending.length} pend.</IOSChip>
                      : <IOSChip tone="ok" size="sm">pronto</IOSChip>}
                  </div>
                </div>
              </IOSCard>
            );
          })}
        </div>
      </IOSSection>

      {/* Priority queue: Tasks */}
      <IOSSection title="Minha fila">
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {myTasks.map(t => {
            const u = UNITS.find(x=>x.id===t.unitId);
            const done = t.checklist.filter(c=>c.d).length;
            const prog = (done / t.checklist.length) * 100;
            return (
              <IOSCard key={t.id} tight>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:40, height:40, borderRadius:12,
                    background: t.type==='cleaning' ? 'rgba(122,139,122,0.18)' : 'rgba(76,90,107,0.18)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  }}>
                    <IIco n={t.type==='cleaning'?'check':'wrench'} s={20} c={t.type==='cleaning'?iosC.sage:iosC.steel}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14.5, fontWeight:600, color:iosC.ink, letterSpacing:-0.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.title}</div>
                    <div style={{ fontSize:12, color:iosC.ink3, marginTop:2 }}>
                      {done}/{t.checklist.length} passos · até {t.due.split('T')[1].slice(0,5)}
                    </div>
                    <div style={{ marginTop:6 }}><IOSProgress value={prog}/></div>
                  </div>
                </div>
              </IOSCard>
            );
          })}
        </div>
      </IOSSection>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 03. RESERVATIONS LIST
// ─────────────────────────────────────────────────────────────
const ScResList = () => {
  const tabs = [
    { id:'today', label:'Hoje', count: 5 },
    { id:'upcoming', label:'Próximas', count: 12 },
    { id:'inhouse', label:'In-house', count: 16 },
    { id:'all', label:'Todas', count: 48 },
  ];
  const items = RESERVATIONS.filter(r => ['arriving_today','departing_today','in_house','confirmed'].includes(r.status)).slice(0, 8);
  return (
    <IOSScreen>
      <IOSLargeTitle title="Reservas" sub="Mar & Sal" />
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          background:'rgba(60,50,40,0.06)', borderRadius:12,
          padding:'10px 12px',
        }}>
          <IIco n="search" s={16} c={iosC.ink3}/>
          <div style={{ flex:1, fontSize:15, color:iosC.ink3 }}>Buscar código, hóspede...</div>
          <IIco n="qr" s={17} c={iosC.accent}/>
        </div>
      </div>
      {/* Segmented */}
      <div style={{ padding:'0 20px', display:'flex', gap:8, overflowX:'hidden' }}>
        {tabs.map(t => {
          const on = t.id === 'today';
          return (
            <div key={t.id} style={{
              padding:'7px 12px', borderRadius:999,
              background: on ? iosC.accent : 'rgba(60,50,40,0.06)',
              color: on ? '#fff' : iosC.ink2,
              fontSize:13, fontWeight:600, letterSpacing:-0.2,
              display:'flex', gap:6, alignItems:'center', flexShrink:0,
            }}>
              {t.label}
              <span style={{
                background: on ? 'rgba(255,255,255,0.28)' : 'rgba(60,50,40,0.10)',
                padding:'1px 6px', borderRadius:999, fontSize:11,
              }}>{t.count}</span>
            </div>
          );
        })}
      </div>
      {/* Grouped list */}
      <IOSSection title="Chegadas · 17 abr">
        <IOSCard style={{ padding:0 }}>
          {items.filter(r=>r.status==='arriving_today').map((r, i, arr) => {
            const g = GUESTS.find(x=>x.id===r.guestId);
            const u = UNITS.find(x=>x.id===r.unitId);
            const hue = PROPERTIES.find(p=>p.id===r.propertyId)?.coverHue || 40;
            return (
              <div key={r.id} style={{
                padding:'14px 16px', display:'flex', alignItems:'center', gap:12,
                borderBottom: i < arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
              }}>
                <IOSAvatar name={g.name} size={38} hue={hue}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>{g.name}</div>
                    {g.tags.includes('VIP') && <IOSChip tone="accent" size="sm">VIP</IOSChip>}
                  </div>
                  <div style={{ fontSize:13, color:iosC.ink3, marginTop:1 }}>{u.name}</div>
                  <div style={{ fontSize:11.5, color:iosC.ink4, marginTop:2, fontVariantNumeric:'tabular-nums' }}>
                    {r.code} · {r.source} · ETA {r.eta}
                  </div>
                </div>
                {r.pending.length>0
                  ? <IOSChip tone="warn" size="sm">{r.pending.length} pend.</IOSChip>
                  : <IIco n="chevR" s={14} c={iosC.ink4}/>}
              </div>
            );
          })}
        </IOSCard>
      </IOSSection>
      <IOSSection title="Saídas · 17 abr">
        <IOSCard style={{ padding:0 }}>
          {items.filter(r=>r.status==='departing_today').map((r, i, arr) => {
            const g = GUESTS.find(x=>x.id===r.guestId);
            const u = UNITS.find(x=>x.id===r.unitId);
            const hue = PROPERTIES.find(p=>p.id===r.propertyId)?.coverHue || 40;
            return (
              <div key={r.id} style={{
                padding:'14px 16px', display:'flex', alignItems:'center', gap:12,
                borderBottom: i < arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
              }}>
                <IOSAvatar name={g.name} size={38} hue={hue}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:15, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>{g.name}</div>
                  <div style={{ fontSize:13, color:iosC.ink3, marginTop:1 }}>{u.name}</div>
                  <div style={{ fontSize:11.5, color:iosC.ink4, marginTop:2, fontVariantNumeric:'tabular-nums' }}>
                    Check-out {r.eta}
                  </div>
                </div>
                <IOSChip tone="steel" size="sm">saindo</IOSChip>
              </div>
            );
          })}
        </IOSCard>
      </IOSSection>
    </IOSScreen>
  );
};

window.ScLogin = ScLogin;
window.ScToday = ScToday;
window.ScResList = ScResList;
