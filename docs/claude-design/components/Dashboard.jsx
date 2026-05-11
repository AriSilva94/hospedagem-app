// Dashboard — Admin view with KPIs, today's timeline, alerts, activity
const Dashboard = ({ t, lang, role, perms, setRoute, onOpenRes }) => {
  const todayArrivals = RESERVATIONS.filter(r => r.status === 'arriving_today');
  const todayDepartures = RESERVATIONS.filter(r => r.status === 'departing_today');
  const inHouse = RESERVATIONS.filter(r => r.status === 'in_house');
  const openTasks = TASKS.filter(tk => tk.status !== 'done');

  const totalUnits = UNITS.filter(u => u.status === 'active').length;
  const occupied = inHouse.length + todayDepartures.length;
  const occupancy = Math.round((occupied / totalUnits) * 100);

  const kpis = [
    { id: 'occ', label: t('occupancy'), value: `${occupancy}%`, sub: `${occupied} de ${totalUnits} unidades`, trend: '+4.2 vs semana anterior', trendOk: true, icon: 'building' },
    { id: 'arr', label: t('arrivals'), value: todayArrivals.length, sub: 'próximas 24h', trend: `${todayArrivals.filter(r=>r.pending.length).length} com pendências`, trendOk: false, icon: 'arrow_r', route: 'stays' },
    { id: 'dep', label: t('departures'), value: todayDepartures.length, sub: 'até 12:00', trend: `${todayDepartures.filter(r=>r.pending.length).length} relatórios pendentes`, trendOk: true, icon: 'arrow_l', route: 'stays' },
    { id: 'tsk', label: t('open_tasks'), value: openTasks.length, sub: `${openTasks.filter(x=>x.priority==='high').length} alta prioridade`, trend: '3 atrasadas', trendOk: false, icon: 'tool', route: 'maintenance' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="muted" style={{ fontSize: 12.5, fontWeight: 500 }}>
            {t('welcome')}, Ana · sexta, 17 de abril
          </div>
          <h1 className="page-title">Mar & Sal está <span style={{ color: 'var(--accent)' }}>quase cheio</span> hoje.</h1>
        </div>
        <div className="row gap-2">
          <button className="btn">
            <Icon name="calendar" size={14}/>Hoje
          </button>
          <button className="btn">
            <Icon name="filter" size={14}/>Todos imóveis
          </button>
          <button className="btn">
            <Icon name="download" size={14}/>Exportar
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map(k => (
          <button key={k.id} className="kpi-card"
            onClick={() => k.route && setRoute(k.route)}>
            <div className="row gap-2" style={{ justifyContent: 'space-between' }}>
              <div className="label">{k.label}</div>
              <div className="kpi-icon"><Icon name={k.icon} size={13}/></div>
            </div>
            <div className="kpi-value serif">{k.value}</div>
            <div className="muted" style={{ fontSize: 12 }}>{k.sub}</div>
            <div className="kpi-trend" style={{ color: k.trendOk ? 'var(--ok-ink)' : 'var(--warn-ink)' }}>
              <span className="dot" style={{ width:5, height:5, borderRadius:'50%', background:'currentColor', display:'inline-block', marginRight:6 }}/>
              {k.trend}
            </div>
          </button>
        ))}
      </div>

      <div className="dash-grid">
        {/* Today's timeline */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-head">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t('todays_timeline')}</div>
              <div className="muted" style={{ fontSize: 12 }}>Chegadas, partidas e tarefas de hoje</div>
            </div>
            <div className="row gap-2">
              <button className="btn sm">Ver calendário</button>
            </div>
          </div>
          <Timeline lang={lang} onOpenRes={onOpenRes} />
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="card-head">
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t('alerts')}</div>
            <Pill variant="err">3</Pill>
          </div>
          <div className="alerts">
            <AlertRow icon="alert" variant="err"
              title="Contrato não assinado"
              desc="AJA-1025 · Helena Brandão · check-in em 3h"
              action="Enviar agora"/>
            <AlertRow icon="tool" variant="warn"
              title="Unidade fora de operação"
              desc="Mole 202 — reserva AJA-1034 em 8 dias"
              action="Reatribuir"/>
            <AlertRow icon="clock" variant="warn"
              title="Check-out atrasado"
              desc="AJA-1019 · saiu às 10:30 previsto"
              action="Contatar hóspede"/>
            <AlertRow icon="msg" variant="slate"
              title="1 mensagem falhou no envio"
              desc="Template boas-vindas · AJA-1024"
              action="Retentar"/>
          </div>
        </div>

        {/* Activity */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-head">
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t('activity')}</div>
            <button className="btn ghost sm">Ver tudo</button>
          </div>
          <div className="activity">
            {ACTIVITY.map(a => (
              <div key={a.id} className="activity-row">
                <div className="activity-dot"/>
                <div className="grow">
                  <span style={{ fontWeight: 500 }}>{a.who}</span>
                  <span className="muted"> {a.text} </span>
                  <span style={{ fontWeight: 500, color: 'var(--accent-ink)' }}>{a.target}</span>
                </div>
                <div className="muted" style={{ fontSize: 11.5 }}>{a.at}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Source split */}
        <div className="card">
          <div className="card-head">
            <div style={{ fontWeight: 600, fontSize: 14 }}>Fontes · abril</div>
            <Pill>58 reservas</Pill>
          </div>
          <div className="source-list">
            <SourceRow name="Airbnb" value={28} pct={48} hue={5}/>
            <SourceRow name="Booking.com" value={17} pct={29} hue={240}/>
            <SourceRow name="Direto / site" value={11} pct={19} hue={40}/>
            <SourceRow name="Outros" value={2} pct={4} hue={180}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertRow = ({ icon, variant, title, desc, action }) => (
  <div className="alert-row">
    <div className={`alert-icon ${variant}`}><Icon name={icon} size={13}/></div>
    <div className="grow">
      <div style={{ fontWeight: 500, fontSize: 13 }}>{title}</div>
      <div className="muted" style={{ fontSize: 12 }}>{desc}</div>
    </div>
    <button className="btn sm ghost">{action}</button>
  </div>
);

const SourceRow = ({ name, value, pct, hue }) => (
  <div className="src-row">
    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
      <span className="mono muted" style={{ fontSize: 12 }}>{value} · {pct}%</span>
    </div>
    <div className="src-bar">
      <div className="src-fill" style={{ width: `${pct}%`, background: `oklch(0.68 0.12 ${hue})` }}/>
    </div>
  </div>
);

// Timeline — a compact timeline of today ordered by hour
const Timeline = ({ lang, onOpenRes }) => {
  const events = [];
  RESERVATIONS.filter(r => r.status === 'departing_today').forEach(r => {
    events.push({ type: 'departure', time: r.eta || '11:00', r });
  });
  TASKS.filter(tk => tk.due.startsWith('2026-04-17')).forEach(tk => {
    events.push({ type: 'task', time: tk.due.slice(11,16), tk });
  });
  RESERVATIONS.filter(r => r.status === 'arriving_today').forEach(r => {
    events.push({ type: 'arrival', time: r.eta || '15:00', r });
  });
  events.sort((a,b) => a.time.localeCompare(b.time));

  return (
    <div className="timeline">
      {events.map((ev, i) => (
        <div key={i} className="tl-row">
          <div className="tl-time mono">{ev.time}</div>
          <div className="tl-line"><div className={`tl-dot ${ev.type}`}/></div>
          <div className="tl-body">
            {ev.type === 'arrival' && (
              <button className="tl-card" onClick={() => onOpenRes(ev.r)}>
                <div className="row gap-3">
                  <div className={`tl-tag arrival`}>Chegada</div>
                  <div style={{ fontWeight: 600 }}>{GUESTS.find(g=>g.id===ev.r.guestId).name}</div>
                  <div className="muted">· {UNITS.find(u=>u.id===ev.r.unitId).name}</div>
                  {ev.r.pending.length > 0 &&
                    <Pill variant="warn" dot>{ev.r.pending.length} pendência{ev.r.pending.length>1?'s':''}</Pill>}
                </div>
                <Icon name="chevronR" size={14}/>
              </button>
            )}
            {ev.type === 'departure' && (
              <button className="tl-card" onClick={() => onOpenRes(ev.r)}>
                <div className="row gap-3">
                  <div className={`tl-tag departure`}>Partida</div>
                  <div style={{ fontWeight: 600 }}>{GUESTS.find(g=>g.id===ev.r.guestId).name}</div>
                  <div className="muted">· {UNITS.find(u=>u.id===ev.r.unitId).name}</div>
                </div>
                <Icon name="chevronR" size={14}/>
              </button>
            )}
            {ev.type === 'task' && (
              <div className="tl-card soft">
                <div className="row gap-3">
                  <div className={`tl-tag task ${ev.tk.type}`}>
                    {ev.tk.type === 'cleaning' ? 'Limpeza' : 'Manutenção'}
                  </div>
                  <div style={{ fontWeight: 500 }}>{ev.tk.title}</div>
                  <div className="muted">· {ev.tk.assignee}</div>
                </div>
                <Pill variant={ev.tk.status === 'in_progress' ? 'accent' : 'slate'}>
                  {ev.tk.status === 'in_progress' ? 'Em andamento' : 'A fazer'}
                </Pill>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { Dashboard });
