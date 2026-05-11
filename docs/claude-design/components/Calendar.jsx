// Calendar / Availability view — month grid with reservation bars per unit
const Calendar = ({ t, lang, onOpenRes }) => {
  const [cursor, setCursor] = React.useState({ y: 2026, m: 3 }); // April = 3
  const [propFilter, setPropFilter] = React.useState('all');

  const units = UNITS.filter(u => propFilter === 'all' || u.propertyId === propFilter);

  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'][cursor.m];

  const todayDay = 17;

  // For each unit, compute reservation bars in this month
  const resByUnit = {};
  RESERVATIONS.forEach(r => {
    if (!resByUnit[r.unitId]) resByUnit[r.unitId] = [];
    resByUnit[r.unitId].push(r);
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('calendar')}</h1>
          <div className="page-subtitle">Disponibilidade · arraste para criar reserva, clique em uma barra para abrir detalhes.</div>
        </div>
        <div className="row gap-2">
          <div className="seg">
            <button>{t('week')}</button>
            <button className="active">{t('month')}</button>
          </div>
          <button className="btn"><Icon name="plus" size={14}/>Bloqueio</button>
        </div>
      </div>

      <div className="toolbar">
        <button className="btn ghost icon"><Icon name="chevronL" size={16}/></button>
        <div style={{ fontWeight: 600, minWidth: 160, textAlign: 'center' }}>{monthName} {cursor.y}</div>
        <button className="btn ghost icon"><Icon name="chevronR" size={16}/></button>
        <button className="btn sm">Hoje</button>
        <div style={{ width: 12 }}/>
        <Select value={propFilter} onChange={setPropFilter} options={[
          { v: 'all', l: 'Todos os imóveis' },
          ...PROPERTIES.map(p => ({ v: p.id, l: p.name }))
        ]}/>
        <div className="spacer"/>
        <div className="legend">
          <LegendDot c="var(--accent)" label="Confirmada"/>
          <LegendDot c="var(--ok)" label="In-house"/>
          <LegendDot c="var(--warn)" label="Tentativa"/>
          <LegendDot c="var(--slate)" label="Concluída"/>
          <LegendDot c="var(--err)" label="Bloqueio"/>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cal-scroll">
          <div className="cal-grid" style={{ '--cols': daysInMonth }}>
            {/* Header row: unit label + day numbers */}
            <div className="cal-header-cell unit-col">Unidade</div>
            {days.map(d => {
              const date = new Date(cursor.y, cursor.m, d);
              const dow = date.getDay();
              const isWeekend = dow === 0 || dow === 6;
              const isToday = d === todayDay;
              return (
                <div key={d} className={`cal-header-cell day ${isWeekend?'weekend':''} ${isToday?'today':''}`}>
                  <div className="dow">{['D','S','T','Q','Q','S','S'][dow]}</div>
                  <div className="dnum">{d}</div>
                </div>
              );
            })}

            {/* Rows per unit */}
            {PROPERTIES.filter(p => propFilter === 'all' || p.id === propFilter).map(prop => (
              <React.Fragment key={prop.id}>
                <div className="cal-prop-row">
                  <div className="row gap-2">
                    <div className="prop-dot" style={{ background: `oklch(0.70 0.10 ${prop.coverHue})` }}/>
                    <span style={{ fontWeight: 600, fontSize: 12 }}>{prop.name}</span>
                    <span className="muted" style={{ fontSize: 11 }}>{prop.neighborhood}</span>
                  </div>
                </div>
                {UNITS.filter(u => u.propertyId === prop.id).map(u => (
                  <React.Fragment key={u.id}>
                    <div className="cal-unit-cell">
                      <div style={{ fontWeight: 500, fontSize: 12.5 }}>{u.name.replace(prop.name + ' — ', '')}</div>
                      <div className="muted" style={{ fontSize: 11 }}>
                        {u.capacity} hósp · {u.status === 'active' ? 'Ativa' : 'Fora de operação'}
                      </div>
                    </div>
                    <div className="cal-row-track" style={{ gridColumn: `span ${daysInMonth}` }}>
                      {days.map(d => (
                        <div key={d} className={`cal-cell ${d === todayDay ? 'today' : ''}`}/>
                      ))}
                      {u.status === 'out_of_service' && (
                        <div className="cal-bar oos" style={{ left: 0, width: '100%' }}>
                          <Icon name="tool" size={11}/> Fora de operação
                        </div>
                      )}
                      {(resByUnit[u.id] || []).map(r => {
                        const start = Math.max(1, new Date(r.checkIn).getDate());
                        const end = Math.min(daysInMonth, new Date(r.checkOut).getDate());
                        if (new Date(r.checkOut) < new Date(`${cursor.y}-${String(cursor.m+1).padStart(2,'0')}-01`)) return null;
                        if (new Date(r.checkIn) > new Date(`${cursor.y}-${String(cursor.m+1).padStart(2,'0')}-${daysInMonth}`)) return null;
                        const left = ((start - 1) / daysInMonth) * 100;
                        const width = ((end - start) / daysInMonth) * 100;
                        const g = GUESTS.find(x => x.id === r.guestId);
                        const variant = r.status === 'in_house' ? 'inhouse' :
                                        r.status === 'tentative' ? 'tentative' :
                                        r.status === 'completed' ? 'completed' :
                                        r.status === 'arriving_today' ? 'today' : 'confirmed';
                        return (
                          <button key={r.id} className={`cal-bar ${variant}`}
                            style={{ left: `${left}%`, width: `calc(${width}% - 2px)` }}
                            onClick={() => onOpenRes(r)}
                            title={`${g.name} · ${r.code}`}>
                            <span className="bar-name">{g.name.split(' ')[0]} {g.name.split(' ').slice(-1)[0]}</span>
                            <span className="bar-code mono">{r.code}</span>
                          </button>
                        );
                      })}
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({ c, label }) => (
  <div className="row gap-2">
    <div style={{ width: 10, height: 10, borderRadius: 3, background: c }}/>
    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{label}</span>
  </div>
);

Object.assign(window, { Calendar });
