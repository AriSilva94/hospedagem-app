// Staff mobile app — cleaners & maintenance on the go
const MobileStaff = {};

const sfText = '#000';
const sfMuted = 'rgba(60,60,67,0.6)';
const sfSep = 'rgba(60,60,67,0.12)';
const sfBg = '#F2F2F7';
const sfCard = '#fff';
const aja = 'oklch(0.58 0.14 40)';
const ajaSoft = 'oklch(0.94 0.035 40)';
const ajaInk = 'oklch(0.32 0.10 40)';
const sage = 'oklch(0.58 0.07 150)';
const amber = 'oklch(0.65 0.13 75)';

// Brand topbar replacing native nav (keeps status bar)
const StaffHead = ({ title, subtitle, right, back }) => (
  <div style={{
    paddingTop: 54, paddingBottom: 12, padding: '54px 20px 12px',
    background: sfBg, position: 'relative',
  }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 4 }}>
      <div>
        {subtitle && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: aja }}>{subtitle}</div>}
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: sfText, lineHeight: 1.1, marginTop: 2 }}>{title}</div>
      </div>
      {right}
    </div>
  </div>
);

// Segmented pill control
const Segmented = ({ items, active }) => (
  <div style={{
    margin: '8px 20px 16px', padding: 3, background: 'rgba(118,118,128,0.12)',
    borderRadius: 9, display: 'flex', gap: 2,
  }}>
    {items.map(i => (
      <div key={i.id} style={{
        flex: 1, textAlign: 'center', padding: '7px 0',
        borderRadius: 7, fontSize: 13, fontWeight: 600, letterSpacing: -0.08,
        color: active === i.id ? sfText : sfMuted,
        background: active === i.id ? '#fff' : 'transparent',
        boxShadow: active === i.id ? '0 3px 8px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.04)' : 'none',
      }}>
        {i.label}
        {i.count != null && (
          <span style={{ marginLeft: 6, fontSize: 11, opacity: .7 }}>{i.count}</span>
        )}
      </div>
    ))}
  </div>
);

// Task card for list
const TaskCard = ({ task, unit, dense, isFirst, isLast }) => {
  const isCleaning = task.type === 'cleaning';
  const priColor = task.priority === 'high' ? 'oklch(0.58 0.14 25)' : task.priority === 'medium' ? amber : sfMuted;
  const priLabel = task.priority === 'high' ? 'Urgente' : task.priority === 'medium' ? 'Média' : 'Baixa';
  const time = task.due.slice(11, 16);
  const done = task.checklist.filter(c => c.d).length;
  const total = task.checklist.length;
  const pct = Math.round(done / total * 100);
  return (
    <div style={{
      padding: '14px 16px', borderBottom: isLast ? 'none' : `0.5px solid ${sfSep}`,
      background: '#fff',
      borderTopLeftRadius: isFirst ? 14 : 0, borderTopRightRadius: isFirst ? 14 : 0,
      borderBottomLeftRadius: isLast ? 14 : 0, borderBottomRightRadius: isLast ? 14 : 0,
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 11, flexShrink: 0,
          background: isCleaning ? 'oklch(0.94 0.03 200)' : 'oklch(0.94 0.03 290)',
          color: isCleaning ? 'oklch(0.38 0.08 220)' : 'oklch(0.38 0.08 290)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isCleaning ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7M9 4h6v3H9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a4 4 0 00-5.7 5.7L3 18l3 3 6-6a4 4 0 005.7-5.7L15 12l-3-3 2.7-2.7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 3 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: priColor, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {priLabel}
            </div>
            <div style={{ fontSize: 11, color: sfMuted }}>· {time}</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: sfText, letterSpacing: -0.2, marginBottom: 4, lineHeight: 1.25 }}>
            {task.title}
          </div>
          <div style={{ fontSize: 13, color: sfMuted, letterSpacing: -0.08, marginBottom: 10 }}>
            {unit?.name}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{ flex:1, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.06)' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: aja, borderRadius: 2 }}/>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: sfMuted, minWidth: 32, textAlign: 'right' }}>
              {done}/{total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 1: Today's list
const StaffTodayScreen = () => {
  const myTasks = TASKS.filter(t => t.assignee === 'Fernanda R.' || t.assignee === 'Carlos M.').slice(0, 5);
  const todoCount = myTasks.filter(t => t.status === 'todo').length;
  const progCount = myTasks.filter(t => t.status === 'in_progress').length;
  return (
    <div style={{ background: sfBg, minHeight: '100%', paddingBottom: 90 }}>
      <StaffHead
        subtitle="17 abr · quinta"
        title="Minhas tarefas"
        right={
          <div style={{ width: 40, height: 40, borderRadius: 20, background: 'oklch(0.88 0.05 40)', color: ajaInk, display:'flex', alignItems:'center', justifyContent:'center', fontSize: 14, fontWeight: 700 }}>FR</div>
        }
      />
      {/* Summary row */}
      <div style={{ display:'flex', gap: 10, padding: '0 20px 12px' }}>
        <div style={{ flex:1, background: '#fff', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: sfText, lineHeight: 1 }}>{todoCount}</div>
          <div style={{ fontSize: 12, color: sfMuted, marginTop: 4 }}>Pendentes</div>
        </div>
        <div style={{ flex:1, background: '#fff', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: amber, lineHeight: 1 }}>{progCount}</div>
          <div style={{ fontSize: 12, color: sfMuted, marginTop: 4 }}>Em andamento</div>
        </div>
        <div style={{ flex:1, background: '#fff', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: sage, lineHeight: 1 }}>2</div>
          <div style={{ fontSize: 12, color: sfMuted, marginTop: 4 }}>Concluídas</div>
        </div>
      </div>
      <Segmented active="hoje" items={[
        { id: 'hoje', label: 'Hoje', count: myTasks.length },
        { id: 'amanha', label: 'Amanhã', count: 3 },
        { id: 'semana', label: 'Semana', count: 11 },
      ]}/>
      {/* Task list */}
      <div style={{ margin: '0 16px', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {myTasks.map((task, i) => {
          const unit = UNITS.find(u => u.id === task.unitId);
          return <TaskCard key={task.id} task={task} unit={unit} isFirst={i===0} isLast={i===myTasks.length-1}/>;
        })}
      </div>
    </div>
  );
};

// Screen 2: Task detail
const StaffTaskDetailScreen = () => {
  const task = TASKS.find(t => t.id === 't1');
  const unit = UNITS.find(u => u.id === task.unitId);
  const prop = PROPERTIES.find(p => p.id === unit?.propertyId);
  return (
    <div style={{ background: sfBg, minHeight: '100%', paddingBottom: 90 }}>
      {/* Back + actions */}
      <div style={{ paddingTop: 54, padding: '54px 16px 8px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 4, color: aja, fontSize: 17, fontWeight: 500 }}>
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none"><path d="M9 1L2 9l7 8" stroke={aja} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Voltar
        </div>
        <div style={{ color: aja, fontSize: 17, fontWeight: 500 }}>Chat</div>
      </div>
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display:'inline-flex', padding: '4px 10px', background: 'oklch(0.94 0.03 200)', color: 'oklch(0.38 0.08 220)', borderRadius: 99, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
          Limpeza · Urgente
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, color: sfText, lineHeight: 1.15, marginTop: 8 }}>
          {task.title}
        </div>
      </div>
      {/* Unit card */}
      <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 14, padding: 14, display:'flex', alignItems:'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, oklch(0.85 0.08 ${prop?.coverHue||40}), oklch(0.70 0.10 ${prop?.coverHue||40}))`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l9-6 9 6v11" stroke="#fff" strokeOpacity=".85" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 21V14h4v7" stroke="#fff" strokeOpacity=".85" strokeWidth="1.8"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: sfText }}>{unit?.name}</div>
          <div style={{ fontSize: 13, color: sfMuted }}>{prop?.neighborhood} · Check-out 11:00</div>
        </div>
        <div style={{ padding: '6px 10px', borderRadius: 8, background: ajaSoft, color: ajaInk, fontSize: 12, fontWeight: 600 }}>
          Rota
        </div>
      </div>

      {/* Checklist header */}
      <div style={{ padding: '8px 20px 6px', fontSize: 13, color: sfMuted, fontWeight: 600, letterSpacing: '.02em', textTransform: 'uppercase' }}>Checklist</div>
      <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        {task.checklist.map((c, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap: 12, padding: '14px 16px',
            borderBottom: i < task.checklist.length-1 ? `0.5px solid ${sfSep}` : 'none',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12,
              background: c.d ? sage : 'transparent',
              border: c.d ? 'none' : '2px solid rgba(0,0,0,0.18)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
            }}>
              {c.d && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <div style={{ flex: 1, fontSize: 16, color: c.d ? sfMuted : sfText, textDecoration: c.d ? 'line-through' : 'none', letterSpacing: -0.2 }}>
              {c.t}
            </div>
            {i === 1 && (
              <div style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.05)', fontSize: 11, color: sfMuted, fontWeight: 500 }}>+ foto</div>
            )}
          </div>
        ))}
      </div>

      {/* Notes card */}
      <div style={{ margin: '0 16px 20px' }}>
        <div style={{ fontSize: 13, color: sfMuted, fontWeight: 600, letterSpacing: '.02em', textTransform: 'uppercase', padding: '0 4px 6px' }}>Observações da reserva</div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 14, color: sfText, lineHeight: 1.45, letterSpacing: -0.1 }}>
            Hóspede <b>João Pedro</b> saiu hoje 11:00. Próximo check-in <b>Mariana A.</b> às 15:30 — prioridade alta, suíte master.
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 34px',
        background: 'linear-gradient(to top, #F2F2F7 70%, rgba(242,242,247,0))',
      }}>
        <div style={{
          background: aja, color: '#fff', borderRadius: 14,
          padding: '16px 0', textAlign: 'center',
          fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
          boxShadow: '0 8px 20px oklch(0.58 0.14 40 / 0.3)',
        }}>
          Iniciar tarefa
        </div>
      </div>
    </div>
  );
};

// Screen 3: In-progress / photo capture
const StaffInProgressScreen = () => {
  const task = TASKS.find(t => t.id === 't4'); // has some items done
  const unit = UNITS.find(u => u.id === task.unitId);
  const done = task.checklist.filter(c => c.d).length;
  return (
    <div style={{ background: sfBg, minHeight: '100%', paddingBottom: 90 }}>
      <div style={{ paddingTop: 54, padding: '54px 16px 8px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 4, color: aja, fontSize: 17, fontWeight: 500 }}>
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none"><path d="M9 1L2 9l7 8" stroke={aja} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Minhas tarefas
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 6, color: amber, fontSize: 13, fontWeight: 600 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: amber }}/>
          Em andamento · 00:18
        </div>
      </div>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4, color: sfText, lineHeight: 1.15 }}>
          {task.title}
        </div>
        <div style={{ fontSize: 14, color: sfMuted, marginTop: 2 }}>{unit?.name}</div>
      </div>

      {/* Photo capture row */}
      <div style={{ margin: '0 16px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <div style={{ aspectRatio: '1/1', borderRadius: 12, background: 'linear-gradient(135deg, oklch(0.82 0.08 40), oklch(0.68 0.10 40))', position: 'relative' }}>
          <div style={{ position:'absolute', bottom: 6, left: 8, fontSize: 10, color: '#fff', fontWeight: 600 }}>Antes · sala</div>
        </div>
        <div style={{ aspectRatio: '1/1', borderRadius: 12, background: 'linear-gradient(135deg, oklch(0.82 0.08 200), oklch(0.68 0.10 200))', position: 'relative' }}>
          <div style={{ position:'absolute', bottom: 6, left: 8, fontSize: 10, color: '#fff', fontWeight: 600 }}>Antes · cozinha</div>
        </div>
        <div style={{ aspectRatio: '1/1', borderRadius: 12, background: 'rgba(0,0,0,0.04)', border: '2px dashed rgba(0,0,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" stroke={sfMuted} strokeWidth="1.6"/><circle cx="12" cy="13" r="3.5" stroke={sfMuted} strokeWidth="1.6"/></svg>
          <div style={{ fontSize: 10, color: sfMuted, fontWeight: 500 }}>+ foto</div>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ padding: '4px 20px 8px', fontSize: 13, color: sfMuted, fontWeight: 600, letterSpacing: '.02em', textTransform: 'uppercase', display:'flex', justifyContent:'space-between' }}>
        <span>Checklist</span>
        <span>{done}/{task.checklist.length}</span>
      </div>
      <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        {task.checklist.map((c, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap: 12, padding: '14px 16px',
            borderBottom: i < task.checklist.length-1 ? `0.5px solid ${sfSep}` : 'none',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12,
              background: c.d ? sage : 'transparent',
              border: c.d ? 'none' : '2px solid rgba(0,0,0,0.18)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
            }}>
              {c.d && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <div style={{ flex: 1, fontSize: 16, color: c.d ? sfMuted : sfText, textDecoration: c.d ? 'line-through' : 'none' }}>
              {c.t}
            </div>
          </div>
        ))}
      </div>

      {/* Report issue card */}
      <div style={{ margin: '0 16px' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'oklch(0.94 0.04 25)', color: 'oklch(0.48 0.14 25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 20h20L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 10v4M12 17v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: sfText }}>Reportar problema</div>
            <div style={{ fontSize: 12, color: sfMuted }}>Dano, falta de item, emergência</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="rgba(60,60,67,0.3)" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Fixed CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 34px',
        background: 'linear-gradient(to top, #F2F2F7 70%, rgba(242,242,247,0))',
      }}>
        <div style={{ background: sage, color: '#fff', borderRadius: 14, padding: '16px 0', textAlign: 'center', fontSize: 17, fontWeight: 600 }}>
          Marcar como concluída
        </div>
      </div>
    </div>
  );
};

// Screen 4: Done confirmation
const StaffDoneScreen = () => (
  <div style={{ background: sfBg, minHeight: '100%', paddingTop: 54, display:'flex', flexDirection:'column', alignItems:'center', padding: '54px 24px 40px', textAlign:'center' }}>
    <div style={{ marginTop: 60, width: 96, height: 96, borderRadius: 48, background: 'oklch(0.94 0.05 150)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width="48" height="44" viewBox="0 0 48 44" fill="none"><path d="M4 22l14 14L44 8" stroke={sage} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: sfText, marginTop: 24 }}>Tudo certo!</div>
    <div style={{ fontSize: 15, color: sfMuted, marginTop: 8, lineHeight: 1.45, maxWidth: 280 }}>
      Tarefa concluída em <b>00:42</b>. Ana foi notificada.
    </div>
    {/* Summary */}
    <div style={{ alignSelf: 'stretch', marginTop: 28, background:'#fff', borderRadius: 14, padding: '4px 0' }}>
      {[
        ['Unidade', 'Mole 301'],
        ['Reserva', 'AJA-1018'],
        ['Itens', '4 de 4'],
        ['Fotos', '5 adicionadas'],
      ].map(([l,v], i, arr) => (
        <div key={l} style={{
          display:'flex', justifyContent:'space-between', padding: '14px 16px',
          borderBottom: i < arr.length-1 ? `0.5px solid ${sfSep}` : 'none',
          textAlign: 'left',
        }}>
          <span style={{ color: sfMuted, fontSize: 15 }}>{l}</span>
          <span style={{ color: sfText, fontSize: 15, fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </div>
    <div style={{ alignSelf:'stretch', marginTop: 24, background: aja, color: '#fff', borderRadius: 14, padding: '16px 0', fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>
      Próxima tarefa · 14:00
    </div>
    <div style={{ alignSelf:'stretch', marginTop: 10, color: aja, padding: '12px 0', fontSize: 15, fontWeight: 500 }}>
      Voltar para minhas tarefas
    </div>
  </div>
);

// Tab bar overlay
const StaffTabBar = () => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingBottom: 28, background: 'rgba(249,249,249,0.88)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderTop: '0.5px solid rgba(0,0,0,0.1)',
    display: 'flex', justifyContent: 'space-around', paddingTop: 8, zIndex: 30,
  }}>
    {[
      { l: 'Hoje', a: true, ic: <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM4 9h16" stroke="currentColor" strokeWidth="1.8"/> },
      { l: 'Agenda', ic: <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/> },
      { l: 'Concluídas', ic: <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> },
      { l: 'Perfil', ic: <><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.8"/></> },
    ].map(t => (
      <div key={t.l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 3, color: t.a ? aja : sfMuted }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">{t.ic}</svg>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.08 }}>{t.l}</div>
      </div>
    ))}
  </div>
);

Object.assign(window, { StaffTodayScreen, StaffTaskDetailScreen, StaffInProgressScreen, StaffDoneScreen, StaffTabBar });
