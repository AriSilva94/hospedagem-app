# Responsividade — Design

**Data:** 2026-05-11
**Escopo:** Home, Boas-vindas, Dashboard, Imóveis, Shell (Sidebar/TopBar), Modal Novo Imóvel
**Stack:** Next 16, React 19, Tailwind v4 (custom theme em `app/globals.css`)

## Objetivo

Eliminar quebras de layout, overflows horizontais e tamanhos exagerados em telas pequenas (320px+), preservando o look atual em ≥ 1024px. Suporte alvo: mobile 320–767, tablet 768–1023, laptop 1024–1439, desktop ≥ 1440.

## Decisões alinhadas

- **Mobile shell:** hamburger + drawer off-canvas (Sidebar vira drawer em `< md`).
- **Type scale:** escalar por breakpoint; desktop intacto.
- **Min width:** 320px (iPhone SE).

## Breakpoints

Usar defaults Tailwind v4: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Para 320–639px, classes base (sem prefixo) representam o mobile.

## Mudanças por arquivo

### `components/shell/AppShell.tsx`
- Adicionar `useState<boolean>("mobileNavOpen")`.
- Trocar `h-screen` por `min-h-screen lg:h-screen` para liberar scroll natural em mobile.
- Passar `mobileNavOpen` + `setMobileNavOpen` para `Sidebar` e `TopBar`.
- Marcar como `"use client"` (já dependente de `Sidebar` que usa client; AppShell precisa do state).

### `components/shell/Sidebar.tsx`
- Desktop (`md+`): `hidden md:flex` mantém comportamento atual (w-14, ícones).
- Mobile (`< md`): drawer `fixed inset-y-0 left-0 z-50 w-64` com backdrop `fixed inset-0 z-40 bg-ink/30` quando `mobileNavOpen`.
- Drawer: itens com `Icon + label` (não só ícone). Header com logo + close button.
- Fechar em: backdrop click, item click, tecla Esc.
- Transition: `transform translate-x-0` aberto, `-translate-x-full` fechado, `transition-transform`.

### `components/shell/TopBar.tsx`
- Botão hamburger `md:hidden` à esquerda (chama `setMobileNavOpen(true)`).
- Tenant-switcher: subline `Mar & Sal · 24 unidades...` com `hidden sm:flex` (só nome em `< sm`).
- Busca: `hidden lg:block` (no mobile/tablet some — atalho global pode entrar depois).
- Botão `PT` e `MoonIcon`: `hidden sm:inline-flex`.
- Botão `BellIcon`: sempre visível.
- "Nova reserva": `< md` apenas ícone `+` (label `hidden md:inline`), `md+` ícone+label.
- Avatar: sempre visível.
- Container TopBar: `gap-2 sm:gap-4`, `px-3 sm:px-5`.

### `app/page.tsx` (Home)
- Header: `px-4 sm:px-6 lg:px-10`, `py-4 sm:py-5`.
- Main: `px-4 sm:px-6 lg:px-10`, `py-10 sm:py-16 lg:py-24`, `gap-8 sm:gap-12 lg:gap-20`.
- Hero h1: `text-[40px] sm:text-[52px] lg:text-[64px]` com `leading-[1.1] lg:leading-[1.05]`.
- Hero parágrafo: `text-[15px] sm:text-[17px]`.
- Botões hero: `w-full sm:w-auto` no primário se necessário; manter `flex-wrap`.
- Stats: `gap-6 sm:gap-10`, valor `text-2xl sm:text-[30px]`.
- Auth card: `max-w-full sm:max-w-md`, `p-5 sm:p-7`. Section justify `justify-center` (remover `lg:justify-end` que pode jogar pra fora em viewport intermediária — manter mas validar).
- Tabs/inputs: já têm `h-11/h-12` ok.

### `app/boas-vindas/page.tsx`
- Wrapper: `min-h-screen flex flex-col` (em vez de `h-screen`), padding `p-3 sm:p-4 lg:p-8`.
- Card interno: `max-w-[1240px] flex-1 flex flex-col rounded-2xl sm:rounded-3xl`. Remover `min-h-0 overflow-hidden` que prendem scroll mobile; permitir `overflow-y-auto` natural na coluna esquerda.
- Progress bar: `px-4 sm:px-8 pt-3 sm:pt-4`.
- Grid conteúdo: `grid-cols-1 lg:grid-cols-2`. Coluna esquerda: `px-5 py-8 sm:px-10 sm:py-12 lg:px-16`.
- Headings (StepWelcome/Profile/Property/Done): `text-3xl sm:text-4xl lg:text-5xl`.
- Footer: `flex-wrap gap-3 px-4 sm:px-8 py-4 sm:py-5`. Botões `Pular` e ações em ordem natural com wrap.
- StepProperty grid `grid-cols-[2fr_1fr_1fr]` → `grid-cols-1 sm:grid-cols-[2fr_1fr_1fr]`.
- StepUnits:
  - Top grid `grid-cols-[2fr_1fr]` → `grid-cols-1 sm:grid-cols-[2fr_1fr]`.
  - 4-col grid (Andar/Capacidade/Quartos/Tamanho) → `grid-cols-2 sm:grid-cols-4`.
- Tipos pills (chips): já `flex-wrap` ok.

### `app/dashboard/page.tsx`
- Container: `p-4 sm:p-6`, `gap-4 sm:gap-6`.
- Hero h1: `text-xl sm:text-2xl lg:text-[28px]`.
- Pills row: já `flex-wrap` ok.
- Stats grid: já bom.
- Timeline section:
  - Header padding `px-4 sm:px-5 py-3 sm:py-4`.
  - Item `<li>`: `gap-3 sm:gap-4 px-3 sm:px-5 py-3`.
  - `KindBadge`: `w-20 sm:w-24 shrink-0`.
  - Time span: `w-10 sm:w-12 shrink-0`.
  - Center info: `min-w-0` para não estourar (truncate em title se preciso).
  - Status pill: `shrink-0`.
  - `ChevronRight`: `hidden sm:block`.
- Alerts:
  - Header: `px-4 sm:px-5`.
  - Item: `px-4 sm:px-5 py-3 sm:py-4`, info `min-w-0`.

### `app/imoveis/page.tsx`
- Container: `p-4 sm:p-6`.
- Header h1: `text-xl sm:text-[26px]`.
- Cards grid: já `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` ok.
- Card capa: `h-[90px] sm:h-[110px]`.
- Card body: `p-3 sm:p-4`.

### `components/modals/NovoImovelModal.tsx`
- Wrapper modal: padding overlay `p-3 sm:p-4`. Container modal: `w-full max-w-[95vw] sm:max-w-[620px] max-h-[95vh] sm:max-h-[90vh]`.
- Header: `px-4 sm:px-6 py-3 sm:py-4`.
- StepBar: `px-4 sm:px-6`.
- Conteúdo scroll: `px-4 sm:px-6 py-4 sm:py-5`.
- Footer: `flex-wrap gap-2 px-4 sm:px-6 py-3`. Hint pode esconder `< sm` (`hidden sm:inline`). Cancelar `hidden sm:inline-flex` (Voltar+Continuar suficientes em mobile).
- StepIdentificacao: tipos grid `grid-cols-1 sm:grid-cols-2`.
- StepEndereco:
  - `grid-cols-[1.6fr_1fr_1fr]` (Cidade/UF/CEP) → `grid-cols-2 sm:grid-cols-[1.6fr_1fr_1fr]`. UF+CEP juntos no mobile, Cidade ocupa ambas (`col-span-2`).
- StepUnidades:
  - Top grid `grid-cols-[1.6fr_1fr_0.8fr]` → `grid-cols-1 sm:grid-cols-[1.6fr_1fr_0.8fr]`.
  - 5-col grid (Andar/Quartos/Capacidade/m²/Diária) → `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`.
  - Item `<li>`: `pl-4 sm:pl-6` (badge `+N` reposicionada para `-left-1 sm:-left-2`).

## Componentes não tocados

- `lib/cn.ts` — utility, sem mudança.
- Ícones SVG — sem mudança.
- Paleta/tokens em `globals.css` — sem mudança.
- Lógica de estado/forms — sem mudança.

## Critérios de aceite

- Sem scroll horizontal nas larguras 320, 375, 414, 768, 1024, 1280, 1440 nas 4 páginas + modal aberto.
- Layout desktop (≥ 1024px) visualmente idêntico ao snapshot atual (comparar com PNGs `dash-v2.png`, `boas-vindas-v2.png`, `imoveis.png`).
- Drawer mobile: abre via hamburger, fecha via backdrop/Esc/click em item, sem flicker.
- Modal: header e footer sempre visíveis em viewport mobile (conteúdo rola internamente).
- Form fields no modal: nenhum input transborda em 320px.
- Headings hero não causam wrap feio em 320px (testar string mais longa).

## Fora de escopo

- Dark mode toggle funcional (já há tokens, sem UI conectada).
- Atalho global de busca (substituir input em mobile por overlay full-screen).
- Animações além de `transition-transform` no drawer.
- Refatorar para extrair primitivos (`Container`, `useMediaQuery`).
- Tradução/i18n.
