// Auth + Tenant selection screens
const AuthScreen = ({ onSignIn }) => {
  const [email, setEmail] = React.useState('ana@marsal.com.br');
  const [password, setPassword] = React.useState('••••••••••');
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => onSignIn(), 700);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-art">
        <div className="auth-art-inner">
          <div className="auth-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 20L12 4l8 16" stroke="currentColor" strokeWidth="2"/>
              <path d="M7.5 14h9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Aja PMS</span>
          </div>
          <h1 className="serif auth-h1">Operações tranquilas<br/>para quem hospeda.</h1>
          <p className="auth-sub">Reservas, estadias, tarefas e contratos em um único lugar — com isolamento total entre tenants.</p>
          <div className="auth-stats">
            <div><div className="serif auth-stat">312</div><div className="muted">unidades ativas</div></div>
            <div><div className="serif auth-stat">8.4k</div><div className="muted">reservas/mês</div></div>
            <div><div className="serif auth-stat">99.98%</div><div className="muted">uptime</div></div>
          </div>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>Entrar</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Acesse sua conta para continuar.</div>
          <div style={{ marginTop: 20 }}>
            <div className="label">Email de trabalho</div>
            <input className="field" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="label">Senha</div>
              <a className="muted" style={{ fontSize: 11.5 }} href="#">Esqueci a senha</a>
            </div>
            <input className="field" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
          </div>
          <button className="btn primary lg" style={{ marginTop: 20, width: '100%' }} type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="divider-or"><span>ou</span></div>
          <button type="button" className="btn lg" style={{ width: '100%' }}>
            <Icon name="globe" size={14}/>Entrar com SSO
          </button>
          <div className="muted" style={{ fontSize: 12, marginTop: 18, textAlign: 'center' }}>
            Ao continuar você aceita os Termos e a Política de Privacidade.
          </div>
        </form>
      </div>
    </div>
  );
};

const TenantPicker = ({ onPick }) => {
  return (
    <div className="auth-wrap single">
      <div className="tenant-picker">
        <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--accent)' }}>
            <path d="M4 20L12 4l8 16" stroke="currentColor" strokeWidth="2"/>
            <path d="M7.5 14h9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Aja PMS</span>
        </div>
        <h1 className="serif" style={{ fontSize: 28, margin: 0, textAlign: 'center' }}>Qual workspace?</h1>
        <div className="muted" style={{ fontSize: 13.5, textAlign: 'center', marginTop: 4 }}>
          Você tem acesso a 3 tenants. Escolha um para começar.
        </div>
        <div className="col gap-2" style={{ marginTop: 24 }}>
          {TENANTS.map(tn => (
            <button key={tn.id} className="tenant-picker-row" onClick={() => onPick(tn.id)}>
              <div className="tenant-mark" style={{ background: tn.color, width: 40, height: 40, borderRadius: 10, fontSize: 16 }}>{tn.initial}</div>
              <div className="grow" style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{tn.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{tn.units} unidades · {tn.city}</div>
              </div>
              <Pill variant={tn.id==='mar'?'accent':'slate'}>{tn.id==='mar'?'Admin':'Ops'}</Pill>
              <Icon name="chevronR" size={14}/>
            </button>
          ))}
        </div>
        <div className="divider" style={{ margin: '20px 0' }}/>
        <button className="btn ghost" style={{ width: '100%' }}><Icon name="logout" size={14}/>Sair</button>
      </div>
    </div>
  );
};

Object.assign(window, { AuthScreen, TenantPicker });
