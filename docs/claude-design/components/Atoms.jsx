// Reusable UI atoms
const Pill = ({ variant = 'slate', dot = false, children }) => (
  <span className={`pill ${variant}`}>
    {dot && <span className="dot" />}
    {children}
  </span>
);

const StatusPill = ({ status, t }) => {
  const map = {
    arriving_today:  { v: 'accent', label: t('arriving_today') },
    departing_today: { v: 'warn',   label: t('departing_today') },
    in_house:        { v: 'ok',     label: t('in_house') },
    confirmed:       { v: 'slate',  label: t('confirmed') },
    tentative:       { v: 'warn',   label: t('tentative') },
    completed:       { v: 'slate',  label: t('completed') },
    cancelled:       { v: 'err',    label: t('cancelled') },
  };
  const cfg = map[status] || { v: 'slate', label: status };
  return <Pill variant={cfg.v} dot>{cfg.label}</Pill>;
};

const Avatar = ({ name, size = 28, color }) => {
  const initials = name.split(/\s+/).filter(Boolean).slice(0,2).map(s => s[0]).join('').toUpperCase();
  // stable color from name
  const hues = [30, 200, 150, 260, 50, 320, 90];
  const hue = color ?? hues[(name.charCodeAt(0) + name.length) % hues.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `oklch(0.90 0.04 ${hue})`, color: `oklch(0.35 0.08 ${hue})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 600, fontSize: Math.round(size * 0.4), flexShrink: 0,
    }}>{initials}</div>
  );
};

const KBarItem = ({ icon, label, hint, onClick }) => (
  <button className="kbar-item" onClick={onClick}>
    <Icon name={icon} size={15} />
    <span className="grow" style={{ textAlign: 'left' }}>{label}</span>
    {hint && <span className="muted" style={{ fontSize: 11 }}>{hint}</span>}
  </button>
);

// Simple date helpers (demo-quality)
const fmtDate = (iso, { short = false, lang = 'pt' } = {}) => {
  const d = new Date(iso + (iso.length === 10 ? 'T12:00' : ''));
  const months = {
    pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  }[lang];
  if (short) return `${d.getDate()} ${months[d.getMonth()]}`;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
const nightsBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

const Empty = ({ icon = 'sparkle', title, desc, cta }) => (
  <div className="empty">
    <div className="empty-icon"><Icon name={icon} size={20} /></div>
    <div style={{ fontWeight: 600, marginTop: 8 }}>{title}</div>
    {desc && <div className="muted" style={{ marginTop: 2, fontSize: 13 }}>{desc}</div>}
    {cta}
  </div>
);

// Toast (tiny)
const ToastCtx = React.createContext(null);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);
  const push = (msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, msg, ...opts }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), opts.duration || 2800);
  };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts">
        {toasts.map(tt => (
          <div key={tt.id} className={`toast ${tt.variant || ''}`}>
            <Icon name={tt.icon || 'check'} size={14} />
            <span>{tt.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};
const useToast = () => React.useContext(ToastCtx);

Object.assign(window, { Pill, StatusPill, Avatar, KBarItem, Empty, fmtDate, nightsBetween, ToastProvider, useToast });
