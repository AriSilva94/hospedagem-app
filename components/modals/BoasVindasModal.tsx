// components/modals/BoasVindasModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const TOTAL_STEPS = 5;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
};

export function BoasVindasModal({ open, onClose, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) setStep(1);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const card = cardRef.current;
    const first = card?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();
    return () => {
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const focusables = Array.from(
        card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("hidden"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function next() {
    if (step >= TOTAL_STEPS) {
      onComplete();
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Boas-vindas e configuração inicial"
      className="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4 lg:p-8"
    >
      <button
        type="button"
        aria-label="Fechar overlay"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        ref={cardRef}
        className="relative z-10 mx-auto flex max-h-[95vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-2xl border border-line bg-bg-card shadow-md sm:rounded-3xl lg:max-w-[1240px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-md text-ink-3 hover:bg-panel hover:text-ink"
        >
          ✕
        </button>

        {/* Progress */}
        <div className="flex gap-1.5 px-4 pt-3 sm:px-8 sm:pt-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const idx = i + 1;
            return (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  idx < step && "bg-ink",
                  idx === step && "bg-accent",
                  idx > step && "bg-line-soft"
                )}
              />
            );
          })}
        </div>

        {/* Content */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col overflow-y-auto px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
            <div className="my-auto w-full">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
                Passo {step} de {TOTAL_STEPS}
              </span>
              <StepBody step={step} />
            </div>
          </div>

          <div className="relative hidden overflow-hidden bg-accent-soft lg:block">
            <StepIllustration step={step} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-4 sm:px-8 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] text-ink-3 hover:text-ink"
          >
            Pular configuração
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="text-[14px] text-ink-2 hover:text-ink"
              >
                ← Voltar
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-medium text-white shadow-sm hover:bg-accent-hover sm:px-6 sm:text-[14.5px]"
            >
              {step === TOTAL_STEPS ? "Abrir painel" : "Continuar"}{" "}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBody({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <StepWelcome />;
    case 2:
      return <StepProfile />;
    case 3:
      return <StepProperty />;
    case 4:
      return <StepUnits />;
    case 5:
      return <StepDone />;
    default:
      return null;
  }
}

function StepIllustration({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <KeyArt />;
    case 2:
      return <PortraitArt />;
    case 3:
      return <HouseArt />;
    case 4:
      return <RoomsArt />;
    case 5:
      return <SparklesArt />;
    default:
      return null;
  }
}

/* ---------- Steps ---------- */

function StepWelcome() {
  const features = [
    {
      title: "Reservas e calendário unificados",
      desc: "Tudo que você precisa em um só lugar",
    },
    {
      title: "Equipe de limpeza e manutenção",
      desc: "Atribua tarefas e acompanhe o progresso",
    },
    {
      title: "Relatórios por imóvel e canal",
      desc: "Receita, ocupação e tendências",
    },
  ];
  return (
    <>
      <h1 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.05]">
        Bem-vinda, Mariana.
      </h1>
      <p className="mt-3 text-[15px] text-ink-3">
        Vamos configurar sua operação em poucos minutos.
      </p>
      <ul className="mt-8 flex flex-col gap-5">
        {features.map((f) => (
          <li key={f.title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <CheckIcon />
            </span>
            <div className="flex flex-col">
              <span className="text-[14.5px] font-semibold text-ink">{f.title}</span>
              <span className="text-[13px] text-ink-3">{f.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function StepProfile() {
  const [nome, setNome] = useState("Mariana Albuquerque");
  const [email, setEmail] = useState("mariana@marsal.com.br");
  const [idioma, setIdioma] = useState("pt-BR");
  return (
    <>
      <h1 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.05]">
        Seu perfil
      </h1>
      <p className="mt-3 text-[15px] text-ink-3">
        Um jeito de te reconhecer pela plataforma.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-accent font-serif text-2xl text-white">
          M
        </div>
        <a className="text-[14px] font-medium text-accent underline underline-offset-2" href="#">
          Adicionar foto
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <FieldLabel label="Nome">
          <TextInput value={nome} onChange={setNome} />
        </FieldLabel>
        <FieldLabel label="E-mail">
          <TextInput value={email} onChange={setEmail} type="email" />
        </FieldLabel>
        <FieldLabel label="Idioma">
          <select
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
            className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-4 text-[14px] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft"
          >
            <option value="pt-BR">Português (BR)</option>
            <option value="en-US">English (US)</option>
            <option value="es">Español</option>
          </select>
        </FieldLabel>
      </div>
    </>
  );
}

function StepProperty() {
  const tipos = ["Casa", "Apartamento", "Prédio", "Hotel", "Pousada", "Chalé", "Flat"];
  const [tipo, setTipo] = useState("Casa");
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [cidade, setCidade] = useState("Florianópolis");
  return (
    <>
      <h1 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.05]">
        Conecte um imóvel
      </h1>
      <p className="mt-3 text-[15px] text-ink-3">
        Comece com um — adicione os outros depois.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <FieldLabel label="Nome do imóvel" required>
          <TextInput
            value={nome}
            onChange={setNome}
            placeholder="Ex.: Casa Mar & Sal — Jurerê"
          />
        </FieldLabel>

        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
            Tipo de propriedade <span className="text-accent">*</span>
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {tipos.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={cn(
                  "h-9 rounded-full border px-4 text-[13px] font-medium transition-colors",
                  tipo === t
                    ? "border-accent bg-accent-soft text-accent-ink"
                    : "border-line-strong bg-bg-card text-ink-2 hover:bg-panel"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <FieldLabel label="Descrição" required>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            placeholder="Conte brevemente sobre o imóvel — localização, diferenciais, perfil de hóspedes."
            className="w-full rounded-xl border border-line-strong bg-bg-card px-4 py-3 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
          />
        </FieldLabel>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <FieldLabel label="Cidade" required>
            <TextInput value={cidade} onChange={setCidade} />
          </FieldLabel>
          <FieldLabel label="Estado" required>
            <select className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-3 text-[14px] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft">
              <option>UF</option>
              <option>SC</option>
              <option>SP</option>
              <option>RJ</option>
            </select>
          </FieldLabel>
          <FieldLabel label="País" required>
            <select className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-3 text-[14px] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft">
              <option>Brasil</option>
              <option>Portugal</option>
            </select>
          </FieldLabel>
        </div>

        <a className="text-[13.5px] font-medium text-accent" href="#">
          › Adicionar endereço e geolocalização (opcional)
        </a>
      </div>
    </>
  );
}

const COMODIDADES_ALL = [
  "Wi-Fi", "Ar-condicionado", "TV", "Cozinha", "Estacionamento",
  "Piscina", "Varanda", "Espaço de trabalho", "Máquina de lavar", "Aceita pets",
];

function StepUnits() {
  const tipos = ["Quarto", "Apartamento", "Cobertura", "Loft", "Suíte", "Studio", "Bangalô"];
  const [tipo, setTipo] = useState("Suíte");
  const [nome, setNome] = useState("");
  const [quantasIguais, setQuantasIguais] = useState("4");
  const [descricao, setDescricao] = useState("");
  const [andar, setAndar] = useState("3º");
  const [capacidade, setCapacidade] = useState("2");
  const [quartos, setQuartos] = useState("1");
  const [tamanho, setTamanho] = useState("24");
  const [comodidades, setComodidades] = useState<Set<string>>(
    () => new Set(["Wi-Fi", "Ar-condicionado"])
  );

  function toggleComodidade(c: string) {
    setComodidades((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function clampInt(v: string, min: number, max: number) {
    const digits = v.replace(/[^\d]/g, "");
    if (digits === "") return "";
    const n = Math.min(max, Math.max(min, parseInt(digits, 10)));
    return String(n);
  }

  const inputCls =
    "h-9 w-full rounded-lg border border-line-strong bg-bg-card px-3 text-[13px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft";
  return (
    <div className="mt-3 rounded-xl border border-line p-3.5">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11.5px] font-semibold text-white">
          1
        </span>
        <h2 className="font-serif text-[18px] tracking-tight text-ink">Grupo de unidades</h2>
      </div>

      <div className="mt-3">
        <CompactLabel required>Tipo</CompactLabel>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {tipos.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={cn(
                "h-7 rounded-full border px-3 text-[12px] font-medium",
                tipo === t
                  ? "border-accent bg-accent-soft text-accent-ink"
                  : "border-line-strong bg-bg-card text-ink-2 hover:bg-panel"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-[2fr_1fr]">
        <label className="flex flex-col gap-1">
          <CompactLabel required>Nome</CompactLabel>
          <input
            className={inputCls}
            placeholder="Ex.: Suíte Mar — vista jardim"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <CompactLabel>Quantas iguais?</CompactLabel>
          <input
            className={inputCls}
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={quantasIguais}
            onChange={(e) => setQuantasIguais(clampInt(e.target.value, 1, 999))}
          />
        </label>
      </div>

      <label className="mt-2.5 flex flex-col gap-1">
        <CompactLabel>Descrição</CompactLabel>
        <textarea
          rows={2}
          placeholder="O que torna essa unidade especial?"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full rounded-lg border border-line-strong bg-bg-card px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
        />
      </label>

      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <label className="flex flex-col gap-1">
          <CompactLabel>Andar</CompactLabel>
          <input
            className={inputCls}
            value={andar}
            onChange={(e) => setAndar(e.target.value.replace(/[^\dºTSstÉéRrCc\s-]/g, "").slice(0, 6))}
            placeholder="Ex.: 3º, T, S"
          />
        </label>
        <label className="flex flex-col gap-1">
          <CompactLabel>Capacidade</CompactLabel>
          <input
            className={inputCls}
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={capacidade}
            onChange={(e) => setCapacidade(clampInt(e.target.value, 1, 50))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <CompactLabel>Quartos</CompactLabel>
          <input
            className={inputCls}
            type="number"
            inputMode="numeric"
            min={0}
            max={20}
            value={quartos}
            onChange={(e) => setQuartos(clampInt(e.target.value, 0, 20))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <CompactLabel>Tamanho (m²)</CompactLabel>
          <input
            className={inputCls}
            type="number"
            inputMode="numeric"
            min={1}
            max={9999}
            value={tamanho}
            onChange={(e) => setTamanho(clampInt(e.target.value, 1, 9999))}
          />
        </label>
      </div>

      <div className="mt-3">
        <CompactLabel>Comodidades</CompactLabel>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {COMODIDADES_ALL.map((c) => {
            const on = comodidades.has(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleComodidade(c)}
                aria-pressed={on}
                className={cn(
                  "h-7 rounded-full border px-2.5 text-[11.5px] font-medium transition-colors",
                  on
                    ? "border-ok bg-ok-soft text-ok-ink"
                    : "border-line-strong bg-bg-card text-ink-2 hover:bg-panel"
                )}
              >
                {on ? "✓" : "+"} {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CompactLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-3">
      {children}{required && <span className="ml-0.5 text-accent">*</span>}
    </span>
  );
}

function StepDone() {
  return (
    <>
      <h1 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.05]">
        Pronto para começar.
      </h1>
      <p className="mt-3 text-[15px] text-ink-3">
        Estamos animados para ter você aqui.
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
        <p className="text-[14px] text-ink-2">
          Sua operação está pronta. Você pode editar tudo nas configurações a
          qualquer momento.
        </p>
        <p className="mt-3 text-[13px] text-ink-3">
          Próximo passo sugerido:{" "}
          <a className="font-semibold text-accent" href="#">
            Importar reservas existentes
          </a>
        </p>
      </div>
    </>
  );
}

/* ---------- Form atoms ---------- */

function FieldLabel({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {hint && <span className="text-[12px] text-ink-3">{hint}</span>}
    </label>
  );
}

function TextInput(props: {
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-4 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
    />
  );
}

/* ---------- Icons / Art ---------- */

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6.2 5 8.7l4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeyArt() {
  return (
    <>
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[420px] w-[420px]">
          <span className="absolute inset-0 rounded-full border border-accent/25" />
          <span className="absolute inset-[14%] rounded-full border border-accent/30" />
          <span className="absolute inset-[30%] rounded-full border border-accent/35" />
          <div className="absolute inset-0 grid place-items-center text-accent">
            <svg width="220" height="120" viewBox="0 0 220 120" fill="none" aria-hidden>
              <circle cx="50" cy="60" r="38" stroke="currentColor" strokeWidth="10" />
              <circle cx="50" cy="60" r="14" stroke="currentColor" strokeWidth="6" />
              <path d="M88 60 H200" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              <path d="M178 60 V84" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              <path d="M158 60 V78" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <DashCurve />
    </>
  );
}

function PortraitArt() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-accent"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden
    >
      <circle cx="120" cy="0" r="90" className="fill-accent/25" />
      <circle cx="120" cy="0" r="90" className="stroke-ink" strokeWidth="2" fill="none" />
      <path d="M0 240 Q300 180 600 260" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
      <path d="M0 340 Q300 280 600 360" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" opacity="0.45" fill="none" />
      <path d="M0 460 Q300 400 600 480" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  );
}

function HouseArt() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 500"
      fill="none"
      aria-hidden
    >
      <rect width="600" height="280" fill="oklch(0.86 0.07 70)" />
      <circle cx="460" cy="160" r="60" fill="oklch(0.78 0.10 60)" />
      <path d="M0 280 L600 280 L600 320 Q300 360 0 320 Z" fill="oklch(0.70 0.05 100)" />
      <path d="M0 360 Q300 410 600 360 L600 500 L0 500 Z" fill="oklch(0.55 0.06 130)" />
      <g transform="translate(280 230)">
        <path d="M0 30 L40 0 L80 30 Z" fill="var(--color-accent)" />
        <rect x="6" y="30" width="68" height="60" fill="oklch(0.96 0.02 80)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <rect x="32" y="50" width="16" height="40" fill="var(--color-ink)" />
      </g>
      <path d="M0 340 Q300 300 600 340" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="8 6" fill="none" opacity="0.7" />
    </svg>
  );
}

function RoomsArt() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-4 p-6">
      {Array.from({ length: 12 }).map((_, i) => {
        const highlight = i === 5;
        return (
          <div
            key={i}
            className={cn(
              "rounded-xl border border-ink/40 p-2",
              highlight ? "bg-accent-soft" : "bg-bg-card/40"
            )}
          >
            <div className="grid grid-cols-2 gap-1">
              <div className="aspect-square border border-ink/60" />
              <div className="aspect-square border border-ink/60" />
              <div className="aspect-square border border-ink/60" />
              <div className={cn("aspect-square", highlight ? "bg-accent/40" : "bg-ink/30")} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SparklesArt() {
  const pts = [
    [120, 80, 18], [320, 120, 22], [480, 90, 14], [200, 220, 16],
    [380, 280, 20], [520, 320, 14], [120, 360, 18], [300, 420, 22], [460, 460, 16],
  ];
  return (
    <>
      <svg
        className="absolute -top-12 -left-12"
        width="220" height="220" viewBox="0 0 220 220" aria-hidden
      >
        <circle cx="60" cy="60" r="120" fill="oklch(0.82 0.12 35)" opacity="0.6" />
        <circle cx="60" cy="60" r="90" fill="oklch(0.78 0.14 30)" opacity="0.7" />
        <circle cx="60" cy="60" r="60" fill="var(--color-accent)" opacity="0.7" />
      </svg>
      <svg className="absolute inset-0 h-full w-full text-sparkle" viewBox="0 0 600 500" aria-hidden>
        {pts.map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d={`M0 -${s} L${s * 0.25} -${s * 0.25} L${s} 0 L${s * 0.25} ${s * 0.25} L0 ${s} L-${s * 0.25} ${s * 0.25} L-${s} 0 L-${s * 0.25} -${s * 0.25} Z`}
              fill="currentColor"
            />
          </g>
        ))}
      </svg>
    </>
  );
}

function DashCurve() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full text-accent/50"
      viewBox="0 0 600 60"
      fill="none"
      aria-hidden
    >
      <path d="M0 50 Q300 0 600 50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
    </svg>
  );
}
