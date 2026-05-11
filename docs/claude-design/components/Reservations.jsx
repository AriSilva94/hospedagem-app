// Reservations list + detail drawer
const Reservations = ({ t, lang, perms, onOpenRes, onNewRes }) => {
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [propFilter, setPropFilter] = React.useState('all');

  const filtered = RESERVATIONS.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (propFilter !== 'all' && r.propertyId !== propFilter) return false;
    if (query) {
      const g = GUESTS.find(x => x.id === r.guestId);
      const hay = `${r.code} ${g.name} ${g.email}`.toLowerCase();
      if (!hay.includes(query.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('reservations')}
            <span className="count">{filtered.length} de {RESERVATIONS.length}</span>
          </h1>
          <div className="page-subtitle">Todas as reservas no tenant · escopo automaticamente isolado.</div>
        </div>
        <div className="row gap-2">
          <button className="btn"><Icon name="download" size={14}/>Exportar</button>
          <button className="btn primary" onClick={onNewRes}><Icon name="plus" size={14}/>{t('new_reservation')}</button>
        </div>
      </div>

      <div className="toolbar">
        <div className="field-search">
          <Icon name="search" size={14}/>
          <input placeholder="Buscar por código, hóspede ou email..." value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>
        <Select value={statusFilter} onChange={setStatusFilter} options={[
          { v: 'all', l: 'Todos status' },
          { v: 'arriving_today', l: 'Check-in hoje' },
          { v: 'departing_today', l: 'Check-out hoje' },
          { v: 'in_house', l: 'Hospedado' },
          { v: 'confirmed', l: 'Confirmada' },
          { v: 'tentative', l: 'Tentativa' },
          { v: 'completed', l: 'Concluída' },
        ]}/>
        <Select value={propFilter} onChange={setPropFilter} options={[
          { v: 'all', l: 'Todos imóveis' },
          ...PROPERTIES.map(p => ({ v: p.id, l: p.name }))
        ]}/>
        <button className="btn"><Icon name="filter" size={14}/>Mais filtros</button>
        <div className="spacer"/>
        <div className="seg">
          <button className="active">Lista</button>
          <button>Cartões</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}><input type="checkbox"/></th>
              <th>Código</th>
              <th>Hóspede</th>
              <th>Unidade</th>
              <th>Datas</th>
              <th>Noites</th>
              <th>Status</th>
              <th>Origem</th>
              <th style={{ textAlign: 'right' }}>Total</th>
              <th style={{ width: 36 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const g = GUESTS.find(x => x.id === r.guestId);
              const u = UNITS.find(x => x.id === r.unitId);
              return (
                <tr key={r.id} onClick={() => onOpenRes(r)} className="clickable">
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox"/></td>
                  <td><span className="mono" style={{ fontWeight: 600 }}>{r.code}</span></td>
                  <td>
                    <div className="row gap-2" style={{ alignItems: 'center' }}>
                      <Avatar name={g.name} size={24}/>
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <div style={{ fontWeight: 500, lineHeight: 1.25 }}>{g.name}</div>
                        <div className="muted" style={{ fontSize: 11.5, lineHeight: 1.2 }}>{r.guests} {r.guests>1?'hóspedes':'hóspede'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{u.name}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>
                      {PROPERTIES.find(p=>p.id===r.propertyId).neighborhood}
                    </div>
                  </td>
                  <td>
                    <div className="mono" style={{ fontSize: 12.5 }}>
                      {fmtDate(r.checkIn, {short: true, lang})} → {fmtDate(r.checkOut, {short: true, lang})}
                    </div>
                  </td>
                  <td className="mono">{nightsBetween(r.checkIn, r.checkOut)}</td>
                  <td><StatusPill status={r.status} t={t}/></td>
                  <td><span className="source-chip">{r.source}</span></td>
                  <td style={{ textAlign: 'right' }} className="mono tnum">R$ {r.total.toLocaleString('pt-BR')}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="btn ghost icon sm"><Icon name="dots" size={14}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Select = ({ value, onChange, options }) => (
  <select className="field" style={{ width: 'auto', paddingRight: 28 }}
    value={value} onChange={e => onChange(e.target.value)}>
    {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);

// Reservation detail drawer
const ReservationDrawer = ({ res, onClose, t, lang, onCheckIn }) => {
  if (!res) return null;
  const g = GUESTS.find(x => x.id === res.guestId);
  const u = UNITS.find(x => x.id === res.unitId);
  const p = PROPERTIES.find(x => x.id === res.propertyId);
  const relatedTasks = TASKS.filter(tk => tk.reservationId === res.id);
  const nights = nightsBetween(res.checkIn, res.checkOut);
  const push = useToast();

  const canCheckIn = res.status === 'arriving_today' && res.pending.length === 0;

  return (
    <div className="drawer-scrim" onClick={onClose}>
      <aside className="drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div className="row gap-3">
            <button className="btn ghost icon" onClick={onClose}><Icon name="x" size={16}/></button>
            <div>
              <div className="row gap-2">
                <span className="mono" style={{ fontWeight: 600 }}>{res.code}</span>
                <StatusPill status={res.status} t={t}/>
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                Criada há 4 dias · origem {res.source}
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <button className="btn ghost icon"><Icon name="copy" size={14}/></button>
            <button className="btn"><Icon name="msg" size={14}/>Mensagem</button>
            <button className="btn"><Icon name="file" size={14}/>Contrato</button>
            {canCheckIn && <button className="btn primary" onClick={() => onCheckIn(res)}>
              <Icon name="key" size={14}/>{t('mark_checked_in')}
            </button>}
            {res.pending.length > 0 && res.status === 'arriving_today' && (
              <button className="btn primary" onClick={() => onCheckIn(res)}>
                <Icon name="key" size={14}/>Iniciar check-in
              </button>
            )}
          </div>
        </div>

        <div className="drawer-body">
          {/* Summary */}
          <section>
            <div className="summary-grid">
              <div>
                <div className="label">Hóspede</div>
                <div className="row gap-2" style={{ marginTop: 6 }}>
                  <Avatar name={g.name} size={32}/>
                  <div>
                    <div style={{ fontWeight: 600 }}>{g.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{g.email} · {g.phone}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="label">Unidade</div>
                <div style={{ fontWeight: 600, marginTop: 6 }}>{u.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.name} · {p.neighborhood}</div>
              </div>
              <div>
                <div className="label">Datas</div>
                <div style={{ fontWeight: 600, marginTop: 6 }}>
                  {fmtDate(res.checkIn, {lang})} → {fmtDate(res.checkOut, {lang})}
                </div>
                <div className="muted" style={{ fontSize: 12 }}>{nights} {t('nights')} · {res.guests} hóspedes</div>
              </div>
              <div>
                <div className="label">Total</div>
                <div className="serif" style={{ fontSize: 24, marginTop: 2 }}>R$ {res.total.toLocaleString('pt-BR')}</div>
                <div className="muted" style={{ fontSize: 12 }}>R$ {Math.round(res.total/nights).toLocaleString('pt-BR')} / noite</div>
              </div>
            </div>
          </section>

          {res.pending.length > 0 && (
            <section>
              <div className="pending-banner">
                <Icon name="alert" size={16}/>
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>Pendências antes do check-in</div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    {res.pending.map(p => p === 'contract' ? 'Contrato não assinado' : p === 'id' ? 'Documento do hóspede' : p).join(' · ')}
                  </div>
                </div>
                <button className="btn sm">Resolver</button>
              </div>
            </section>
          )}

          {/* Tabs */}
          <section>
            <div className="section-title">Linha do tempo</div>
            <div className="timeline-mini">
              <TL dot="ok" title="Reserva confirmada" when="13 abr · 14:22" who="Ana O."/>
              <TL dot="ok" title="Contrato gerado" when="13 abr · 14:30" who="Sistema"/>
              {res.contractStatus === 'signed' && <TL dot="ok" title="Contrato assinado" when="14 abr · 09:10" who={g.name}/>}
              <TL dot="slate" title="Mensagem pré-chegada enviada" when="16 abr · 08:00" who="Template · boas-vindas"/>
              {res.status === 'arriving_today' && <TL dot="accent" title="Check-in agendado" when={`hoje · ${res.eta}`} who="ETA do hóspede"/>}
            </div>
          </section>

          <section>
            <div className="section-title">Tarefas relacionadas</div>
            {relatedTasks.length === 0 ? (
              <div className="muted" style={{ fontSize: 13 }}>Nenhuma tarefa vinculada.</div>
            ) : (
              <div className="col gap-2">
                {relatedTasks.map(tk => (
                  <div key={tk.id} className="related-task">
                    <div className={`related-icon ${tk.type}`}>
                      <Icon name={tk.type === 'cleaning' ? 'broom' : 'wrench'} size={13}/>
                    </div>
                    <div className="grow">
                      <div style={{ fontWeight: 500 }}>{tk.title}</div>
                      <div className="muted" style={{ fontSize: 11.5 }}>
                        {tk.assignee} · vence {tk.due.slice(11,16)}
                      </div>
                    </div>
                    <Pill variant={tk.status === 'done' ? 'ok' : tk.status === 'in_progress' ? 'accent' : 'slate'}>
                      {tk.status === 'done' ? 'Concluída' : tk.status === 'in_progress' ? 'Em andamento' : 'A fazer'}
                    </Pill>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="section-title">Comunicação</div>
            <div className="msg-composer">
              <div className="row gap-2" style={{ marginBottom: 8 }}>
                <Select value="welcome" onChange={()=>{}} options={[
                  { v: 'welcome', l: 'Template · Boas-vindas' },
                  { v: 'checkin', l: 'Template · Instruções de check-in' },
                  { v: 'post', l: 'Template · Pós check-out' },
                ]}/>
                <div className="muted" style={{ fontSize: 12 }}>Variáveis: {'{{guest_name}}'}, {'{{unit_name}}'}, {'{{checkin_date}}'}</div>
              </div>
              <textarea className="field" rows={3} defaultValue={`Olá ${g.name.split(' ')[0]}! Sua estadia em ${u.name} começa em breve. Enviaremos as instruções de acesso 2h antes do seu ETA (${res.eta || '15:00'}). Qualquer coisa, é só responder aqui.`}/>
              <div className="row gap-2" style={{ marginTop: 8, justifyContent: 'flex-end' }}>
                <button className="btn sm">Agendar</button>
                <button className="btn sm primary" onClick={() => push('Mensagem enviada', { icon: 'check' })}>
                  <Icon name="msg" size={13}/>Enviar agora
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="section-title">Notas internas</div>
            <textarea className="field" rows={2} placeholder="Nota visível apenas para a equipe..."
              defaultValue={res.id === 'r1030' ? 'Família com duas crianças — preparar cama extra e kit infantil.' : ''}/>
          </section>
        </div>
      </aside>
    </div>
  );
};

const TL = ({ dot, title, when, who }) => (
  <div className="tl-mini-row">
    <div className={`tl-mini-dot ${dot}`}/>
    <div className="grow">
      <div style={{ fontWeight: 500, fontSize: 13 }}>{title}</div>
      <div className="muted" style={{ fontSize: 11.5 }}>{when} · {who}</div>
    </div>
  </div>
);

Object.assign(window, { Reservations, ReservationDrawer, Select });
