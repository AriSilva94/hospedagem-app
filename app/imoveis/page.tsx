"use client";

import { useState } from "react";
import { Image as ImageIcon, MapPin, Plus } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Badge, Button, Card } from "@/components/ui";
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
      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="font-serif text-xl tracking-tight text-ink sm:text-[26px]">
              Imóveis <span className="text-ink-3">6 · 15 unidades</span>
            </h1>
            <p className="mt-1 text-[13px] text-ink-3">
              Imóveis do tenant atual, unidades e regras de estadia.
            </p>
          </div>
          <Button onClick={() => setOpenCreate(true)} size="sm">
            <Plus size={14} strokeWidth={2.5} /> Novo imóvel
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setEditing(p)}
              className="text-left transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Card className="hover:shadow-md">
                <div className={`relative grid h-[90px] place-items-center sm:h-[110px] ${p.cor}`}>
                  {p.offline && (
                    <Badge tone="accent" size="sm" className="absolute left-3 top-3 bg-bg-card/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Fora de operação
                    </Badge>
                  )}
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-bg-card/40 text-white">
                    <ImageIcon size={22} strokeWidth={1.5} opacity={0.7} />
                  </span>
                </div>
                <Card.Body padding="md">
                  <h3 className="text-[15px] font-semibold text-ink">{p.nome}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-ink-3">
                    <MapPin size={12} strokeWidth={1.8} /> {p.area}
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
                </Card.Body>
              </Card>
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
