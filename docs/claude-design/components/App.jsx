// Main App — wires everything
const { useState, useEffect } = React;

const TWEAKS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "lang": "pt",
  "role": "admin",
  "density": "comfortable"
}/*EDITMODE-END*/;

const App = () => {
  // Persist stage & route in localStorage
  const [stage, setStage] = useState(() => localStorage.getItem('aja_stage') || 'app');
  const [currentTenant, setCurrentTenant] = useState(() => localStorage.getItem('aja_tenant') || 'mar');
  const [route, setRoute] = useState(() => localStorage.getItem('aja_route') || 'dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('aja_theme') || TWEAKS.theme);
  const [lang, setLang] = useState(() => localStorage.getItem('aja_lang') || TWEAKS.lang);
  const [role, setRole] = useState(() => localStorage.getItem('aja_role') || TWEAKS.role);
  const [density, setDensity] = useState(() => localStorage.getItem('aja_density') || TWEAKS.density);

  const [activeRes, setActiveRes] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const t = useT(lang);
  const perms = PERMISSIONS[role];

  useEffect(() => { localStorage.setItem('aja_stage', stage); }, [stage]);
  useEffect(() => { localStorage.setItem('aja_tenant', currentTenant); }, [currentTenant]);
  useEffect(() => { localStorage.setItem('aja_route', route); }, [route]);
  useEffect(() => { localStorage.setItem('aja_theme', theme); document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('aja_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('aja_role', role); }, [role]);
  useEffect(() => { localStorage.setItem('aja_density', density); document.documentElement.setAttribute('data-density', density); }, [density]);

  // Edit-mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setAndPersist = (key, value, setter) => {
    setter(value);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  if (stage === 'auth') {
    return <AuthScreen onSignIn={() => setStage('tenant_pick')}/>;
  }
  if (stage === 'tenant_pick') {
    return <TenantPicker onPick={(id) => { setCurrentTenant(id); setStage('app'); }}/>;
  }

  // If role blocks current route, bounce to dashboard
  const routeToPerm = { dashboard:'dashboard', reservations:'reservations', calendar:'calendar', properties:'properties', stays:'stays', maintenance:'maint', settings:'settings' };
  useEffect(() => {
    if (!perms[routeToPerm[route]]) setRoute('dashboard');
  }, [role]);

  const handleCheckIn = (res) => {
    // Keep drawer open but show flow via stays
    setActiveRes(null);
    setRoute('stays');
  };

  return (
    <ToastProvider>
      <div className="app" data-screen-label={`${route}`}>
        <Sidebar t={t} route={route} setRoute={setRoute} role={role} perms={perms}/>
        <div className="main">
          <Topbar t={t} tenants={TENANTS} currentTenant={currentTenant}
            setTenant={setCurrentTenant} role={role} setRoute={setRoute}
            onNewRes={() => setWizardOpen(true)}
            lang={lang} setLang={(v)=>setAndPersist('lang', v, setLang)}
            theme={theme} setTheme={(v)=>setAndPersist('theme', v, setTheme)}/>
          <main className="content">
            {route === 'dashboard' && <Dashboard t={t} lang={lang} role={role} perms={perms}
              setRoute={setRoute} onOpenRes={setActiveRes}/>}
            {route === 'reservations' && <Reservations t={t} lang={lang} perms={perms}
              onOpenRes={setActiveRes} onNewRes={() => setWizardOpen(true)}/>}
            {route === 'calendar' && <Calendar t={t} lang={lang} onOpenRes={setActiveRes}/>}
            {route === 'properties' && <Properties t={t} lang={lang} perms={perms}/>}
            {route === 'stays' && <StayOps t={t} lang={lang} onOpenRes={setActiveRes}/>}
            {route === 'maintenance' && <Maintenance t={t} lang={lang} perms={perms}/>}
            {route === 'settings' && <Settings t={t} lang={lang} role={role} setRole={(v)=>setAndPersist('role', v, setRole)}/>}
          </main>
        </div>

        {activeRes && <ReservationDrawer res={activeRes} onClose={() => setActiveRes(null)} t={t} lang={lang}
          onCheckIn={handleCheckIn}/>}
        {wizardOpen && <NewReservationWizard onClose={() => setWizardOpen(false)} t={t} lang={lang}
          onCreate={() => { setWizardOpen(false); }}/>}

        {tweaksOpen && (
          <TweaksPanel
            lang={lang} setLang={(v)=>setAndPersist('lang', v, setLang)}
            theme={theme} setTheme={(v)=>setAndPersist('theme', v, setTheme)}
            role={role} setRole={(v)=>setAndPersist('role', v, setRole)}
            density={density} setDensity={(v)=>setAndPersist('density', v, setDensity)}
            stage={stage} setStage={setStage}
            onClose={() => setTweaksOpen(false)}
          />
        )}
      </div>
    </ToastProvider>
  );
};

const TweaksPanel = ({ lang, setLang, theme, setTheme, role, setRole, density, setDensity, stage, setStage, onClose }) => {
  return (
    <div className="tweaks-panel">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Tweaks</div>
        <button className="btn ghost icon sm" onClick={onClose}><Icon name="x" size={14}/></button>
      </div>
      <div className="tw-section">
        <div className="label">Idioma</div>
        <div className="seg" style={{ width: '100%', display: 'flex' }}>
          <button className={lang==='pt'?'active':''} style={{ flex:1 }} onClick={() => setLang('pt')}>PT-BR</button>
          <button className={lang==='en'?'active':''} style={{ flex:1 }} onClick={() => setLang('en')}>English</button>
        </div>
      </div>
      <div className="tw-section">
        <div className="label">Tema</div>
        <div className="seg" style={{ width: '100%', display: 'flex' }}>
          <button className={theme==='light'?'active':''} style={{ flex:1 }} onClick={() => setTheme('light')}>Claro</button>
          <button className={theme==='dark'?'active':''} style={{ flex:1 }} onClick={() => setTheme('dark')}>Escuro</button>
        </div>
      </div>
      <div className="tw-section">
        <div className="label">Densidade</div>
        <div className="seg" style={{ width: '100%', display: 'flex' }}>
          <button className={density==='comfortable'?'active':''} style={{ flex:1 }} onClick={() => setDensity('comfortable')}>Confortável</button>
          <button className={density==='compact'?'active':''} style={{ flex:1 }} onClick={() => setDensity('compact')}>Compacta</button>
        </div>
      </div>
      <div className="tw-section">
        <div className="label">Papel (RBAC)</div>
        <div className="col gap-2" style={{ marginTop: 4 }}>
          {ROLES.map(r => (
            <button key={r.id} className={`tw-role ${role===r.id?'on':''}`} onClick={() => setRole(r.id)}>
              <div style={{ fontWeight: 600, fontSize: 12.5 }}>{r.name}</div>
              <div className="muted" style={{ fontSize: 11 }}>{r.desc}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="tw-section">
        <div className="label">Fluxos</div>
        <div className="col gap-2" style={{ marginTop: 4 }}>
          <button className="btn sm" onClick={() => setStage('auth')}>Ver tela de login</button>
          <button className="btn sm" onClick={() => setStage('tenant_pick')}>Ver seletor de tenant</button>
          <button className="btn sm" onClick={() => setStage('app')}>Voltar ao app</button>
        </div>
      </div>
    </div>
  );
};

window.App = App;
