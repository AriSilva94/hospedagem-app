// Shell — sidebar + topbar for Aja PMS
const Sidebar = ({ t, route, setRoute, role, perms }) => {
  const items = [
    { id: 'dashboard', icon: 'home', label: t('dashboard'), perm: 'dashboard' },
    { id: 'reservations', icon: 'list', label: t('reservations'), perm: 'reservations' },
    { id: 'calendar', icon: 'calendar', label: t('calendar'), perm: 'calendar' },
    { id: 'properties', icon: 'building', label: t('properties'), perm: 'properties' },
    { id: 'stays', icon: 'door', label: t('stays'), perm: 'stays' },
    { id: 'maintenance', icon: 'tool', label: t('maintenance'), perm: 'maint' },
  ];
  const bottom = [
    { id: 'settings', icon: 'cog', label: t('settings'), perm: 'settings' },
  ];
  const NavBtn = ({ it }) => {
    const allowed = perms[it.perm];
    if (!allowed) return null;
    const active = route === it.id;
    return (
      <button className={`nav-btn ${active ? 'active' : ''}`} onClick={() => setRoute(it.id)}
        title={it.label}>
        <Icon name={it.icon} size={18} />
        <span className="tooltip">{it.label}</span>
      </button>
    );
  };
  return (
    <aside className="sidebar">
      <div className="brand" title="Aja PMS">
        <div className="brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 20L12 4l8 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M7.5 14h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <nav className="nav-col">
        {items.map(it => <NavBtn key={it.id} it={it} />)}
      </nav>
      <div className="nav-col bottom">
        {bottom.map(it => <NavBtn key={it.id} it={it} />)}
      </div>
    </aside>
  );
};

const TenantSwitcher = ({ tenants, currentTenant, setTenant }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);
  const current = tenants.find(tn => tn.id === currentTenant);
  return (
    <div className="tenant-switcher" ref={ref}>
      <button className="tenant-btn" onClick={() => setOpen(o => !o)}>
        <div className="tenant-mark" style={{ background: current.color }}>{current.initial}</div>
        <div className="col" style={{ alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{current.name}</div>
          <div className="muted" style={{ fontSize: 11 }}>{current.units} unidades · {current.city}</div>
        </div>
        <Icon name="chevronD" size={14} />
      </button>
      {open && (
        <div className="tenant-menu fadeIn">
          <div className="label" style={{ padding: '8px 12px 4px' }}>Trocar de tenant</div>
          {tenants.map(tn => (
            <button key={tn.id} className={`tenant-item ${tn.id===currentTenant?'active':''}`}
              onClick={() => { setTenant(tn.id); setOpen(false); }}>
              <div className="tenant-mark sm" style={{ background: tn.color }}>{tn.initial}</div>
              <div className="col" style={{ alignItems: 'flex-start', flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{tn.name}</div>
                <div className="muted" style={{ fontSize: 11 }}>{tn.units} unidades · {tn.city}</div>
              </div>
              {tn.id===currentTenant && <Icon name="check" size={14} />}
            </button>
          ))}
          <div className="divider" style={{ margin: '4px 0' }}/>
          <button className="tenant-item">
            <div className="tenant-mark sm" style={{ background:'var(--slate-soft)', color:'var(--slate-ink)' }}>
              <Icon name="plus" size={12} />
            </div>
            <div style={{ fontWeight: 500 }}>Adicionar tenant</div>
          </button>
        </div>
      )}
    </div>
  );
};

const Topbar = ({ t, tenants, currentTenant, setTenant, role, setRoute, onNewRes, lang, setLang, theme, setTheme }) => {
  return (
    <header className="topbar">
      <TenantSwitcher tenants={tenants} currentTenant={currentTenant} setTenant={setTenant} />
      <div className="search-bar">
        <Icon name="search" size={14} />
        <input placeholder={`${t('search')} reservas, hóspedes, unidades...`}/>
        <kbd>⌘K</kbd>
      </div>
      <div className="row gap-2">
        <button className="btn ghost icon" title="PT/EN"
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.05em' }}>
            {lang.toUpperCase()}
          </span>
        </button>
        <button className="btn ghost icon" title="Tema" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
        </button>
        <button className="btn ghost icon" title="Notificações">
          <Icon name="bell" size={16} />
          <span className="notif-dot"/>
        </button>
        <button className="btn primary" onClick={onNewRes}>
          <Icon name="plus" size={14} />
          {t('new_reservation')}
        </button>
        <button className="user-chip" title="Ana Beatriz">
          <div className="avatar">AO</div>
        </button>
      </div>
    </header>
  );
};

Object.assign(window, { Sidebar, Topbar, TenantSwitcher });
