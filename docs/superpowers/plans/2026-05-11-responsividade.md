# Responsividade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Home, Boas-vindas, Dashboard, Imóveis pages and the Novo Imóvel modal usable from 320px to 1440px+ without altering the existing desktop look.

**Architecture:** Surgical Tailwind v4 breakpoint patches per file. Adds a single piece of shared UI state (`mobileNavOpen`) in `AppShell` to power a hamburger-driven off-canvas Sidebar in `< md`. No new abstractions, no new dependencies.

**Tech Stack:** Next 16 (App Router), React 19, Tailwind v4 with custom `@theme` tokens in `app/globals.css`. No test framework configured — verification is manual via `npm run dev` + browser at multiple viewport widths.

**Spec:** [docs/superpowers/specs/2026-05-11-responsividade-design.md](../specs/2026-05-11-responsividade-design.md)

---

## File Map

- **Modify:** `components/shell/AppShell.tsx` — convert to client component, add `mobileNavOpen` state, pass to children, swap `h-screen` for `min-h-screen lg:h-screen`.
- **Modify:** `components/shell/Sidebar.tsx` — accept `mobileNavOpen` + `onClose` props, render drawer variant in `< md`, keep current rail in `md+`.
- **Modify:** `components/shell/TopBar.tsx` — accept `onOpenMenu` prop, render hamburger in `< md`, hide/collapse search and right-cluster items at small widths.
- **Modify:** `app/page.tsx` — responsive hero typography, padding, stats, auth card.
- **Modify:** `app/boas-vindas/page.tsx` — `min-h-screen` wrapper, scaled headings, footer wrap, form-grid responsive overrides.
- **Modify:** `app/dashboard/page.tsx` — page padding, h1 scale, timeline row responsive.
- **Modify:** `app/imoveis/page.tsx` — page padding, h1 scale, card cover height.
- **Modify:** `components/modals/NovoImovelModal.tsx` — viewport-aware width/height, footer wrap, step grids stack on `< sm`.

## Verification approach

No tests exist in repo. Each task ends with a manual viewport check via Chrome DevTools device toolbar at: **320, 375, 768, 1024, 1440** widths. Pass criteria: no horizontal scroll, no clipped content, no overlapping elements, desktop ≥ 1024px visually unchanged from current snapshots in repo root (`dash-v2.png`, `boas-vindas-v2.png`, `imoveis.png`, `boas-vindas-current.png`).

---

## Task 1: Shell — wire mobile drawer state

**Files:**
- Modify: `components/shell/AppShell.tsx` (full rewrite — small file)
- Modify: `components/shell/Sidebar.tsx` (add props, drawer variant)
- Modify: `components/shell/TopBar.tsx` (add hamburger prop, responsive collapse)

These three change together because the props are coupled. Compiling any one alone leaves a TS hole.

- [ ] **Step 1.1: Rewrite `components/shell/AppShell.tsx` with client state**

Replace entire file with:

```tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-bg lg:h-screen">
      <Sidebar mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-hidden">
        <TopBar onOpenMenu={() => setMobileNavOpen(true)} />
        <main className="flex-1 lg:overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
```

Notes for the implementer:
- `min-w-0` on the inner column prevents flex children (timeline rows with long titles) from forcing horizontal overflow.
- `min-h-screen` on mobile lets the page scroll naturally; `lg:h-screen` + `lg:overflow-hidden` + `lg:overflow-y-auto` preserve the current desktop pinned-shell behavior.

- [ ] **Step 1.2: Replace `components/shell/Sidebar.tsx`**

Replace entire file with:

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Painel", icon: HomeIcon },
  { href: "/imoveis", label: "Imóveis", icon: BuildingIcon },
];

type SidebarProps = {
  mobileNavOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileNavOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, onClose]);

  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 bg-ink py-4 md:flex">
        <Link
          href="/dashboard"
          className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-accent font-semibold text-white"
        >
          A
        </Link>
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon />
            </Link>
          );
        })}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity md:hidden",
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ink py-4 transition-transform md:hidden",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!mobileNavOpen}
      >
        <div className="flex items-center justify-between px-4 pb-4">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2 text-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-semibold">
              A
            </span>
            <span className="font-serif text-[18px]">Aja</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="grid h-8 w-8 place-items-center rounded-md text-white/70 hover:bg-white/5 hover:text-white"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {items.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="1.5" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  );
}
```

Notes:
- The commented-out icon stubs in the original file (ListIcon/CalendarIcon/UsersIcon/ChartIcon) are removed because they are unused. If the user later restores nav items, they can pull from git.

- [ ] **Step 1.3: Replace `components/shell/TopBar.tsx`**

Replace entire file with:

```tsx
type TopBarProps = {
  onOpenMenu: () => void;
};

export function TopBar({ onOpenMenu }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-line bg-bg px-3 sm:gap-4 sm:px-5">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-2 hover:bg-panel hover:text-ink md:hidden"
      >
        <MenuIcon />
      </button>

      <button className="flex min-w-0 items-center gap-2 rounded-full border border-line bg-bg-card py-1.5 pl-1.5 pr-3 text-left text-[13px] hover:bg-panel sm:gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[12.5px] font-semibold text-white">
          M
        </span>
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-[13px] font-semibold text-ink">Mar & Sal Properties</span>
          <span className="truncate text-[11px] text-ink-3">24 unidades · Florianópolis</span>
        </span>
        <span className="ml-1 shrink-0 text-ink-3"><ChevronDown /></span>
      </button>

      <div className="relative mx-auto hidden w-full max-w-[480px] lg:block">
        <SearchIcon />
        <input
          type="text"
          placeholder="Buscar reservas, hóspedes, unidades..."
          className="h-9 w-full rounded-full border border-line bg-bg-card pl-9 pr-12 text-[13px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-line bg-bg-sunken px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
        <button className="hidden rounded-md px-2 py-1 text-[12px] font-medium text-ink-2 hover:bg-panel sm:inline-flex">
          PT
        </button>
        <IconButton className="hidden sm:grid"><MoonIcon /></IconButton>
        <IconButton><BellIcon /></IconButton>
        <button className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-3 text-[13px] font-medium text-white hover:bg-accent-hover md:px-4">
          <PlusIcon />
          <span className="hidden md:inline">Nova reserva</span>
        </button>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-ink text-[12px] font-semibold text-white">
          AO
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`grid h-9 w-9 place-items-center rounded-md text-ink-2 hover:bg-panel hover:text-ink ${className}`}>
      {children}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z" /><path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
```

- [ ] **Step 1.4: Boot dev server and verify shell**

Run: `npm run dev`
Expected: server boots without TS errors. If TS errors mention missing `onOpenMenu` or `mobileNavOpen` props, you missed a file.

- [ ] **Step 1.5: Manual viewport check at 320 / 768 / 1024 / 1440**

Open `http://localhost:3000/dashboard` in Chrome with DevTools device toolbar.

Verify:
- 320: hamburger visible left of tenant chip; tenant subline hidden; only Bell + "+" + avatar in right cluster; no horizontal scroll.
- 768 (tablet): hamburger still visible (md is 768, so it disappears starting at 768 — at exactly 768 hamburger is hidden, sidebar rail is shown). Re-check at 767 (hamburger visible) and 768 (rail visible).
- 1024: search input appears; full right cluster.
- 1440: identical to current snapshot.
- Click hamburger at 375: drawer slides in from left with backdrop. Click backdrop → closes. Open again → press Esc → closes. Open → click "Imóveis" → drawer closes and route changes.

- [ ] **Step 1.6: Commit**

```bash
git add components/shell/AppShell.tsx components/shell/Sidebar.tsx components/shell/TopBar.tsx
git commit -m "feat(shell): mobile drawer + responsive top bar

AppShell holds mobileNavOpen state, Sidebar renders drawer variant
under md, TopBar shows hamburger + collapses search/buttons. Desktop
layout unchanged.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Home (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx` (header + main + hero + auth card)

- [ ] **Step 2.1: Update Header (component at bottom of file)**

Replace the `Header` function with:

```tsx
function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
      <a href="#" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[15px] font-semibold text-white">
          A
        </span>
        <span className="font-serif text-[20px] tracking-tight text-ink">Aja</span>
      </a>

      <nav className="hidden gap-8 text-[14px] text-ink-2 md:flex">
        <a href="#" className="hover:text-ink">Produto</a>
        <a href="#" className="hover:text-ink">Histórias</a>
        <a href="#" className="hover:text-ink">Preços</a>
        <a href="#" className="hover:text-ink">Contato</a>
      </nav>

      <button className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-medium text-bg-card hover:bg-ink-2 sm:px-5 sm:text-[14px]">
        Entrar <span aria-hidden>→</span>
      </button>
    </header>
  );
}
```

- [ ] **Step 2.2: Update `<main>` and hero `<section>`**

Find the line `<main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:py-24">` and replace it with:

```tsx
<main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:py-24">
```

Then change the hero h1:

```tsx
<h1 className="mt-6 font-serif text-[40px] leading-[1.1] tracking-tight text-ink sm:text-[52px] lg:text-[64px] lg:leading-[1.05]">
  A operação{" "}
  <span className="italic text-accent">se cuida.</span> Você recebe.
</h1>
```

Hero paragraph:

```tsx
<p className="mt-5 max-w-lg text-[15px] leading-[1.55] text-ink-2 sm:mt-6 sm:text-[17px]">
  Da chave ao check-out, tudo orquestrado. Aja é o sistema operacional
  dos anfitriões que tratam hospedar como ofício.
</p>
```

Hero buttons row (the wrapper after the paragraph):

```tsx
<div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5">
  <button className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-accent-hover">
    Comece grátis <span aria-hidden>→</span>
  </button>
  <button className="inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-accent">
    Ver demonstração <span aria-hidden>▸</span>
  </button>
</div>
```

Stats wrapper:

```tsx
<dl className="mt-8 flex flex-wrap gap-6 sm:gap-10">
  <Stat value="2.400+" label="imóveis ativos" />
  <Stat value="38%" label="de ocupação extra" />
  <Stat value="7 dias" label="para sair do papel" />
</dl>
```

- [ ] **Step 2.3: Scale `Stat` value**

Replace the `Stat` component at bottom of file with:

```tsx
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-[26px] leading-none text-accent sm:text-[30px]">{value}</span>
      <span className="mt-2 text-[13px] text-ink-3">{label}</span>
    </div>
  );
}
```

- [ ] **Step 2.4: Auth card section**

Find `<section className="flex items-start justify-center lg:justify-end">` and replace the inner card div className:

```tsx
<div className="w-full max-w-md rounded-2xl border border-line bg-bg-card p-5 shadow-lg sm:rounded-3xl sm:p-7">
```

- [ ] **Step 2.5: Boot dev server and viewport check**

Run: `npm run dev` (skip if already running)
Open `http://localhost:3000/`
Check 320, 375, 768, 1024, 1440. Verify:
- 320: hero text wraps cleanly, no horizontal scroll, auth card sits below hero with full width and proper padding.
- 768: still single column (lg breakpoint), card centered, comfortable reading width.
- 1024+: two-column layout returns, hero ~64px, identical to current desktop look.

- [ ] **Step 2.6: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): responsive hero, header and auth card

Scale typography by breakpoint (40/52/64), shrink padding under sm,
allow auth card to fill width on mobile.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: Boas-vindas (`app/boas-vindas/page.tsx`)

**Files:**
- Modify: `app/boas-vindas/page.tsx`

- [ ] **Step 3.1: Wrapper + card container**

Replace the outermost return up to the progress bar:

```tsx
return (
  <div className="flex min-h-screen flex-col bg-bg p-3 sm:p-4 lg:p-8">
    <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-bg-card shadow-md sm:rounded-3xl">
      {/* Progress */}
      <div className="flex gap-1.5 px-4 pt-3 sm:px-8 sm:pt-4">
```

(Removed `h-screen` → `min-h-screen`, removed `min-h-0` from card, kept `overflow-hidden` so the rounded corners clip the inner column scroll.)

- [ ] **Step 3.2: Content grid**

Find `<div className="grid h-0 flex-1 grid-cols-1 lg:grid-cols-2">` and replace with:

```tsx
<div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
  <div className="flex flex-col overflow-y-auto px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
```

- [ ] **Step 3.3: Footer**

Replace the footer block:

```tsx
{/* Footer */}
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-4 sm:px-8 sm:py-5">
  <button
    type="button"
    onClick={() => router.push("/dashboard")}
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
```

- [ ] **Step 3.4: Scale step headings**

Each of `StepWelcome`, `StepProfile`, `StepProperty`, `StepDone` opens with:

```tsx
<h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-ink">
```

Replace **every occurrence** in this file with:

```tsx
<h1 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.05]">
```

- [ ] **Step 3.5: StepProperty grid (Cidade/Estado/País)**

Find `<div className="grid grid-cols-[2fr_1fr_1fr] gap-3">` (inside `StepProperty`) and replace with:

```tsx
<div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr]">
```

- [ ] **Step 3.6: StepUnits grids**

In `StepUnits`, find `<div className="mt-3 grid grid-cols-[2fr_1fr] gap-2.5">` and replace with:

```tsx
<div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-[2fr_1fr]">
```

In the same component, find `<div className="mt-2.5 grid grid-cols-4 gap-2.5">` and replace with:

```tsx
<div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
```

- [ ] **Step 3.7: Boot dev server and viewport check**

Run: `npm run dev`
Open `http://localhost:3000/boas-vindas` and step through all 5 steps at 320, 375, 768, 1024.

Verify:
- 320: heading reads clean, no horizontal scroll on any step. Form fields full width. Cidade/Estado/País stacked. Andar/Capacidade/Quartos/Tamanho in 2x2.
- 768: still one column (illustration column appears at lg).
- 1024+: split layout with illustration restored, headings ~5xl, identical to current snapshot.
- Footer: "Pular configuração" wraps to its own row in 320 if needed without overlapping the right cluster.

- [ ] **Step 3.8: Commit**

```bash
git add app/boas-vindas/page.tsx
git commit -m "feat(boas-vindas): mobile-friendly onboarding wizard

min-h-screen wrapper, scaled headings, footer wrap, stacked form
grids under sm. Illustration column unchanged on lg+.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: Dashboard (`app/dashboard/page.tsx`)

**Files:**
- Modify: `app/dashboard/page.tsx`

- [ ] **Step 4.1: Page container + hero**

Replace the opening of the return:

```tsx
return (
  <AppShell>
    <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      {/* Hero */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-[12px] text-ink-3">Bom dia, Ana · sexta, 17 de abril</p>
          <h1 className="mt-1 font-serif text-xl tracking-tight text-ink sm:text-2xl lg:text-[28px]">
            Mar & Sal está <em className="not-italic text-accent">quase cheio</em> hoje.
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PillButton icon={<DotIcon />}>Hoje</PillButton>
          <PillButton icon={<BuildingIcon />}>Todos imóveis</PillButton>
          <PillButton icon={<ExportIcon />}>Exportar</PillButton>
        </div>
      </div>
```

- [ ] **Step 4.2: Timeline list rows**

Find the `<ul className="divide-y divide-line">` for the timeline and replace the inner `<li>` with:

```tsx
{events.map((e, i) => (
  <li key={i} className="flex items-center gap-3 px-3 py-3 hover:bg-panel sm:gap-4 sm:px-5">
    <span className="w-10 shrink-0 text-[12px] font-medium text-ink-3 tabular-nums sm:w-12">{e.time}</span>
    <KindBadge kind={e.kind} />
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[13.5px] font-medium text-ink">{e.title}</span>
      <span className="truncate text-[12px] text-ink-3">{e.meta}</span>
    </div>
    {e.status && (
      <span className={cn(
        "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        e.status.tone === "warn"
          ? "bg-warn-soft text-warn-ink"
          : "bg-slate-soft text-slate-ink"
      )}>
        {e.status.label}
      </span>
    )}
    <span className="hidden sm:block"><ChevronRight /></span>
  </li>
))}
```

- [ ] **Step 4.3: Update `KindBadge` width**

Replace the badge component:

```tsx
function KindBadge({ kind }: { kind: Event["kind"] }) {
  const palette: Record<Event["kind"], string> = {
    PARTIDA: "bg-warn-soft text-warn-ink",
    LIMPEZA: "bg-ok-soft text-ok-ink",
    CHEGADA: "bg-accent-soft text-accent-ink",
    "MANUTENÇÃO": "bg-slate-soft text-slate-ink",
  };
  return (
    <span className={cn(
      "w-20 shrink-0 rounded-md px-2 py-1 text-center text-[10.5px] font-semibold uppercase tracking-wider sm:w-24",
      palette[kind]
    )}>
      {kind}
    </span>
  );
}
```

- [ ] **Step 4.4: Timeline header padding**

Find the timeline section header:

```tsx
<header className="flex items-center justify-between border-b border-line px-5 py-4">
```

Replace with:

```tsx
<header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5 sm:py-4">
```

- [ ] **Step 4.5: Alerts section padding**

Inside the alerts section, replace its header:

```tsx
<header className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5 sm:py-4">
```

And the alert `<li>`:

```tsx
<li key={a.title} className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4">
  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warn-soft text-warn-ink">
    <WarnIcon />
  </span>
  <div className="flex min-w-0 flex-1 flex-col">
    <span className="text-[13.5px] font-semibold text-ink">{a.title}</span>
    <span className="text-[12px] text-ink-3">{a.desc}</span>
  </div>
  <button className="shrink-0 text-[12.5px] font-medium text-accent hover:underline">
    {a.cta}
  </button>
</li>
```

- [ ] **Step 4.6: Boot dev server and viewport check**

Run: `npm run dev`
Open `http://localhost:3000/dashboard` at 320, 375, 768, 1024, 1440.

Verify:
- 320: timeline rows fit, "MANUTENÇÃO" badge truncates okay (uppercase wraps), title truncates, no horizontal scroll. Pills wrap to a second row if needed.
- 375: comfortable, status pill stays on row.
- 768: stats grid 2-col.
- 1024+: stats 4-col, timeline + alerts side by side, identical to current snapshot.

- [ ] **Step 4.7: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "feat(dashboard): responsive timeline and hero

Scale h1 by breakpoint, allow rows to truncate, shrink badges and
padding under sm, hide trailing chevron on mobile.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: Imóveis page (`app/imoveis/page.tsx`)

**Files:**
- Modify: `app/imoveis/page.tsx`

- [ ] **Step 5.1: Container + header + cards**

Replace the body of the return inside `<AppShell>`:

```tsx
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
      <button
        onClick={() => setOpenCreate(true)}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-white hover:bg-accent-hover"
      >
        <PlusIcon /> Novo imóvel
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((p) => (
        <button
          type="button"
          key={p.id}
          onClick={() => setEditing(p)}
          className="overflow-hidden rounded-2xl border border-line bg-bg-card text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className={`relative grid h-[90px] place-items-center sm:h-[110px] ${p.cor}`}>
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
```

(Changed: `p-6` → `p-4 sm:p-6`, `gap-6` → `gap-4 sm:gap-6`, h1 scaled, grid breakpoint moved from `md` → `sm` to use space earlier on tablets, card cover height responsive.)

- [ ] **Step 5.2: Boot dev server and viewport check**

Run: `npm run dev`
Open `http://localhost:3000/imoveis` at 320, 375, 640, 768, 1024, 1440.

Verify:
- 320: single column, cards full width minus padding, no overflow.
- 640+: 2-col grid.
- 1280+: 3-col grid identical to current snapshot.

- [ ] **Step 5.3: Commit**

```bash
git add app/imoveis/page.tsx
git commit -m "feat(imoveis): responsive listing page

Scale h1, shrink page padding under sm, drop card cover height on
mobile, switch grid to 2-col starting at sm.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 6: Novo Imóvel modal (`components/modals/NovoImovelModal.tsx`)

**Files:**
- Modify: `components/modals/NovoImovelModal.tsx`

- [ ] **Step 6.1: Modal container + overlay padding**

Find:

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  <button
    type="button"
    aria-label="Fechar overlay"
    className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
    onClick={onClose}
  />

  <div className="relative z-10 flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl bg-bg-card shadow-lg">
```

Replace with:

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
  <button
    type="button"
    aria-label="Fechar overlay"
    className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
    onClick={onClose}
  />

  <div className="relative z-10 flex max-h-[95vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl bg-bg-card shadow-lg sm:max-h-[90vh]">
```

- [ ] **Step 6.2: Modal header padding**

Find:

```tsx
<header className="flex items-start justify-between gap-3 border-b border-line px-6 py-4">
```

Replace with:

```tsx
<header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
```

- [ ] **Step 6.3: StepBar padding**

Find:

```tsx
<div className="flex gap-1 px-6 pt-3">
```

Replace with:

```tsx
<div className="flex gap-1 px-4 pt-3 sm:px-6">
```

- [ ] **Step 6.4: Scroll body padding**

Find:

```tsx
<div className="flex-1 overflow-y-auto px-6 py-5">
```

Replace with:

```tsx
<div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
```

- [ ] **Step 6.5: Footer (wrap + hide non-essentials)**

Replace the entire `Footer` function with:

```tsx
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
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 sm:px-6">
      <span className="hidden text-[12px] text-ink-3 sm:inline">{hint}</span>
      <div className="ml-auto flex items-center gap-2">
        {step > 1 && (
          <button
            onClick={onBack}
            className="inline-flex h-9 items-center rounded-full px-3 text-[13px] font-medium text-ink-2 hover:bg-panel sm:px-4"
          >
            Voltar
          </button>
        )}
        <button
          onClick={onCancel}
          className="hidden h-9 items-center rounded-full border border-line-strong bg-bg-card px-4 text-[13px] font-medium text-ink hover:bg-panel sm:inline-flex"
        >
          Cancelar
        </button>
        <button
          onClick={onNext}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-white hover:bg-accent-hover sm:px-5"
        >
          {primaryLabel}
        </button>
      </div>
    </footer>
  );
}
```

(Hint and Cancel hidden under sm — backdrop click and Esc still close the modal.)

- [ ] **Step 6.6: StepIdentificacao tipos grid**

Find inside `StepIdentificacao`:

```tsx
<div className="mt-2 grid grid-cols-2 gap-2">
```

Replace with:

```tsx
<div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
```

- [ ] **Step 6.7: StepEndereco grid (Cidade/UF/CEP)**

Find:

```tsx
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
```

Replace with:

```tsx
<div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.6fr_1fr_1fr]">
  <Field label="Cidade" required>
    <div className="col-span-2 sm:col-auto">
      <Input value={data.cidade ?? ""} onChange={(v) => set("cidade", v)} placeholder="Florianópolis" />
    </div>
  </Field>
  <Field label="Estado / UF" required>
    <Input value={data.uf ?? ""} onChange={(v) => set("uf", v)} placeholder="SC" />
  </Field>
  <Field label="CEP" required>
    <Input value={data.cep ?? ""} onChange={(v) => set("cep", v)} placeholder="00000-000" />
  </Field>
</div>
```

Wait — `Field` already wraps children in a label. To make Cidade span both columns on mobile, the `col-span-2` must be on the outer `Field` itself, not inside it. Use this corrected version instead:

```tsx
<div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.6fr_1fr_1fr]">
  <div className="col-span-2 sm:col-span-1">
    <Field label="Cidade" required>
      <Input value={data.cidade ?? ""} onChange={(v) => set("cidade", v)} placeholder="Florianópolis" />
    </Field>
  </div>
  <Field label="Estado / UF" required>
    <Input value={data.uf ?? ""} onChange={(v) => set("uf", v)} placeholder="SC" />
  </Field>
  <Field label="CEP" required>
    <Input value={data.cep ?? ""} onChange={(v) => set("cep", v)} placeholder="00000-000" />
  </Field>
</div>
```

(Use the second version. The first is shown only to explain why it doesn't work.)

- [ ] **Step 6.8: StepEndereco coordinates grid**

Find inside `StepEndereco`:

```tsx
<div className="mt-2 grid grid-cols-2 gap-3">
```

Leave unchanged — 2 columns already works at 320px (lat/long inputs are short numbers).

- [ ] **Step 6.9: StepUnidades top grid + 5-col grid**

Find inside the unit `<li>`:

```tsx
<div className="grid grid-cols-[1.6fr_1fr_0.8fr] gap-3 pl-6">
```

Replace with:

```tsx
<div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-[1.6fr_1fr_0.8fr] sm:pl-6">
```

Find `<div className="mt-3 pl-6">` (the descrição wrapper) and replace with:

```tsx
<div className="mt-3 pl-4 sm:pl-6">
```

Find:

```tsx
<div className="mt-3 grid grid-cols-[0.8fr_0.9fr_1.1fr_0.8fr_1fr] gap-2 pl-6">
```

Replace with:

```tsx
<div className="mt-3 grid grid-cols-2 gap-2 pl-4 sm:grid-cols-3 sm:pl-6 lg:grid-cols-5">
```

Also adjust the `+N` badge offset to account for the smaller `pl-4` on mobile. Find:

```tsx
<span className="absolute -left-2 top-3 inline-flex h-6 w-8 items-center justify-center rounded-md bg-accent text-[11px] font-semibold text-white">
  +{u.quantidade}
</span>
```

Replace with:

```tsx
<span className="absolute -left-1 top-3 inline-flex h-6 w-8 items-center justify-center rounded-md bg-accent text-[11px] font-semibold text-white sm:-left-2">
  +{u.quantidade}
</span>
```

- [ ] **Step 6.10: Boot dev server and viewport check**

Run: `npm run dev`
Open `http://localhost:3000/imoveis` and click "Novo imóvel". Walk through all 3 steps at 320, 375, 768, 1024.

Verify:
- 320: modal fits viewport with 12px margins, header + footer both visible. Tipos cards stack 1-col, Cidade row spans 2-col with UF/CEP under. Step 3 fields stack to 2-col grid. Footer shows only Voltar + Continuar (Cancel + hint hidden). Esc and backdrop still close.
- 768+: modal width 620px, layout matches current snapshot (`modal.png`).
- 1024+: identical to current.
- Edit existing: click any property card to open in edit mode — same checks pass.

- [ ] **Step 6.11: Commit**

```bash
git add components/modals/NovoImovelModal.tsx
git commit -m "feat(modal): responsive imovel form

Modal sizing scales to viewport, footer wraps with non-essentials
hidden under sm, multi-col form grids stack or reduce columns on
small screens.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 7: Final cross-page sweep

**Files:** none (verification only)

- [ ] **Step 7.1: Run lint**

Run: `npm run lint`
Expected: no errors. If any unused variable warnings appear from removed code, fix them inline.

- [ ] **Step 7.2: Run build**

Run: `npm run build`
Expected: clean build, no TS errors, no failed routes.

- [ ] **Step 7.3: Cross-viewport regression sweep**

With `npm run dev` running, open in this order at each width (320, 375, 768, 1024, 1440):
- `/`
- `/boas-vindas` (step through all 5 steps)
- `/dashboard`
- `/imoveis` (open modal, walk all 3 steps, close, click an existing card to enter edit mode)

Verify for each:
- No horizontal scroll.
- No element obviously clipped or overlapping another.
- Drawer opens via hamburger and closes via backdrop, Esc, and route change.
- Desktop ≥ 1024px matches the PNG snapshots in repo root visually.

- [ ] **Step 7.4: Final commit (if any cleanup happened in 7.1)**

If steps 7.1–7.3 produced any small cleanup edits:

```bash
git add -A
git commit -m "chore: lint cleanup after responsive refactor

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

Otherwise skip this step.

---

## Done

All four pages and the modal usable at 320px+, desktop look preserved at ≥ 1024px, mobile drawer working.
