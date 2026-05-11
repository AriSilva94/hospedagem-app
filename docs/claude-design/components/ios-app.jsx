// Aja Field — iOS flow canvas
// Lays out all 11 screens on a design canvas with flow arrows + section labels.

const PhoneFrame = ({ children, label, active, showTabBar = true, darkTabs = false }) => (
  <div style={{ position:'relative', flexShrink:0 }}>
    {label && (
      <div style={{
        position:'absolute', bottom:'100%', left:0, paddingBottom:12,
        display:'flex', alignItems:'baseline', gap:10, whiteSpace:'nowrap',
      }}>
        <div style={{
          width:22, height:22, borderRadius:11, background:iosC.accent, color:'#fff',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:700, fontVariantNumeric:'tabular-nums',
        }}>{label.n}</div>
        <div style={{ fontSize:15, fontWeight:600, color:'#2a2420', letterSpacing:-0.3 }}>{label.t}</div>
        {label.sub && <div style={{ fontSize:13, color:'rgba(60,50,40,0.55)', fontWeight:400 }}>{label.sub}</div>}
      </div>
    )}
    <IOSDevice width={380} height={820}>
      <div style={{ position:'absolute', inset:0 }}>
        {children}
        {showTabBar && <IOSTabBar active={active}/>}
      </div>
    </IOSDevice>
  </div>
);

// Flow connector — curved arrow between two frames, right-to-left or left-to-right
const FlowArrow = ({ label, dir = 'right', w = 56 }) => (
  <div style={{
    display:'flex', flexDirection:'column', alignItems:'center',
    flexShrink:0, alignSelf:'center', padding:'0 4px', marginTop:40,
  }}>
    <div style={{
      fontSize:11, fontWeight:600, color:'rgba(60,50,40,0.55)',
      letterSpacing:0.3, textTransform:'uppercase', whiteSpace:'nowrap',
      marginBottom:6,
    }}>{label}</div>
    <svg width={w} height="36" viewBox={`0 0 ${w} 36`}>
      <path
        d={dir==='right'
          ? `M2 18 Q ${w/2} 8 ${w-8} 18`
          : `M${w-2} 18 Q ${w/2} 8 8 18`}
        fill="none" stroke={iosC.accent} strokeWidth="1.6"
        strokeDasharray="4 3" strokeLinecap="round"
      />
      <path
        d={dir==='right'
          ? `M${w-10} 14 L${w-4} 18 L${w-10} 22`
          : `M10 14 L4 18 L10 22`}
        fill="none" stroke={iosC.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  </div>
);

const App = () => (
  <DesignCanvas>
    {/* Hero header */}
    <div style={{ padding:'60px 60px 40px', maxWidth: 900 }}>
      <div style={{ fontSize:12, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(60,50,40,0.55)', marginBottom:14 }}>
        Aja PMS · iOS companion
      </div>
      <div style={{
        fontFamily:'Instrument Serif, Georgia, serif', fontSize:64, lineHeight:1.02,
        letterSpacing:-1, color:'#2a2420', textWrap:'balance',
      }}>
        Aja <em style={{ color:iosC.accent }}>Field</em> — operações à mão de quem está na porta.
      </div>
      <div style={{ fontSize:17, lineHeight:1.5, color:'rgba(60,50,40,0.65)', marginTop:18, maxWidth:720 }}>
        Companion mobile para agentes de front desk, equipes de limpeza e gerentes de operação.
        Foca em ações de campo — receber hóspedes, fechar tarefas, responder mensagens — com o
        design system terracota do Aja PMS adaptado para iOS 26.
      </div>
      <div style={{ display:'flex', gap:24, marginTop:28 }}>
        {[
          { k:'11', v:'telas' },
          { k:'5', v:'abas principais' },
          { k:'PT-BR', v:'localização' },
          { k:'iOS 26', v:'guideline' },
        ].map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <div style={{ fontFamily:'Instrument Serif, serif', fontSize:32, color:'#2a2420', letterSpacing:-0.6 }}>{s.k}</div>
            <div style={{ fontSize:13, color:'rgba(60,50,40,0.55)' }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>

    {/* SECTION 1: Entry */}
    <DCSection title="Entrada" subtitle="Primeiro contato com o app — identidade de marca e autenticação biométrica.">
      <PhoneFrame showTabBar={false} label={{ n:'01', t:'Boas-vindas & login', sub:'Face ID · senha' }}>
        <ScLogin/>
      </PhoneFrame>
    </DCSection>

    {/* SECTION 2: Daily flow — Today → Reservations → Detail → Check-in */}
    <DCSection title="Fluxo diário" subtitle="Do overview do dia ao check-in presencial — caminho mais percorrido por front-desk.">
      <PhoneFrame active="today" label={{ n:'02', t:'Hoje', sub:'home' }}>
        <ScToday/>
      </PhoneFrame>
      <FlowArrow label="ver reservas"/>
      <PhoneFrame active="res" label={{ n:'03', t:'Reservas' }}>
        <ScResList/>
      </PhoneFrame>
      <FlowArrow label="tocar em hóspede"/>
      <PhoneFrame active="res" label={{ n:'04', t:'Detalhe da reserva', sub:'pendências · hóspede · estadia' }}>
        <ScResDetail/>
      </PhoneFrame>
      <FlowArrow label="iniciar check-in"/>
      <PhoneFrame showTabBar={false} label={{ n:'05', t:'Check-in — captura de documento', sub:'2 de 4' }}>
        <ScCheckIn/>
      </PhoneFrame>
    </DCSection>

    {/* SECTION 3: Calendar */}
    <DCSection title="Calendário & planejamento">
      <PhoneFrame active="res" label={{ n:'06', t:'Calendário', sub:'visão mensal' }}>
        <ScCalendar/>
      </PhoneFrame>
      <DCPostIt top={-20} left={420} rotate={-3} width={220}>
        Pontinhos são chegadas (terracota), saídas (âmbar) e bloqueios (vermelho). Toque no dia abre a lista.
      </DCPostIt>
    </DCSection>

    {/* SECTION 4: Operations — Tasks */}
    <DCSection title="Operações" subtitle="Fila de limpeza e manutenção para equipes em campo — progresso e checklists.">
      <PhoneFrame active="tasks" label={{ n:'07', t:'Tarefas — minha fila' }}>
        <ScTasks/>
      </PhoneFrame>
      <FlowArrow label="abrir tarefa"/>
      <PhoneFrame active="tasks" label={{ n:'08', t:'Detalhe da tarefa', sub:'checklist · foto · reatribuir' }}>
        <ScTaskDetail/>
      </PhoneFrame>
    </DCSection>

    {/* SECTION 5: Communication */}
    <DCSection title="Comunicação com hóspede" subtitle="Inbox unificado — Airbnb, Booking, WhatsApp e direto — com respostas sugeridas.">
      <PhoneFrame active="chat" label={{ n:'09', t:'Mensagens', sub:'inbox unificado' }}>
        <ScMessages/>
      </PhoneFrame>
      <FlowArrow label="abrir conversa"/>
      <PhoneFrame active="chat" showTabBar={false} label={{ n:'10', t:'Conversa', sub:'contexto da reserva + AI' }}>
        <ScChat/>
      </PhoneFrame>
    </DCSection>

    {/* SECTION 6: Account */}
    <DCSection title="Conta & organização" subtitle="Troca rápida entre tenants para gerentes que operam várias marcas.">
      <PhoneFrame active="more" label={{ n:'11', t:'Mais — perfil & tenant switcher' }}>
        <ScSettings/>
      </PhoneFrame>
      <DCPostIt top={60} left={420} rotate={2} width={240}>
        Permissão, idioma e fuso são herdados do tenant ativo — troca de contexto com um toque.
      </DCPostIt>
    </DCSection>

    <div style={{ height:80 }}/>
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
