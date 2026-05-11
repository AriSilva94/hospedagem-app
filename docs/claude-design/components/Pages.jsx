// Properties & Units, Maintenance Kanban, Settings
const Properties = ({ t, lang, perms }) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('properties')}<span className="count">{PROPERTIES.length} · {UNITS.length} unidades</span></h1>
          <div className="page-subtitle">Imóveis do tenant atual, unidades e regras de estadia.</div>
        </div>
        <div className="row gap-2">
          {perms.properties === true && <button className="btn primary"><Icon name="plus" size={14}/>Novo imóvel</button>}
        </div>
      </div>

      <div className="prop-grid">
        {PROPERTIES.map(p => {
          const units = UNITS.filter(u => u.propertyId === p.id);
          const active = units.filter(u => u.status === 'active').length;
          const occupied = RESERVATIONS.filter(r => r.propertyId === p.id && (r.status === 'in_house' || r.status === 'arriving_today')).length;
          return (
            <button key={p.id} className="prop-card" onClick={() => setSelected(p)}>
              <div className="prop-cover" style={{ background: `linear-gradient(135deg, oklch(0.85 0.08 ${p.coverHue}), oklch(0.70 0.10 ${p.coverHue}))` }}>
                <div className="prop-cover-inner">
                  <Icon name="building" size={36} style={{ color: 'rgba(255,255,255,.7)' }}/>
                </div>
                {p.status === 'out_of_service' && (
                  <div className="prop-badge"><Pill variant="err" dot>Fora de operação</Pill></div>
                )}
              </div>
              <div className="prop-body">
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>
                  <Icon name="pin" size={11}/> {p.neighborhood}
                </div>
                <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
                  <div>
                    <div className="mono" style={{ fontWeight: 600 }}>{active}<span className="muted">/{units.length}</span></div>
                    <div className="muted" style={{ fontSize: 11 }}>unidades ativas</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontWeight: 600 }}>{occupied}</div>
                    <div className="muted" style={{ fontSize: 11 }}>ocupadas hoje</div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <PropertyDrawer p={selected} onClose={() => setSelected(null)}/>}
    </div>
  );
};

const PropertyDrawer = ({ p, onClose }) => {
  const [tab, setTab] = React.useState('overview');
  const units = UNITS.filter(u => u.propertyId === p.id);
  return (
    <div className="drawer-scrim" onClick={onClose}>
      <aside className="drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div className="row gap-3">
            <button className="btn ghost icon" onClick={onClose}><Icon name="x" size={16}/></button>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{p.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>{p.neighborhood} · Florianópolis · GMT-3</div>
            </div>
          </div>
          <div className="row gap-2">
            <button className="btn"><Icon name="external" size={14}/>Site público</button>
            <button className="btn primary"><Icon name="plus" size={14}/>Nova unidade</button>
          </div>
        </div>

        <div className="tabs">
          {[{k:'overview',l:'Visão geral'},{k:'units',l:`Unidades (${units.length})`},{k:'policies',l:'Políticas'},{k:'media',l:'Mídia'},{k:'activity',l:'Atividade'}].map(tt => (
            <button key={tt.k} className={tab===tt.k?'active':''} onClick={()=>setTab(tt.k)}>{tt.l}</button>
          ))}
        </div>

        <div className="drawer-body">
          {tab === 'overview' && (
            <>
              <div className="placeholder-tile" style={{ height: 200 }}>imagem do imóvel — arraste aqui</div>
              <div className="summary-grid" style={{ marginTop: 18 }}>
                <div><div className="label">Endereço</div><div style={{ fontWeight: 500, marginTop: 4 }}>Rua das Gaivotas, 312<br/>{p.neighborhood}, Florianópolis/SC</div></div>
                <div><div className="label">Fuso horário</div><div style={{ fontWeight: 500, marginTop: 4 }}>America/Sao_Paulo<br/>GMT-3</div></div>
                <div><div className="label">Check-in / Check-out</div><div style={{ fontWeight: 500, marginTop: 4 }}>15:00 / 11:00</div></div>
                <div><div className="label">Contato local</div><div style={{ fontWeight: 500, marginTop: 4 }}>Fernanda R. · +55 48 9 9812-0011</div></div>
              </div>
            </>
          )}
          {tab === 'units' && (
            <div className="col gap-2">
              {units.map(u => {
                const activeRes = RESERVATIONS.find(r => r.unitId === u.id && (r.status === 'in_house' || r.status === 'arriving_today'));
                return (
                  <div key={u.id} className="unit-card">
                    <div className="grow">
                      <div className="row gap-2">
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                        {u.status === 'out_of_service' ? <Pill variant="err" dot>Fora de operação</Pill> : <Pill variant="ok" dot>Ativa</Pill>}
                      </div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                        {u.capacity} hóspedes · Wi-Fi · Ar-condicionado · Cozinha equipada
                      </div>
                    </div>
                    <div style={{ minWidth: 160 }}>
                      {activeRes ? (
                        <div>
                          <div className="muted" style={{ fontSize: 11 }}>Hospedado</div>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>
                            {GUESTS.find(g=>g.id===activeRes.guestId).name.split(' ')[0]}
                          </div>
                        </div>
                      ) : <span className="muted" style={{ fontSize: 12 }}>Livre</span>}
                    </div>
                    <button className="btn ghost icon"><Icon name="dots" size={14}/></button>
                  </div>
                );
              })}
            </div>
          )}
          {tab === 'policies' && (
            <div className="col gap-3">
              <div className="card" style={{ padding: 14 }}>
                <div style={{ fontWeight: 600 }}>Política de cancelamento</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>Reembolso integral até 7 dias antes do check-in. 50% entre 7 e 3 dias. Sem reembolso após 3 dias.</div>
              </div>
              <div className="card" style={{ padding: 14 }}>
                <div style={{ fontWeight: 600 }}>Regras da casa</div>
                <ul className="muted" style={{ fontSize: 13, marginTop: 6, paddingLeft: 18 }}>
                  <li>Não fumar</li><li>Festas não permitidas</li><li>Animais aceitos sob consulta</li><li>Silêncio após 22h</li>
                </ul>
              </div>
            </div>
          )}
          {tab === 'media' && (
            <div className="media-grid">
              {[0,1,2,3,4,5].map(i => <div key={i} className="placeholder-tile" style={{ height: 140 }}>foto_{i+1}.jpg</div>)}
            </div>
          )}
          {tab === 'activity' && (
            <div className="activity">
              {ACTIVITY.slice(0,4).map(a => (
                <div key={a.id} className="activity-row">
                  <div className="activity-dot"/>
                  <div className="grow"><span style={{ fontWeight: 500 }}>{a.who}</span> <span className="muted">{a.text}</span> <span style={{fontWeight: 500, color: 'var(--accent-ink)'}}>{a.target}</span></div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{a.at}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

// Maintenance Kanban
const Maintenance = ({ t, lang, perms }) => {
  const [tasks, setTasks] = React.useState(TASKS);
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);
  const push = useToast();

  const columns = [
    { id: 'todo', label: t('todo'), color: 'var(--slate)' },
    { id: 'in_progress', label: t('in_progress'), color: 'var(--accent)' },
    { id: 'done', label: t('done'), color: 'var(--ok)' },
  ];

  const visible = tasks.filter(tk => typeFilter === 'all' || tk.type === typeFilter);

  const move = (id, status) => {
    setTasks(ts => ts.map(tk => tk.id === id ? { ...tk, status } : tk));
    push(`Tarefa atualizada · ${status === 'done' ? 'concluída' : status === 'in_progress' ? 'em andamento' : 'a fazer'}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('maintenance')}<span className="count">{visible.length}</span></h1>
          <div className="page-subtitle">Limpeza e manutenção · atribua, acompanhe e conclua com checklists.</div>
        </div>
        <div className="row gap-2">
          <div className="seg">
            <button className={typeFilter==='all'?'active':''} onClick={()=>setTypeFilter('all')}>Todas</button>
            <button className={typeFilter==='cleaning'?'active':''} onClick={()=>setTypeFilter('cleaning')}>Limpeza</button>
            <button className={typeFilter==='maintenance'?'active':''} onClick={()=>setTypeFilter('maintenance')}>Manutenção</button>
          </div>
          <button className="btn primary"><Icon name="plus" size={14}/>Nova tarefa</button>
        </div>
      </div>

      <div className="kanban">
        {columns.map(col => {
          const items = visible.filter(tk => tk.status === col.id);
          return (
            <div key={col.id} className="kanban-col">
              <div className="kanban-head">
                <div className="row gap-2">
                  <div className="kanban-dot" style={{ background: col.color }}/>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{col.label}</span>
                  <span className="muted mono" style={{ fontSize: 12 }}>{items.length}</span>
                </div>
                <button className="btn ghost icon sm"><Icon name="plus" size={12}/></button>
              </div>
              <div className="kanban-list">
                {items.map(tk => {
                  const u = UNITS.find(x => x.id === tk.unitId);
                  return (
                    <div key={tk.id} className="kanban-card" onClick={() => setSelected(tk)}>
                      <div className="row gap-2" style={{ marginBottom: 8 }}>
                        <div className={`tl-tag task ${tk.type}`}>{tk.type === 'cleaning' ? 'Limpeza' : 'Manut.'}</div>
                        {tk.priority === 'high' && <Pill variant="err" dot>Alta</Pill>}
                        {tk.priority === 'medium' && <Pill variant="warn">Média</Pill>}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 13.5, lineHeight: 1.35 }}>{tk.title}</div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                        <Icon name="building" size={11}/> {u?.name}
                      </div>
                      <div className="kanban-foot">
                        <div className="row gap-2">
                          <div className="mono muted" style={{ fontSize: 11 }}>
                            <Icon name="clock" size={11}/> {tk.due.slice(11,16)}
                          </div>
                          <div className="checklist-mini">
                            {tk.checklist.filter(c=>c.d).length}/{tk.checklist.length}
                          </div>
                        </div>
                        <Avatar name={tk.assignee} size={22}/>
                      </div>
                      {col.id !== 'done' && (
                        <div className="kanban-actions">
                          {col.id === 'todo' && <button className="btn sm" onClick={e=>{e.stopPropagation(); move(tk.id, 'in_progress');}}>Iniciar</button>}
                          {col.id === 'in_progress' && <button className="btn sm" onClick={e=>{e.stopPropagation(); move(tk.id, 'done');}}>Concluir</button>}
                        </div>
                      )}
                    </div>
                  );
                })}
                {items.length === 0 && <div className="empty" style={{ padding: 20 }}><div className="muted" style={{ fontSize: 12 }}>Nenhuma tarefa</div></div>}
              </div>
            </div>
          );
        })}
      </div>

      {selected && <TaskDrawer tk={selected} onClose={() => setSelected(null)} onUpdate={(patch) => {
        setTasks(ts => ts.map(x => x.id === selected.id ? { ...x, ...patch } : x));
        setSelected(s => ({ ...s, ...patch }));
      }}/>}
    </div>
  );
};

const TaskDrawer = ({ tk, onClose, onUpdate }) => {
  const u = UNITS.find(x => x.id === tk.unitId);
  const toggle = (i) => {
    const next = tk.checklist.map((c, idx) => idx === i ? { ...c, d: !c.d } : c);
    onUpdate({ checklist: next });
  };
  return (
    <div className="drawer-scrim" onClick={onClose}>
      <aside className="drawer" style={{ maxWidth: 520 }} onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <button className="btn ghost icon" onClick={onClose}><Icon name="x" size={16}/></button>
          <div className="row gap-2">
            <Pill variant={tk.priority === 'high' ? 'err' : 'warn'}>{tk.priority === 'high'?'Alta':tk.priority==='medium'?'Média':'Baixa'}</Pill>
            <Pill variant={tk.status === 'done' ? 'ok' : tk.status === 'in_progress' ? 'accent' : 'slate'} dot>
              {tk.status === 'done' ? 'Concluída' : tk.status === 'in_progress' ? 'Em andamento' : 'A fazer'}
            </Pill>
          </div>
        </div>
        <div className="drawer-body">
          <h2 className="serif" style={{ fontSize: 24, margin: 0 }}>{tk.title}</h2>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
            {u?.name} · Vence {tk.due.replace('T', ' às ').slice(0, 16)}
          </div>
          <div className="summary-grid" style={{ marginTop: 18 }}>
            <div><div className="label">Responsável</div>
              <div className="row gap-2" style={{ marginTop: 4 }}><Avatar name={tk.assignee} size={24}/><span style={{ fontWeight: 500 }}>{tk.assignee}</span></div>
            </div>
            <div><div className="label">Reserva vinculada</div>
              <div style={{ fontWeight: 500, marginTop: 4 }} className="mono">{tk.reservationId ? RESERVATIONS.find(r=>r.id===tk.reservationId)?.code : '—'}</div>
            </div>
          </div>
          <div className="section-title" style={{ marginTop: 20 }}>Checklist</div>
          <div className="checklist">
            {tk.checklist.map((c, i) => (
              <label key={i} className={`checklist-item ${c.d?'done':''}`}>
                <input type="checkbox" checked={c.d} onChange={() => toggle(i)}/>
                <span>{c.t}</span>
              </label>
            ))}
          </div>
          <div className="section-title" style={{ marginTop: 20 }}>Fotos</div>
          <div className="media-grid">
            <div className="placeholder-tile" style={{ height: 100 }}>antes_01.jpg</div>
            <div className="placeholder-tile" style={{ height: 100 }}>depois_01.jpg</div>
            <div className="placeholder-tile" style={{ height: 100 }}>+ adicionar</div>
          </div>
        </div>
      </aside>
    </div>
  );
};

// Settings — users + roles + tenant
const Settings = ({ t, lang, role, setRole }) => {
  const [tab, setTab] = React.useState('users');
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('settings')}</h1>
          <div className="page-subtitle">Configurações do tenant Mar & Sal Properties · isolado dos demais.</div>
        </div>
      </div>
      <div className="settings-layout">
        <nav className="settings-nav">
          <button className={tab==='tenant'?'active':''} onClick={()=>setTab('tenant')}><Icon name="building" size={14}/>Perfil do tenant</button>
          <button className={tab==='users'?'active':''} onClick={()=>setTab('users')}><Icon name="users" size={14}/>Usuários</button>
          <button className={tab==='roles'?'active':''} onClick={()=>setTab('roles')}><Icon name="key" size={14}/>Papéis e permissões</button>
          <button className={tab==='integrations'?'active':''} onClick={()=>setTab('integrations')}><Icon name="sparkle" size={14}/>Integrações</button>
          <button className={tab==='persona'?'active':''} onClick={()=>setTab('persona')}><Icon name="eye" size={14}/>Simular papel</button>
        </nav>
        <div>
          {tab === 'tenant' && <TenantProfile/>}
          {tab === 'users' && <UsersTable/>}
          {tab === 'roles' && <RolesMatrix/>}
          {tab === 'integrations' && <Integrations/>}
          {tab === 'persona' && <PersonaSim role={role} setRole={setRole}/>}
        </div>
      </div>
    </div>
  );
};

const TenantProfile = () => (
  <div className="card" style={{ padding: 20 }}>
    <div className="row gap-4" style={{ alignItems: 'flex-start' }}>
      <div className="tenant-mark" style={{ width: 56, height: 56, fontSize: 22, borderRadius: 14, background: 'oklch(0.58 0.14 40)' }}>M</div>
      <div className="grow">
        <div style={{ fontWeight: 600, fontSize: 16 }}>Mar & Sal Properties</div>
        <div className="muted" style={{ fontSize: 13 }}>CNPJ 42.118.339/0001-20 · Florianópolis, SC</div>
      </div>
      <button className="btn">Editar</button>
    </div>
    <div className="divider" style={{ margin: '20px 0' }}/>
    <div className="field-grid-2">
      <div><div className="label">Nome comercial</div><input className="field" defaultValue="Mar & Sal Properties"/></div>
      <div><div className="label">Domínio (whitelabel)</div><input className="field" defaultValue="marsal.aja.app"/></div>
      <div><div className="label">Fuso horário padrão</div><input className="field" defaultValue="America/Sao_Paulo"/></div>
      <div><div className="label">Moeda</div><input className="field" defaultValue="BRL — Real brasileiro"/></div>
    </div>
  </div>
);

const UsersTable = () => (
  <div className="card" style={{ padding: 0 }}>
    <div className="row" style={{ padding: 14, justifyContent: 'space-between', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ fontWeight: 600 }}>Usuários do tenant · {USERS.length}</div>
      <div className="row gap-2">
        <div className="field-search" style={{ width: 240 }}><Icon name="search" size={14}/><input placeholder="Buscar usuário..."/></div>
        <button className="btn primary"><Icon name="plus" size={14}/>Convidar usuário</button>
      </div>
    </div>
    <table className="data-table">
      <thead><tr><th>Usuário</th><th>Email</th><th>Papel</th><th>Status</th><th>Último acesso</th><th></th></tr></thead>
      <tbody>
        {USERS.map(u => (
          <tr key={u.id}>
            <td><div className="row gap-2"><Avatar name={u.name} size={26}/><span style={{ fontWeight: 500 }}>{u.name}</span></div></td>
            <td className="muted">{u.email}</td>
            <td><Pill variant={u.role==='admin'?'accent':'slate'}>{ROLES.find(r=>r.id===u.role)?.name}</Pill></td>
            <td>{u.status === 'active' ? <Pill variant="ok" dot>Ativo</Pill> : u.status === 'pending' ? <Pill variant="warn" dot>Pendente</Pill> : <Pill dot>Inativo</Pill>}</td>
            <td className="muted mono" style={{ fontSize: 12 }}>há 2h</td>
            <td><button className="btn ghost icon sm"><Icon name="dots" size={14}/></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RolesMatrix = () => {
  const modules = [
    { k: 'dashboard', l: 'Dashboard' },
    { k: 'reservations', l: 'Reservas' },
    { k: 'calendar', l: 'Calendário' },
    { k: 'properties', l: 'Imóveis' },
    { k: 'stays', l: 'Estadias' },
    { k: 'maint', l: 'Tarefas' },
    { k: 'settings', l: 'Configurações' },
    { k: 'users', l: 'Usuários' },
  ];
  const cell = (val) => {
    if (val === true) return <div className="perm-cell full"><Icon name="check" size={12}/></div>;
    if (val === 'read') return <div className="perm-cell read">Leitura</div>;
    return <div className="perm-cell none"><Icon name="x" size={12}/></div>;
  };
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="row" style={{ padding: 14, justifyContent: 'space-between', borderBottom: '1px solid var(--line-soft)' }}>
        <div>
          <div style={{ fontWeight: 600 }}>Matriz de permissões</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Configurado por tenant — alterações aplicam apenas a Mar & Sal.</div>
        </div>
        <button className="btn primary">Salvar alterações</button>
      </div>
      <table className="perm-table">
        <thead>
          <tr>
            <th>Módulo</th>
            {ROLES.map(r => <th key={r.id} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 600 }}>{r.name}</div>
              <div className="muted" style={{ fontSize: 11, fontWeight: 400 }}>{r.desc}</div>
            </th>)}
          </tr>
        </thead>
        <tbody>
          {modules.map(m => (
            <tr key={m.k}>
              <td style={{ fontWeight: 500 }}>{m.l}</td>
              {ROLES.map(r => <td key={r.id} style={{ textAlign: 'center' }}>{cell(PERMISSIONS[r.id][m.k])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Integrations = () => (
  <div className="col gap-3">
    {[
      { name: 'Airbnb', desc: 'Sincronização de calendário e mensagens', status: 'connected', hue: 5 },
      { name: 'Booking.com', desc: 'Channel manager bi-direcional', status: 'connected', hue: 240 },
      { name: 'WhatsApp Business', desc: 'Mensagens transacionais aos hóspedes', status: 'connected', hue: 150 },
      { name: 'Stripe', desc: 'Pagamentos e reembolsos', status: 'disconnected', hue: 260 },
      { name: 'DocuSign', desc: 'Assinatura eletrônica de contratos', status: 'disconnected', hue: 40 },
    ].map(i => (
      <div key={i.name} className="integration">
        <div className="int-logo" style={{ background: `oklch(0.88 0.07 ${i.hue})`, color: `oklch(0.35 0.10 ${i.hue})` }}>
          {i.name[0]}
        </div>
        <div className="grow">
          <div style={{ fontWeight: 600 }}>{i.name}</div>
          <div className="muted" style={{ fontSize: 12 }}>{i.desc}</div>
        </div>
        {i.status === 'connected' ? <Pill variant="ok" dot>Conectado</Pill> : <button className="btn sm">Conectar</button>}
      </div>
    ))}
  </div>
);

const PersonaSim = ({ role, setRole }) => (
  <div className="card" style={{ padding: 20 }}>
    <div style={{ fontWeight: 600, fontSize: 15 }}>Simular papel (RBAC)</div>
    <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
      Alterne entre papéis para ver como a navegação e ações mudam. Módulos bloqueados somem do menu; ações só-leitura ficam desabilitadas.
    </div>
    <div className="col gap-2" style={{ marginTop: 16 }}>
      {ROLES.map(r => (
        <label key={r.id} className={`radio-pill big ${role===r.id?'on':''}`}>
          <input type="radio" name="role" checked={role===r.id} onChange={() => setRole(r.id)}/>
          <div className="grow">
            <div style={{ fontWeight: 600 }}>{r.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{r.desc}</div>
          </div>
          {role === r.id && <Pill variant="accent">Ativo</Pill>}
        </label>
      ))}
    </div>
  </div>
);

Object.assign(window, { Properties, Maintenance, Settings });
