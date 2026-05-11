import { AppShell } from "@/components/shell/AppShell";
import { cn } from "@/lib/cn";

const stats = [
  { label: "Ocupação", value: "29%", hint: "4 de 14 unidades", trend: "+4.2 vs semana anterior", positive: true },
  { label: "Chegadas", value: "3", hint: "próximas 24h", trend: "1 com pendências", positive: false },
  { label: "Partidas", value: "2", hint: "até 12:00", trend: "1 relatórios pendentes", positive: false },
  { label: "Tarefas abertas", value: "8", hint: "3 alta prioridade", trend: "3 atrasadas", positive: false },
];

type Event = {
  time: string;
  kind: "PARTIDA" | "LIMPEZA" | "CHEGADA" | "MANUTENÇÃO";
  title: string;
  meta: string;
  status?: { label: string; tone: "warn" | "info" };
};

const events: Event[] = [
  { time: "10:30", kind: "PARTIDA", title: "Guilherme Prado", meta: "Lagoa Térreo" },
  { time: "11:00", kind: "PARTIDA", title: "João Pedro Ferraz", meta: "Mole 201" },
  { time: "11:30", kind: "LIMPEZA", title: "Limpeza pós check-out — Lagoa Térreo", meta: "Equipe Azul", status: { label: "A fazer", tone: "info" } },
  { time: "12:00", kind: "LIMPEZA", title: "Limpeza pós check-out — Mole 301", meta: "Fernanda R.", status: { label: "A fazer", tone: "info" } },
  { time: "14:00", kind: "LIMPEZA", title: "Check amenities pré check-in", meta: "Fernanda R.", status: { label: "Em andamento", tone: "warn" } },
  { time: "15:00", kind: "CHEGADA", title: "Mariana Albuquerque", meta: "Villa Jurerê 07 · Suíte Master" },
  { time: "16:00", kind: "MANUTENÇÃO", title: "Ar-condicionado sala — barulho", meta: "Carlos M.", status: { label: "Em andamento", tone: "warn" } },
];

const alerts = [
  { title: "Contrato não assinado", desc: "AJA-1025 · Helena Brandão · check-in em 3h", cta: "Enviar agora" },
  { title: "Unidade fora de operação", desc: "Mole 202 — reserva AJA-1034 em 8 dias", cta: "Reatribuir" },
  { title: "Check-out atrasado", desc: "AJA-1019 · saiu às 10:30 previsto", cta: "Contatar hóspede" },
  { title: "1 mensagem falhou no envio", desc: "Template boas-vindas · AJA-1024", cta: "Retentar" },
];

export default function Dashboard() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        {/* Hero */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-ink-3">Bom dia, Ana · sexta, 17 de abril</p>
            <h1 className="mt-1 font-serif text-[28px] tracking-tight text-ink">
              Mar & Sal está <em className="not-italic text-accent">quase cheio</em> hoje.
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <PillButton icon={<DotIcon />}>Hoje</PillButton>
            <PillButton icon={<BuildingIcon />}>Todos imóveis</PillButton>
            <PillButton icon={<ExportIcon />}>Exportar</PillButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                  {s.label}
                </span>
                <button className="text-ink-4 hover:text-ink-2"><DotsIcon /></button>
              </div>
              <div className="mt-3 font-serif text-4xl tracking-tight text-ink">{s.value}</div>
              <div className="mt-1 text-[12.5px] text-ink-3">{s.hint}</div>
              <div className={cn(
                "mt-2 text-[12px] font-medium",
                s.positive ? "text-ok-ink" : "text-ink-3"
              )}>
                {s.positive && "▲ "}{s.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline + Alerts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
          <section className="rounded-2xl border border-line bg-bg-card shadow-sm">
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="text-[15px] font-semibold text-ink">Linha do tempo — hoje</h2>
                <p className="text-[12px] text-ink-3">Chegadas, partidas e tarefas de hoje</p>
              </div>
              <button className="text-[13px] font-medium text-accent hover:underline">
                Ver calendário
              </button>
            </header>
            <ul className="divide-y divide-line">
              {events.map((e, i) => (
                <li key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-panel">
                  <span className="w-12 text-[12px] font-medium text-ink-3 tabular-nums">{e.time}</span>
                  <KindBadge kind={e.kind} />
                  <div className="flex flex-1 flex-col">
                    <span className="text-[13.5px] font-medium text-ink">{e.title}</span>
                    <span className="text-[12px] text-ink-3">{e.meta}</span>
                  </div>
                  {e.status && (
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      e.status.tone === "warn"
                        ? "bg-warn-soft text-warn-ink"
                        : "bg-slate-soft text-slate-ink"
                    )}>
                      {e.status.label}
                    </span>
                  )}
                  <ChevronRight />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-bg-card shadow-sm">
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[15px] font-semibold text-ink">Alertas</h2>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-err-soft text-[11px] font-semibold text-err-ink">
                {alerts.length}
              </span>
            </header>
            <ul className="divide-y divide-line">
              {alerts.map((a) => (
                <li key={a.title} className="flex items-start gap-3 px-5 py-4">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warn-soft text-warn-ink">
                    <WarnIcon />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-[13.5px] font-semibold text-ink">{a.title}</span>
                    <span className="text-[12px] text-ink-3">{a.desc}</span>
                  </div>
                  <button className="shrink-0 text-[12.5px] font-medium text-accent hover:underline">
                    {a.cta}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function PillButton({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-bg-card px-4 text-[13px] font-medium text-ink hover:bg-panel">
      {icon}
      {children}
    </button>
  );
}

function KindBadge({ kind }: { kind: Event["kind"] }) {
  const palette: Record<Event["kind"], string> = {
    PARTIDA: "bg-warn-soft text-warn-ink",
    LIMPEZA: "bg-ok-soft text-ok-ink",
    CHEGADA: "bg-accent-soft text-accent-ink",
    "MANUTENÇÃO": "bg-slate-soft text-slate-ink",
  };
  return (
    <span className={cn(
      "w-24 shrink-0 rounded-md px-2 py-1 text-center text-[10.5px] font-semibold uppercase tracking-wider",
      palette[kind]
    )}>
      {kind}
    </span>
  );
}

function DotIcon() {
  return <span className="h-2 w-2 rounded-full bg-accent" />;
}
function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="1.5" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="4" y1="9" x2="20" y2="9" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v12M7 8l5-5 5 5M5 21h14" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg className="text-ink-4" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" />
    </svg>
  );
}
