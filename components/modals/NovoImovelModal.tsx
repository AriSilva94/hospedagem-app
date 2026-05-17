"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import {
  Avatar,
  Button,
  Field,
  Input,
  Modal,
  RadioCard,
  Select,
  StepBar,
  Textarea,
  type SelectOption,
} from "@/components/ui";

let _unitIdCounter = 0;
function nextUnitId() {
  _unitIdCounter += 1;
  return `unit-${_unitIdCounter}`;
}

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

const UNIT_TIPO_OPTIONS: SelectOption[] = UNIT_TIPOS.map((t) => ({
  value: t,
  label: t,
}));

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
  id: string;
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

type CoverTone =
  | "capa-1" | "capa-2" | "capa-3" | "capa-4" | "capa-5"
  | "capa-6" | "capa-7" | "capa-8" | "capa-9";

function coverToTone(cor: string): CoverTone {
  return cor.replace("bg-", "") as CoverTone;
}

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
      id: nextUnitId(),
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
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={mode === "edit" ? "Editar imóvel" : "Novo imóvel"}
      size="lg"
    >
      <Modal.Header
        title={headerName}
        subtitle={`Etapa ${step} de 3 · ${stepTitle}`}
        leading={
          <Avatar tone={coverToTone(data.cor)} shape="rounded">
            <Building2 size={20} strokeWidth={1.8} />
          </Avatar>
        }
        onClose={onClose}
      />
      <StepBar total={3} current={step} density="compact" className="px-4 pt-3 sm:px-6" />
      <Modal.Body>
        {step === 1 && <StepIdentificacao data={data} set={set} />}
        {step === 2 && <StepEndereco data={data} set={set} />}
        {step === 3 && <StepUnidades units={units} setUnits={setUnits} />}
      </Modal.Body>
      <Modal.Footer>
        <span className="hidden text-[12px] text-ink-3 sm:inline">{hint}</span>
        <div className="ml-auto flex items-center gap-2">
          {step > 1 && (
            <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>
              Voltar
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="hidden sm:inline-flex"
          >
            Cancelar
          </Button>
          <Button size="sm" onClick={next}>
            {primaryLabel}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function StepIdentificacao({
  data,
  set,
}: {
  data: ImovelData;
  set: <K extends keyof ImovelData>(k: K, v: ImovelData[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Nome do imóvel" required hint="Como aparece para a equipe e no portal do hóspede.">
        <Input
          value={data.nome}
          onChange={(e) => set("nome", e.target.value)}
          placeholder="Ex.: Villa Jurerê 12"
          className="border-accent ring-4 ring-accent-soft"
        />
      </Field>

      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
          Tipo do imóvel <span className="text-accent">*</span>
        </span>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TIPOS.map((t) => (
            <RadioCard
              key={t.id}
              selected={data.tipo === t.id}
              onClick={() => set("tipo", t.id)}
              title={t.title}
              description={t.desc}
            />
          ))}
        </div>
      </div>

      <Field
        label="Descrição"
        required
        hint={`Mínimo 10 caracteres · ${data.descricao.length}/500`}
      >
        <Textarea
          rows={3}
          value={data.descricao}
          onChange={(e) => set("descricao", e.target.value)}
          placeholder="Conte sobre o imóvel — diferenciais, vista, localização, perfil de hóspede..."
        />
      </Field>

      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
          Cor de capa
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {COVER_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => set("cor", c)}
              aria-label={`cor ${c}`}
              className={`h-8 w-8 rounded-lg ring-offset-2 transition-shadow ${c} ${c === data.cor ? "ring-2 ring-accent" : ""}`}
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
          size="sm"
          value={data.endereco ?? ""}
          onChange={(e) => set("endereco", e.target.value)}
          placeholder="Rua, número e complemento"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <Field label="Cidade" required>
            <Input
              size="sm"
              value={data.cidade ?? ""}
              onChange={(e) => set("cidade", e.target.value)}
              placeholder="Florianópolis"
            />
          </Field>
        </div>
        <Field label="Estado / UF" required>
          <Input
            size="sm"
            value={data.uf ?? ""}
            onChange={(e) => set("uf", e.target.value)}
            placeholder="SC"
          />
        </Field>
        <Field label="CEP" required>
          <Input
            size="sm"
            value={data.cep ?? ""}
            onChange={(e) => set("cep", e.target.value)}
            placeholder="00000-000"
          />
        </Field>
      </div>

      <Field label="País" required>
        <Input
          size="sm"
          value={data.pais ?? ""}
          onChange={(e) => set("pais", e.target.value)}
          placeholder="Brasil"
        />
      </Field>

      <div className="pt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[13.5px] font-semibold text-ink">Coordenadas</span>
          <span className="text-[12px] text-ink-3">opcional · usadas para o mapa do hóspede</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Field label="Latitude">
            <Input
              size="sm"
              value={data.latitude ?? ""}
              onChange={(e) => set("latitude", e.target.value)}
              placeholder="-27.4376"
            />
          </Field>
          <Field label="Longitude">
            <Input
              size="sm"
              value={data.longitude ?? ""}
              onChange={(e) => set("longitude", e.target.value)}
              placeholder="-48.4279"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

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
        id: nextUnitId(),
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
        <Button variant="outline" size="sm" onClick={addType}>
          + Adicionar tipo
        </Button>
      </div>

      <ul className="flex flex-col gap-3">
        {units.map((u, i) => (
          <li key={u.id} className="relative rounded-xl border border-line-strong bg-bg-card p-4">
            <span className="absolute -left-1 top-3 inline-flex h-6 w-8 items-center justify-center rounded-md bg-accent text-[11px] font-semibold text-white sm:-left-2">
              +{u.quantidade}
            </span>

            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-[1.6fr_1fr_0.8fr] sm:pl-6">
              <Field label="Nome do tipo" required>
                <Input
                  size="sm"
                  value={u.nome}
                  onChange={(e) => update(i, { nome: e.target.value })}
                  placeholder="Apto Standard"
                />
              </Field>
              <Field label="Tipo" required>
                <Select
                  size="sm"
                  options={UNIT_TIPO_OPTIONS}
                  value={u.tipo}
                  onValueChange={(v) => update(i, { tipo: v })}
                  aria-label="Tipo de unidade"
                />
              </Field>
              <Field label="Quantidade" required>
                <Input
                  size="sm"
                  type="number"
                  value={String(u.quantidade)}
                  onChange={(e) => update(i, { quantidade: Number(e.target.value) || 0 })}
                />
              </Field>
            </div>

            <div className="mt-3 pl-4 sm:pl-6">
              <Field label="Descrição" required>
                <Textarea
                  value={u.descricao}
                  onChange={(e) => update(i, { descricao: e.target.value })}
                  rows={2}
                  placeholder="Características compartilhadas por todas as unidades deste tipo..."
                />
              </Field>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 pl-4 sm:grid-cols-3 sm:pl-6 lg:grid-cols-5">
              <Field label="Andar">
                <Input size="sm" value={u.andar} onChange={(e) => update(i, { andar: e.target.value })} />
              </Field>
              <Field label="Quartos" required>
                <Input size="sm" type="number" value={String(u.quartos)} onChange={(e) => update(i, { quartos: Number(e.target.value) || 0 })} />
              </Field>
              <Field label="Capacidade" required>
                <Input size="sm" type="number" value={String(u.capacidade)} onChange={(e) => update(i, { capacidade: Number(e.target.value) || 0 })} />
              </Field>
              <Field label="m²" required>
                <Input size="sm" type="number" value={String(u.area)} onChange={(e) => update(i, { area: Number(e.target.value) || 0 })} />
              </Field>
              <Field label="Diária R$" required>
                <Input size="sm" type="number" value={String(u.diaria)} onChange={(e) => update(i, { diaria: Number(e.target.value) || 0 })} />
              </Field>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
