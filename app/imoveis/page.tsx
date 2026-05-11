"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { NovoImovelModal, type ImovelData } from "@/components/modals/NovoImovelModal";

type Imovel = ImovelData & {
  id: string;
  area: string;
  units: string;
  occ: number;
  offline?: boolean;
};

const properties: Imovel[] = [
  {
    id: "villa-jurere-07",
    nome: "Villa Jurerê 07",
    tipo: "casa",
    descricao: "Casa pé na areia em Jurerê Internacional, 3 quartos, 6 hóspedes.",
    cor: "bg-capa-1",
    endereco: "Av. dos Búzios, 1207",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88053-700",
    pais: "Brasil",
    latitude: "-27.4376",
    longitude: "-48.4960",
    area: "Jurerê Internacional",
    units: "3/3",
    occ: 1,
  },
  {
    id: "residencial-praia-mole",
    nome: "Residencial Praia Mole",
    tipo: "edificio",
    descricao: "Edifício pé na areia, 6 unidades, vista mar.",
    cor: "bg-capa-5",
    endereco: "Estrada Geral da Barra, 980",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88062-100",
    pais: "Brasil",
    latitude: "-27.6020",
    longitude: "-48.4250",
    area: "Praia Mole",
    units: "5/6",
    occ: 2,
  },
  {
    id: "edificio-canasvieiras",
    nome: "Edifício Canasvieiras",
    tipo: "edificio",
    descricao: "4 apartamentos próximos da praia central de Canasvieiras.",
    cor: "bg-capa-sage",
    endereco: "Rua das Acácias, 540",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88054-100",
    pais: "Brasil",
    area: "Canasvieiras",
    units: "4/4",
    occ: 2,
  },
  {
    id: "casa-lagoa-azul",
    nome: "Casa Lagoa Azul",
    tipo: "casa",
    descricao: "Casa charmosa, 2 quartos, deck no jardim.",
    cor: "bg-capa-olive",
    endereco: "Rod. Jornalista Manoel de Menezes, 2300",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88062-500",
    pais: "Brasil",
    area: "Lagoa da Conceição",
    units: "2/2",
    occ: 0,
  },
  {
    id: "cobertura-barra-sul",
    nome: "Cobertura Barra Sul",
    tipo: "edificio",
    descricao: "Cobertura panorâmica · em reforma até maio.",
    cor: "bg-capa-1",
    endereco: "Rua dos Pescadores, 88",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88061-700",
    pais: "Brasil",
    area: "Barra da Lagoa",
    units: "8/8",
    occ: 0,
    offline: true,
  },
  {
    id: "conjunto-ingleses-beach",
    nome: "Conjunto Ingleses Beach",
    tipo: "resort",
    descricao: "Conjunto com 8 apartamentos próximos à orla.",
    cor: "bg-capa-7",
    endereco: "Rua das Gaivotas, 410",
    cidade: "Florianópolis",
    uf: "SC",
    cep: "88058-700",
    pais: "Brasil",
    area: "Ingleses",
    units: "8/8",
    occ: 0,
  },
];

export default function ImoveisPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editing, setEditing] = useState<Imovel | null>(null);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-[26px] tracking-tight text-ink">
              Imóveis <span className="text-ink-3">6 · 15 unidades</span>
            </h1>
            <p className="mt-1 text-[13px] text-ink-3">
              Imóveis do tenant atual, unidades e regras de estadia.
            </p>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-white hover:bg-accent-hover"
          >
            <PlusIcon /> Novo imóvel
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setEditing(p)}
              className="overflow-hidden rounded-2xl border border-line bg-bg-card text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className={`relative grid h-[110px] place-items-center ${p.cor}`}>
                {p.offline && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg-card/90 px-2 py-0.5 text-[11px] font-medium text-accent-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Fora de operação
                  </span>
                )}
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-bg-card/40 text-white">
                  <PicIcon />
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-semibold text-ink">{p.nome}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-ink-3">
                  <PinIcon /> {p.area}
                </p>
                <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                  <div>
                    <div className="font-serif text-xl text-ink">{p.units}</div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-3">
                      unidades ativas
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-xl text-ink">{p.occ}</div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-3">
                      ocupadas hoje
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <NovoImovelModal open={openCreate} onClose={() => setOpenCreate(false)} />
      <NovoImovelModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        initialData={editing ?? undefined}
        mode="edit"
      />
    </AppShell>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function PicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7">
      <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="1.5" /><path d="m3 17 5-4 4 3 5-5 4 4" />
    </svg>
  );
}
