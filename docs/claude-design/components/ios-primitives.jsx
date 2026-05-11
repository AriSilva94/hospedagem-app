// Aja Field — iOS mobile companion app primitives
// Shared styles + tab bar + helpers
// Accent is terracotta (matches the desktop brand).

const iosC = {
  bg: '#F4F1EC',       // warm off-white  (ios system grouped bg, warmed)
  card: '#FFFFFF',
  card2: '#FAF7F2',
  line: 'rgba(60,50,40,0.10)',
  ink: '#1C1A17',
  ink2: '#3D3832',
  ink3: 'rgba(60,50,40,0.55)',
  ink4: 'rgba(60,50,40,0.38)',
  accent: '#C25A3E',    // terracotta
  accentSoft: '#F5E3DB',
  accentInk: '#7A2C18',
  ok: '#2F8F57',
  okSoft: '#DEEFE3',
  warn: '#D97706',
  warnSoft: '#FBEEDC',
  err: '#B83B39',
  errSoft: '#F6DCD9',
  sage: '#7A8B7A',
  steel: '#4C5A6B',
  darkBg: '#0F0D0A',
  darkCard: '#1C1A17',
};

// Tab bar (liquid-glass pills)
const IOSTabBar = ({ active = 'today', dark = false, onTabChange }) => {
  const tabs = [
    { id: 'today', icon: 'home', label: 'Hoje' },
    { id: 'res', icon: 'list', label: 'Reservas' },
    { id: 'tasks', icon: 'wrench', label: 'Tarefas' },
    { id: 'chat', icon: 'chat', label: 'Chat' },
    { id: 'more', icon: 'user', label: 'Mais' },
  ];
  const ink = dark ? 'rgba(255,255,255,0.55)' : 'rgba(60,50,40,0.50)';
  const inkA = iosC.accent;
  return (
    <div style={{
      position: 'absolute', bottom: 30, left: 16, right: 16,
      height: 64, borderRadius: 32, zIndex: 40,
      overflow: 'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0, borderRadius:32,
        backdropFilter:'blur(22px) saturate(180%)',
        WebkitBackdropFilter:'blur(22px) saturate(180%)',
        background: dark ? 'rgba(28,26,23,0.72)' : 'rgba(255,255,255,0.72)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
        border: dark ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid rgba(0,0,0,0.06)',
      }}/>
      <div style={{
        position:'relative', zIndex:1, height:'100%',
        display:'flex', alignItems:'center', justifyContent:'space-around',
      }}>
        {tabs.map(tab => {
          const on = tab.id === active;
          return (
            <div key={tab.id} style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              gap:2, padding:'6px 12px', borderRadius:18,
              background: on ? (dark ? 'rgba(194,90,62,0.22)' : iosC.accentSoft) : 'transparent',
            }}>
              <IIco n={tab.icon} s={22} c={on ? inkA : ink}/>
              <div style={{
                fontSize:10, fontWeight:600, letterSpacing:-0.1,
                color: on ? inkA : ink,
              }}>{tab.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Screen scaffold: dark/light aware scroll container w/ padding for status bar + tab bar
const IOSScreen = ({ children, dark = false, pad = true, hasTabs = true, bg }) => (
  <div style={{
    position:'absolute', inset:0,
    background: bg || (dark ? iosC.darkBg : iosC.bg),
    overflow:'hidden',
  }}>
    <div style={{
      position:'absolute', top:0, left:0, right:0, bottom:0,
      paddingTop: pad ? 58 : 0,
      paddingBottom: hasTabs ? 124 : 40,
      overflowY:'auto',
    }}>{children}</div>
  </div>
);

// Status chip — small pill
const IOSChip = ({ tone = 'neutral', children, dark = false, icon, size = 'md' }) => {
  const tones = {
    accent: { bg: iosC.accentSoft, fg: iosC.accentInk, dbg:'rgba(194,90,62,0.22)', dfg:'#F5AE96' },
    ok: { bg: iosC.okSoft, fg: '#1E5A36', dbg:'rgba(47,143,87,0.22)', dfg:'#9FE2B7' },
    warn: { bg: iosC.warnSoft, fg: '#7A4008', dbg:'rgba(217,119,6,0.25)', dfg:'#F6C77A' },
    err: { bg: iosC.errSoft, fg: '#7A2020', dbg:'rgba(184,59,57,0.22)', dfg:'#F1A3A1' },
    neutral: { bg: 'rgba(60,50,40,0.08)', fg: iosC.ink2, dbg:'rgba(255,255,255,0.10)', dfg:'rgba(255,255,255,0.75)' },
    steel: { bg: 'rgba(76,90,107,0.14)', fg: '#2B3845', dbg:'rgba(156,173,194,0.22)', dfg:'#BDD0E5' },
  };
  const t = tones[tone];
  const bg = dark ? t.dbg : t.bg;
  const fg = dark ? t.dfg : t.fg;
  const p = size==='sm' ? '2px 8px' : '4px 10px';
  const fs = size==='sm' ? 11 : 12;
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:4,
      padding:p, borderRadius:999, background:bg, color:fg,
      fontSize:fs, fontWeight:600, letterSpacing:-0.1,
    }}>{icon}{children}</div>
  );
};

// Big button
const IOSButton = ({ children, primary, onClick, dark, icon, style, size = 'lg' }) => {
  const h = size === 'lg' ? 52 : 44;
  const bg = primary ? iosC.accent : (dark ? 'rgba(255,255,255,0.12)' : '#fff');
  const fg = primary ? '#fff' : (dark ? '#fff' : iosC.ink);
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      gap:8, height:h, borderRadius:h/2, width:'100%',
      background:bg, color:fg, border:'none',
      fontSize:17, fontWeight:600, letterSpacing:-0.3,
      boxShadow: primary ? '0 2px 12px rgba(194,90,62,0.35)' : (dark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'),
      cursor:'pointer', ...style,
    }}>{icon}{children}</button>
  );
};

// Card
const IOSCard = ({ children, dark, style, tight = false }) => (
  <div style={{
    background: dark ? iosC.darkCard : iosC.card,
    borderRadius: 18,
    padding: tight ? '12px 14px' : '16px',
    boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.03)',
    border: dark ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
    ...style,
  }}>{children}</div>
);

// Avatar (warm-tone initials)
const IOSAvatar = ({ name, size = 36, hue = 40 }) => {
  const init = name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  return (
    <div style={{
      width:size, height:size, borderRadius:size/2, flexShrink:0,
      background:`oklch(0.90 0.05 ${hue})`, color:`oklch(0.35 0.12 ${hue})`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: Math.round(size*0.38), fontWeight:600, letterSpacing:-0.3,
    }}>{init}</div>
  );
};

// Section header (grouped list style)
const IOSSection = ({ title, action, children, first }) => (
  <div style={{ marginTop: first ? 20 : 28, padding:'0 16px' }}>
    {title && (
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        padding:'0 4px 10px',
      }}>
        <div style={{ fontSize:13, fontWeight:600, color:iosC.ink3, letterSpacing:0.2, textTransform:'uppercase' }}>{title}</div>
        {action && <div style={{ fontSize:14, fontWeight:600, color:iosC.accent }}>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

// Large title header (with subtitle)
const IOSLargeTitle = ({ title, sub, accessoryRight, dark }) => (
  <div style={{ padding:'0 20px 12px' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
      <div>
        {sub && <div style={{ fontSize:13, fontWeight:600, color:iosC.ink3, letterSpacing:0.3, textTransform:'uppercase', marginBottom:4 }}>{sub}</div>}
        <div style={{
          fontFamily: 'Instrument Serif, Georgia, serif',
          fontSize: 38, fontWeight:400, lineHeight:1.05, letterSpacing:-0.4,
          color: dark ? '#fff' : iosC.ink, textWrap:'balance',
        }}>{title}</div>
      </div>
      {accessoryRight}
    </div>
  </div>
);

// Reusable glass nav pill (single icon) — back / close
const IOSPill = ({ children, dark, onClick, style }) => (
  <button onClick={onClick} style={{
    height:36, minWidth:36, padding:'0 12px', borderRadius:18, border:'none',
    display:'inline-flex', alignItems:'center', gap:4,
    background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.75)',
    backdropFilter:'blur(12px) saturate(180%)',
    WebkitBackdropFilter:'blur(12px) saturate(180%)',
    color: dark ? '#fff' : iosC.ink, cursor:'pointer',
    fontSize:15, fontWeight:500, letterSpacing:-0.2,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    ...style,
  }}>{children}</button>
);

// Top bar with back button (compact nav bar)
const IOSTopBar = ({ back = true, title, rightIcon, rightOnClick, dark }) => (
  <div style={{
    position:'absolute', top:58, left:0, right:0, zIndex:5,
    padding:'6px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
  }}>
    {back ? (
      <IOSPill dark={dark}>
        <IIco n="chevR" s={14} c={iosC.accent} style={{ transform:'rotate(180deg)' }}/>
        <span style={{ color: iosC.accent, fontWeight:500 }}>Voltar</span>
      </IOSPill>
    ) : <div style={{ width:70 }}/>}
    {title && (
      <div style={{
        position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)',
        fontSize:17, fontWeight:600, color: dark?'#fff':iosC.ink, letterSpacing:-0.3,
      }}>{title}</div>
    )}
    {rightIcon ? (
      <IOSPill dark={dark} onClick={rightOnClick}>
        <IIco n={rightIcon} s={16} c={iosC.accent}/>
      </IOSPill>
    ) : <div style={{ width:44 }}/>}
  </div>
);

// Progress bar
const IOSProgress = ({ value, tone = 'accent', dark }) => {
  const tones = { accent: iosC.accent, ok: iosC.ok, warn: iosC.warn };
  return (
    <div style={{
      height:6, borderRadius:3, overflow:'hidden',
      background: dark ? 'rgba(255,255,255,0.10)' : 'rgba(60,50,40,0.08)',
    }}>
      <div style={{ width:`${value}%`, height:'100%', background:tones[tone], borderRadius:3 }}/>
    </div>
  );
};

Object.assign(window, {
  iosC, IOSTabBar, IOSScreen, IOSChip, IOSButton, IOSCard, IOSAvatar,
  IOSSection, IOSLargeTitle, IOSPill, IOSTopBar, IOSProgress,
});
