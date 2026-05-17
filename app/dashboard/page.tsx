import { AlertCircle, Building2, ChevronRight, MoreHorizontal, Upload } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Badge, Button, Card, IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";

const stats = [
  { label: "Ocupação", value: "29%", hint: "4 de 14 unidades", trend: "+4.2 vs semana anterior", positive: true },
  { label: "Chegadas", value: "3", hint: "próximas 24h", trend: "1 com pendências", positive: false },
  { label: "Partidas", value: "2", hint: "até 12:00", trend: "1 relatórios pendentes", positive: false },
  { label: "Tarefas abertas", value: "8", hint: "3 alta prioridade", trend: "3 atrasadas", positive: false },
];

type EventKind = "PARTIDA" | "LIMPEZA" | "CHEGADA" | "MANUTENÇÃO";

type Event = {
  time: string;
  kind: EventKind;
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

const kindToneMap: Record<EventKind, "warn" | "ok" | "accent" | "slate"> = {
  PARTIDA: "warn",
  LIMPEZA: "ok",
  CHEGADA: "accent",
  "MANUTENÇÃO": "slate",
};

export default function Dashboard() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[12px] text-ink-3">Bom dia, Ana · sexta, 17 de abril</p>
            <h1 className="mt-1 font-serif text-xl tracking-tight text-ink sm:text-2xl lg:text-[28px]">
              Mar & Sal está <em className="not-italic text-accent">quase cheio</em> hoje.
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="pill">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Hoje
            </Button>
            <Button variant="pill">
              <Building2 size={14} strokeWidth={1.8} />
              Todos imóveis
            </Button>
            <Button variant="pill">
              <Upload size={14} strokeWidth={1.8} />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <Card.Body padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    {s.label}
                  </span>
                  <IconButton aria-label={`Mais opções: ${s.label}`} size="sm">
                    <MoreHorizontal size={14} />
                  </IconButton>
                </div>
                <div className="mt-3 font-serif text-4xl tracking-tight text-ink">{s.value}</div>
                <div className="mt-1 text-[12.5px] text-ink-3">{s.hint}</div>
                <div className={cn(
                  "mt-2 text-[12px] font-medium",
                  s.positive ? "text-ok-ink" : "text-ink-3"
                )}>
                  {s.positive && "▲ "}{s.trend}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
          <Card>
            <Card.Header
              title="Linha do tempo — hoje"
              description="Chegadas, partidas e tarefas de hoje"
              action={
                <Button variant="ghost" size="sm" className="text-accent hover:underline hover:bg-transparent">
                  Ver calendário
                </Button>
              }
            />
            <ul className="divide-y divide-line">
              {events.map((e, i) => (
                <li key={i} className="flex items-center gap-3 px-3 py-3 hover:bg-panel sm:gap-4 sm:px-5">
                  <span className="w-10 shrink-0 text-[12px] font-medium text-ink-3 tabular-nums sm:w-12">{e.time}</span>
                  <Badge
                    tone={kindToneMap[e.kind]}
                    size="sm"
                    uppercase
                    className="w-20 justify-center sm:w-24"
                  >
                    {e.kind}
                  </Badge>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13.5px] font-medium text-ink">{e.title}</span>
                    <span className="truncate text-[12px] text-ink-3">{e.meta}</span>
                  </div>
                  {e.status && (
                    <Badge tone={e.status.tone === "warn" ? "warn" : "slate"} size="sm">
                      {e.status.label}
                    </Badge>
                  )}
                  <span className="hidden sm:block text-ink-4">
                    <ChevronRight size={14} strokeWidth={2} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <Card.Header
              title="Alertas"
              action={
                <span className="grid h-6 w-6 place-items-center rounded-full bg-err-soft text-[11px] font-semibold text-err-ink">
                  {alerts.length}
                </span>
              }
            />
            <ul className="divide-y divide-line">
              {alerts.map((a) => (
                <li key={a.title} className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warn-soft text-warn-ink">
                    <AlertCircle size={12} strokeWidth={2.2} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[13.5px] font-semibold text-ink">{a.title}</span>
                    <span className="text-[12px] text-ink-3">{a.desc}</span>
                  </div>
                  <Button variant="ghost" size="sm" className={cn("shrink-0 text-accent hover:underline hover:bg-transparent")}>
                    {a.cta}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
