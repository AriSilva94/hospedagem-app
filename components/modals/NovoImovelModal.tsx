"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const TIPOS = [
  { id: "edificio", title: "Edifício / Condomínio", desc: "Várias unidades em um prédio" },
  { id: "casa", title: "Casa inteira", desc: "Aluguel de uma única unidade" },
  { id: "boutique", title: "Boutique", desc: "Quartos individuais" },
  { id: "resort", title: "Resort / Pousada", desc: "Múltiplas unidades + áreas comuns" },
];

const COVER_COLORS = [
  "bg-capa-1", "bg-capa-2", "bg-capa-3",
  "bg-capa-4", "bg-capa-5", "bg-capa-6",
  "bg-capa-7", "bg-capa-8", "bg-capa-9",
];

const UNIT_TIPOS = ["Apartamento", "Suíte", "Studio", "Loft", "Quarto", "Cobertura", "Bangalô"];

export type ImovelData = {
  id?: string;
  nome: string;
  tipo: string;
  descricao: string;
  cor: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  pais?: string;
  latitude?: string;
  longitude?: string;
};

export type UnitType = {
  nome: string;
  tipo: string;
  quantidade: number;
  descricao: string;
  andar: string;
  quartos: number;
  capacidade: number;
  area: number;
  diaria: number;
};

const EMPTY: ImovelData = {
  nome: "",
  tipo: "edificio",
  descricao: "",
  cor: COVER_COLORS[0],
  endereco: "",
  cidade: "",
  uf: "SC",
  cep: "",
  pais: "Brasil",
  latitude: "",
  longitude: "",
};

export function NovoImovelModal({
  open,
  onClose,
  initialData,
  mode = "create",
}: {
  open: boolean;
  onClose: () => void;
  initialData?: ImovelData;
  mode?: "create" | "edit";
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ImovelData>(initialData ?? EMPTY);
  const [units, setUnits] = useState<UnitType[]>([
    {
      nome: "Apto Standard",
      tipo: "Apartamento",
      quantidade: 1,
      descricao: "",
      andar: "1",
      quartos: 1,
      capacidade: 2,
      area: 45,
      diaria: 350,
    },
  ]);

  useEffect(() => {
    if (open) {
      setData(initialData ?? EMPTY);
      setStep(1);
    }
  }, [open, initialData]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function set<K extends keyof ImovelData>(key: K, value: ImovelData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function next() {
    if (step >= 3) {
      onClose();
      return;
    }
    setStep((s) => s + 1);
  }

  const stepTitle =
    step === 1 ? "Identificação" : step === 2 ? "Endereço" : "Unidades";

  const headerName = data.nome.trim() || (mode === "edit" ? "Imóvel" : "Novo imóvel");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="Fechar overlay"
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl bg-bg-card shadow-lg">
        <header className="flex items-start justify-between gap-3 border-b border-line px-6 py-4">
          <div className="flex items-center gap-3">
            <span className={cn("grid h-10 w-10 place-items-center rounded-xl", data.cor)}>
              <BuildingIcon />
            </span>
            <div className="flex flex-col leading-tight">
              <h2 className="text-[17px] font-semibold text-ink">{headerName}</h2>
              <p className="text-[12px] text-ink-3">
                Etapa {step} de 3 · {stepTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-3 hover:bg-panel hover:text-ink"
            aria-label="Fechar"
          >
            ✕
          </button>
        </header>

        <StepBar step={step} />

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 && <StepIdentificacao data={data} set={set} />}
          {step === 2 && <StepEndereco data={data} set={set} />}
          {step === 3 && (
            <StepUnidades
              units={units}
              setUnits={setUnits}
            />
          )}
        </div>

        <Footer
          step={step}
          units={units}
          onCancel={onClose}
          onBack={() => setStep((s) => s - 1)}
          onNext={next}
          mode={mode}
        />
      </div>
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1 px-6 pt-3">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "h-[3px] flex-1 rounded-full",
            i < step && "bg-ink",
            i === step && "bg-accent",
            i > step && "bg-line-soft"
          )}
        />
      ))}
    </div>
  );
}

function Footer({
  step,
  units,
  onCancel,
  onBack,
  onNext,
  mode,
}: {
  step: number;
  units: UnitType[];
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  mode: "create" | "edit";
}) {
  const totalUnits = units.reduce((s, u) => s + u.quantidade, 0);
  const hint =
    step === 1
      ? "Campos com * são obrigatórios"
      : step === 2
        ? "Coordenadas são opcionais"
        : `${totalUnits} unidade${totalUnits === 1 ? "" : "s"} em ${units.length} tipo${units.length === 1 ? "" : "s"}`;

  const primaryLabel =
    step === 3
      ? mode === "edit"
        ? "Salvar alterações"
        : "Criar imóvel"
      : "Continuar ›";

  return (
    <footer className="flex items-center justify-between gap-3 border-t border-line px-6 py-3">
      <span className="text-[12px] text-ink-3">{hint}</span>
      <div className="flex items-center gap-2">
        {step > 1 && (
          <button
            onClick={onBack}
            className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-ink-2 hover:bg-panel"
          >
            Voltar
          </button>
        )}
        <button
          onClick={onCancel}
          className="inline-flex h-9 items-center rounded-full border border-line-strong bg-bg-card px-4 text-[13px] font-medium text-ink hover:bg-panel"
        >
          Cancelar
        </button>
        <button
          onClick={onNext}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-medium text-white hover:bg-accent-hover"
        >
          {primaryLabel}
        </button>
      </div>
    </footer>
  );
}

/* ---------- Step 1: Identificação ---------- */

function StepIdentificacao({
  data,
  set,
}: {
  data: ImovelData;
  set: <K extends keyof ImovelData>(k: K, v: ImovelData[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Nome do imóvel" required>
        <input
          type="text"
          value={data.nome}
          onChange={(e) => set("nome", e.target.value)}
          placeholder="Ex.: Villa Jurerê 12"
          className="h-11 w-full rounded-xl border border-accent bg-bg-card px-4 text-[14px] text-ink outline-none ring-4 ring-accent-soft placeholder:text-ink-4"
        />
        <Hint>Como aparece para a equipe e no portal do hóspede.</Hint>
      </Field>

      <div>
        <Label required>Tipo do imóvel</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => set("tipo", t.id)}
              className={cn(
                "flex items-start gap-2 rounded-xl border p-3 text-left transition-colors",
                data.tipo === t.id
                  ? "border-accent bg-accent-soft"
                  : "border-line-strong bg-bg-card hover:bg-panel"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                  data.tipo === t.id ? "border-accent" : "border-line-strong"
                )}
              >
                {data.tipo === t.id && <span className="h-2 w-2 rounded-full bg-accent" />}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-ink">{t.title}</span>
                <span className="text-[12px] text-ink-3">{t.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Field label="Descrição" required>
        <textarea
          rows={3}
          value={data.descricao}
          onChange={(e) => set("descricao", e.target.value)}
          placeholder="Conte sobre o imóvel — diferenciais, vista, localização, perfil de hóspede..."
          className="w-full rounded-xl border border-line-strong bg-bg-card px-4 py-3 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
        />
        <Hint>Mínimo 10 caracteres · {data.descricao.length}/500</Hint>
      </Field>

      <div>
        <Label>Cor de capa</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COVER_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => set("cor", c)}
              className={cn(
                "h-8 w-8 rounded-lg ring-offset-2 transition-shadow",
                c,
                c === data.cor && "ring-2 ring-accent"
              )}
              aria-label={`cor ${c}`}
            />
          ))}
        </div>
        <p className="mt-2 text-[12px] text-ink-3">
          Usada nos cards e no calendário para identificar o imóvel rapidamente.
        </p>
      </div>
    </div>
  );
}

/* ---------- Step 2: Endereço ---------- */

function StepEndereco({
  data,
  set,
}: {
  data: ImovelData;
  set: <K extends keyof ImovelData>(k: K, v: ImovelData[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Endereço" required>
        <Input
          value={data.endereco ?? ""}
          onChange={(v) => set("endereco", v)}
          placeholder="Rua, número e complemento"
        />
      </Field>

      <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3">
        <Field label="Cidade" required>
          <Input value={data.cidade ?? ""} onChange={(v) => set("cidade", v)} placeholder="Florianópolis" />
        </Field>
        <Field label="Estado / UF" required>
          <Input value={data.uf ?? ""} onChange={(v) => set("uf", v)} placeholder="SC" />
        </Field>
        <Field label="CEP" required>
          <Input value={data.cep ?? ""} onChange={(v) => set("cep", v)} placeholder="00000-000" />
        </Field>
      </div>

      <Field label="País" required>
        <Input value={data.pais ?? ""} onChange={(v) => set("pais", v)} placeholder="Brasil" />
      </Field>

      <div className="pt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[13.5px] font-semibold text-ink">Coordenadas</span>
          <span className="text-[12px] text-ink-3">opcional · usadas para o mapa do hóspede</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Field label="Latitude">
            <Input value={data.latitude ?? ""} onChange={(v) => set("latitude", v)} placeholder="-27.4376" />
          </Field>
          <Field label="Longitude">
            <Input value={data.longitude ?? ""} onChange={(v) => set("longitude", v)} placeholder="-48.4279" />
          </Field>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: Unidades ---------- */

function StepUnidades({
  units,
  setUnits,
}: {
  units: UnitType[];
  setUnits: React.Dispatch<React.SetStateAction<UnitType[]>>;
}) {
  const total = units.reduce((s, u) => s + u.quantidade, 0);

  function update(idx: number, patch: Partial<UnitType>) {
    setUnits((arr) => arr.map((u, i) => (i === idx ? { ...u, ...patch } : u)));
  }

  function addType() {
    setUnits((arr) => [
      ...arr,
      {
        nome: "",
        tipo: "Apartamento",
        quantidade: 1,
        descricao: "",
        andar: "",
        quartos: 1,
        capacidade: 2,
        area: 30,
        diaria: 250,
      },
    ]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14.5px] font-semibold text-ink">Tipos de unidade</h3>
          <p className="text-[12px] text-ink-3">
            Defina cada tipo uma única vez e diga quantas unidades existem desse
            tipo. Total: <span className="font-medium text-ink-2">{total} unidade{total === 1 ? "" : "s"}</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={addType}
          className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-line-strong bg-bg-card px-3 text-[12.5px] font-medium text-ink hover:bg-panel"
        >
          + Adicionar tipo
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {units.map((u, i) => (
          <li
            key={i}
            className="relative rounded-xl border border-line-strong bg-bg-card p-4"
          >
            <span className="absolute -left-2 top-3 inline-flex h-6 w-8 items-center justify-center rounded-md bg-accent text-[11px] font-semibold text-white">
              +{u.quantidade}
            </span>

            <div className="grid grid-cols-[1.6fr_1fr_0.8fr] gap-3 pl-6">
              <Field label="Nome do tipo" required>
                <Input value={u.nome} onChange={(v) => update(i, { nome: v })} placeholder="Apto Standard" />
              </Field>
              <Field label="Tipo" required>
                <select
                  value={u.tipo}
                  onChange={(e) => update(i, { tipo: e.target.value })}
                  className="h-10 w-full rounded-lg border border-line-strong bg-bg-card px-3 text-[13.5px] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft"
                >
                  {UNIT_TIPOS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Quantidade" required>
                <Input
                  type="number"
                  value={String(u.quantidade)}
                  onChange={(v) => update(i, { quantidade: Number(v) || 0 })}
                />
              </Field>
            </div>

            <div className="mt-3 pl-6">
              <Field label="Descrição" required>
                <textarea
                  value={u.descricao}
                  onChange={(e) => update(i, { descricao: e.target.value })}
                  rows={2}
                  placeholder="Características compartilhadas por todas as unidades deste tipo..."
                  className="w-full rounded-lg border border-line-strong bg-bg-card px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
                />
              </Field>
            </div>

            <div className="mt-3 grid grid-cols-[0.8fr_0.9fr_1.1fr_0.8fr_1fr] gap-2 pl-6">
              <Field label="Andar"><Input value={u.andar} onChange={(v) => update(i, { andar: v })} /></Field>
              <Field label="Quartos" required><Input type="number" value={String(u.quartos)} onChange={(v) => update(i, { quartos: Number(v) || 0 })} /></Field>
              <Field label="Capacidade" required><Input type="number" value={String(u.capacidade)} onChange={(v) => update(i, { capacidade: Number(v) || 0 })} /></Field>
              <Field label="m²" required><Input type="number" value={String(u.area)} onChange={(v) => update(i, { area: Number(v) || 0 })} /></Field>
              <Field label="Diária R$" required><Input type="number" value={String(u.diaria)} onChange={(v) => update(i, { diaria: Number(v) || 0 })} /></Field>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Atoms ---------- */

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.10em] text-ink-3">
      {children}
      {required && <span className="ml-0.5 text-accent">*</span>}
    </span>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label required={required}>{label}</Label>
      {children}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] text-ink-3">{children}</span>;
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-lg border border-line-strong bg-bg-card px-3 text-[13.5px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
    />
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
    </svg>
  );
}
