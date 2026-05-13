# Boas-vindas Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar onboarding `/boas-vindas` de rota dedicada para modal global acessível no primeiro login (auto) e a qualquer momento via dropdown do avatar na TopBar.

**Architecture:** Flag `localStorage["onboarding-status"]` ("pending" | "done") controla auto-abertura. AppShell hospeda modal e injeta callback de abertura manual no TopBar via prop. Conteúdo dos 5 passos migra 1:1 da rota deletada para componente modal isolado.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind. Sem suíte de testes automatizada — verificação manual via dev server (`npm run dev`).

**Notas para o executor:**
- Projeto não tem testes automatizados. "Verificação" significa rodar `npm run dev`, abrir browser, checar comportamento descrito.
- Padrão de modal já existente: [components/modals/NovoImovelModal.tsx](components/modals/NovoImovelModal.tsx). Reutilize estrutura (backdrop, ESC handler, max-w/max-h).
- Spec completo: [docs/superpowers/specs/2026-05-13-boas-vindas-modal-design.md](docs/superpowers/specs/2026-05-13-boas-vindas-modal-design.md).

---

## Task 1: Criar `lib/onboarding.ts`

Helpers para ler/gravar status no localStorage. SSR-safe (try/catch).

**Files:**
- Create: `lib/onboarding.ts`

- [ ] **Step 1: Criar arquivo com helpers**

```typescript
// lib/onboarding.ts
const KEY = "onboarding-status";

export type OnboardingStatus = "pending" | "done";

export function getOnboardingStatus(): OnboardingStatus {
  if (typeof window === "undefined") return "pending";
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "done" ? "done" : "pending";
  } catch {
    return "pending";
  }
}

export function setOnboardingDone(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, "done");
  } catch {
    // localStorage unavailable (privacy mode). Silently ignore.
  }
}
```

- [ ] **Step 2: Verificar import via TypeScript check**

Run: `npx tsc --noEmit`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
git add lib/onboarding.ts
git commit -m "feat(onboarding): localStorage helpers for status flag"
```

---

## Task 2: Scaffolding `components/modals/BoasVindasModal.tsx`

Modal vazio com shell (backdrop, ESC, X) e props. Conteúdo dos passos virá em Task 3.

**Files:**
- Create: `components/modals/BoasVindasModal.tsx`

- [ ] **Step 1: Criar arquivo com shell do modal**

```tsx
// components/modals/BoasVindasModal.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const TOTAL_STEPS = 5;

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
};

export function BoasVindasModal({ open, onClose, onComplete }: Props) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (open) setStep(1);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
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
    <div className="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4 lg:p-8">
      <button
        type="button"
        aria-label="Fechar overlay"
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 mx-auto flex max-h-[95vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-2xl border border-line bg-bg-card shadow-md sm:rounded-3xl lg:max-w-[1240px]">
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

        {/* Content placeholder — preenchido na Task 3 */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col overflow-y-auto px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
            <div className="my-auto w-full">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
                Passo {step} de {TOTAL_STEPS}
              </span>
              <p className="mt-4 text-ink">Conteúdo do passo {step}</p>
            </div>
          </div>
          <div className="relative hidden overflow-hidden bg-accent-soft lg:block" />
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
```

- [ ] **Step 2: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/modals/BoasVindasModal.tsx
git commit -m "feat(boas-vindas): modal shell scaffold"
```

---

## Task 3: Migrar conteúdo dos passos para o modal

Mover componentes `StepWelcome`, `StepProfile`, `StepProperty`, `StepUnits`, `StepDone`, atoms (`FieldLabel`, `TextInput`, `CompactLabel`, `CheckIcon`), arts (`KeyArt`, `PortraitArt`, `HouseArt`, `RoomsArt`, `SparklesArt`, `DashCurve`) e constantes (`COMODIDADES_ALL`) de `app/boas-vindas/page.tsx` para o modal. Preservar visual 1:1.

**Files:**
- Modify: `components/modals/BoasVindasModal.tsx`
- Reference: `app/boas-vindas/page.tsx` (origem do código)

- [ ] **Step 1: Adicionar `StepBody` e `StepIllustration` no modal**

Substituir o bloco de placeholder (`<p>Conteúdo do passo {step}</p>` e `<div className="...lg:block" />`) por:

```tsx
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
```

- [ ] **Step 2: Adicionar componentes de passo no fim do arquivo**

Copiar do `app/boas-vindas/page.tsx` linhas 97-513 (todos os componentes de StepBody/StepIllustration/Steps/atoms/arts/constants) e colar no fim de `components/modals/BoasVindasModal.tsx`. Manter idêntico — não refatorar.

Bloco a copiar começa em:
```tsx
function StepBody({ step }: { step: number }) {
```
e termina em (inclusive):
```tsx
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
```

Importante: `StepUnits` usa `useState` — `useState` já está importado no topo do modal (Task 2), nada a ajustar.

- [ ] **Step 3: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add components/modals/BoasVindasModal.tsx
git commit -m "feat(boas-vindas): migrate step components into modal"
```

---

## Task 4: AppShell hospeda modal + auto-abre se pending

**Files:**
- Modify: `components/shell/AppShell.tsx`

- [ ] **Step 1: Substituir conteúdo de AppShell**

```tsx
// components/shell/AppShell.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { BoasVindasModal } from "@/components/modals/BoasVindasModal";
import { getOnboardingStatus, setOnboardingDone } from "@/lib/onboarding";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    if (getOnboardingStatus() === "pending") {
      setOnboardingOpen(true);
    }
  }, []);

  const handleClose = useCallback(() => {
    setOnboardingDone();
    setOnboardingOpen(false);
  }, []);

  const handleComplete = useCallback(() => {
    setOnboardingDone();
    setOnboardingOpen(false);
  }, []);

  const handleOpenManual = useCallback(() => {
    setOnboardingOpen(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-bg lg:h-screen">
      <Sidebar mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-hidden">
        <TopBar
          onOpenMenu={() => setMobileNavOpen(true)}
          onOpenOnboarding={handleOpenManual}
        />
        <main className="flex-1 lg:overflow-y-auto">{children}</main>
      </div>

      <BoasVindasModal
        open={onboardingOpen}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript (TopBar ainda não tem prop — esperado falhar)**

Run: `npx tsc --noEmit`
Expected: erro em `onOpenOnboarding` (TopBar não aceita ainda). Será corrigido em Task 5. **Não commitar ainda.**

---

## Task 5: TopBar — dropdown no avatar com item "Configuração inicial"

**Files:**
- Modify: `components/shell/TopBar.tsx`

- [ ] **Step 1: Adicionar prop e dropdown**

Substituir conteúdo completo de `components/shell/TopBar.tsx`:

```tsx
// components/shell/TopBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type TopBarProps = {
  onOpenMenu: () => void;
  onOpenOnboarding: () => void;
};

export function TopBar({ onOpenMenu, onOpenOnboarding }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-ink text-[12px] font-semibold text-white hover:opacity-90"
          >
            AO
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 z-40 w-56 overflow-hidden rounded-xl border border-line bg-bg-card shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenOnboarding();
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13.5px] text-ink hover:bg-panel"
              >
                Configuração inicial
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={cn("grid h-9 w-9 place-items-center rounded-md text-ink-2 hover:bg-panel hover:text-ink", className)}>
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

- [ ] **Step 2: Verificar TypeScript (deve passar agora)**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit (AppShell + TopBar juntos pra manter build verde)**

```bash
git add components/shell/AppShell.tsx components/shell/TopBar.tsx
git commit -m "feat(shell): host boas-vindas modal + topbar dropdown trigger"
```

---

## Task 6: Login redireciona para `/dashboard`

**Files:**
- Modify: `app/page.tsx:22`

- [ ] **Step 1: Trocar destino do redirect**

Em `app/page.tsx`, linha 22, substituir:

```tsx
      router.push("/boas-vindas");
```

por:

```tsx
      router.push("/dashboard");
```

- [ ] **Step 2: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(auth): post-login redirect to dashboard"
```

---

## Task 7: Deletar rota antiga `/boas-vindas`

**Files:**
- Delete: `app/boas-vindas/page.tsx`
- Delete: `app/boas-vindas/` (diretório vazio)

- [ ] **Step 1: Remover diretório**

Run (PowerShell): `Remove-Item -Recurse -Force app/boas-vindas`

- [ ] **Step 2: Verificar TypeScript + grep por referências órfãs**

Run: `npx tsc --noEmit`
Expected: sem erros.

Run (Grep tool): pattern `boas-vindas`, glob `app/**/*.{ts,tsx}`
Expected: sem matches em `app/`. Matches em `docs/` e `.playwright-mcp/` são aceitáveis (snapshots históricos).

- [ ] **Step 3: Commit**

```bash
git add -A app/boas-vindas
git commit -m "refactor(boas-vindas): remove legacy route"
```

---

## Task 8: Verificação manual end-to-end

Sem testes automatizados — verificação por uso real no browser.

**Files:** nenhum.

- [ ] **Step 1: Iniciar dev server**

Run: `npm run dev`
Expected: server up em http://localhost:3000.

- [ ] **Step 2: Cenário "primeiro login"**

1. Abrir DevTools → Application → Local Storage → limpar tudo do origin.
2. Acessar http://localhost:3000/.
3. Login com `teste@teste.com.br` / `Teste123**`.
4. Esperado: redireciona pra `/dashboard`. Modal de boas-vindas aparece automaticamente sobre o dashboard.

- [ ] **Step 3: Cenário "skip = não mostrar mais"**

1. Com modal aberto do passo anterior, clicar "Pular configuração".
2. Esperado: modal fecha. localStorage `onboarding-status === "done"`.
3. Recarregar `/dashboard`.
4. Esperado: modal **não** abre.

- [ ] **Step 4: Cenário "abrir manual via avatar"**

1. Clicar avatar "AO" no canto superior direito.
2. Esperado: dropdown abre com item "Configuração inicial".
3. Clicar item.
4. Esperado: modal abre no passo 1.

- [ ] **Step 5: Cenário "fechar via X / ESC / backdrop"**

1. Modal aberto → pressionar ESC. Esperado: fecha.
2. Reabrir via avatar → clicar fora do modal (backdrop). Esperado: fecha.
3. Reabrir → clicar X canto superior. Esperado: fecha.
4. Em todos: localStorage continua `"done"` (skip semantics).

- [ ] **Step 6: Cenário "concluir passo 5"**

1. Limpar localStorage. Recarregar `/dashboard`. Modal abre.
2. Clicar "Continuar" 4× até passo 5.
3. Clicar "Abrir painel".
4. Esperado: modal fecha. localStorage `"done"`. Permanece em `/dashboard`.

- [ ] **Step 7: Cenário "rota antiga 404"**

1. Acessar http://localhost:3000/boas-vindas direto.
2. Esperado: 404 do Next.

- [ ] **Step 8: Cenário "mobile"**

1. DevTools → device mode → 375×800.
2. Limpar localStorage, recarregar `/dashboard`.
3. Esperado: modal respeita largura ≤ 95vw, scroll vertical interno funciona, footer não corta. Coluna de ilustração some (`lg:` only).

- [ ] **Step 9: Build de produção**

Run: `npm run build`
Expected: build completa sem erros novos. Aviso de rotas mostra ausência de `/boas-vindas`.

- [ ] **Step 10: Sem commit nesta task**

Verificação não modifica código. Se algum cenário falhar, abrir nova task de fix antes de fechar plano.

---

## Resumo dos commits esperados

1. `feat(onboarding): localStorage helpers for status flag`
2. `feat(boas-vindas): modal shell scaffold`
3. `feat(boas-vindas): migrate step components into modal`
4. `feat(shell): host boas-vindas modal + topbar dropdown trigger`
5. `feat(auth): post-login redirect to dashboard`
6. `refactor(boas-vindas): remove legacy route`
