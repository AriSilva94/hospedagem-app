# Boas-vindas: rota → modal

## Objetivo

Migrar onboarding de rota dedicada (`/boas-vindas`) para modal global. Modal abre automaticamente no primeiro login e fica acessível a qualquer momento via dropdown do avatar na TopBar.

## Comportamento

### Estados de onboarding

`localStorage["onboarding-status"]` guarda um de dois valores:

- `"pending"` — default (chave ausente). Modal abre automaticamente no `AppShell`.
- `"done"` — usuário pulou ou concluiu. Modal não abre automaticamente.

Skip e conclusão produzem o mesmo estado (`"done"`). Fechar via X ou ESC equivale a skip.

### Gatilhos

| Gatilho | Efeito |
|---|---|
| Login (mock em `app/page.tsx`) | Push `/dashboard`. AppShell auto-abre se status=`pending` |
| Skip / X / ESC / backdrop | Fecha modal. Marca `"done"` |
| Concluir passo 5 ("Abrir painel") | Fecha modal. Marca `"done"`. Permanece em `/dashboard` |
| Avatar TopBar → "Configuração inicial" | Abre modal. **Não muda flag** |

Modal sempre inicia no passo 1 (sem retomada de progresso).

## Arquitetura

### Arquivos novos

- `lib/onboarding.ts` — helpers `getOnboardingStatus()`, `setOnboardingDone()`. Encapsula localStorage com try/catch (privacy mode = trata como `pending`).
- `components/modals/BoasVindasModal.tsx` — componente modal. Props: `open: boolean`, `onClose: () => void`, `onComplete: () => void`. Contém os 5 passos + arts migrados de `app/boas-vindas/page.tsx`.

### Arquivos modificados

- `components/shell/AppShell.tsx`
  - Adiciona `useState<boolean>("modalOpen", false)`.
  - `useEffect` no mount: lê status; se `pending` → set `modalOpen=true`.
  - Renderiza `<BoasVindasModal>` com handlers que chamam `setOnboardingDone()` em skip/complete.
  - Passa callback `onOpenOnboarding` pra `<TopBar>` via prop.
- `components/shell/TopBar.tsx`
  - Nova prop `onOpenOnboarding: () => void`.
  - Avatar "AO" vira `<button>` com dropdown. Item "Configuração inicial" chama `onOpenOnboarding()`. Sem alterar flag.
  - Dropdown: pattern simples (state local `open`, click fora fecha, ESC fecha).
- `app/page.tsx`
  - Login push `/dashboard` (não mais `/boas-vindas`).

### Arquivos deletados

- `app/boas-vindas/page.tsx` — conteúdo migrado pro modal.

### Contrato modal

```
BoasVindasModal({ open, onClose, onComplete })
  - open=false → não renderiza nada (ou renderiza com display:none).
  - Footer: "Pular configuração" → onClose(). "Continuar" avança step.
  - Passo 5 botão "Abrir painel" → onComplete().
  - Backdrop click + ESC + X → onClose().
  - Reabertura sempre reinicia step=1 (key remount ou reset interno em useEffect[open]).
```

`AppShell` define:

```
function handleClose() {
  setOnboardingDone();
  setModalOpen(false);
}
function handleComplete() {
  setOnboardingDone();
  setModalOpen(false);
}
function handleOpenManual() {
  setModalOpen(true); // não toca flag
}
```

### SSR / hidratação

- `localStorage` só acessado client-side. AppShell já é `"use client"`.
- Render inicial sempre `modalOpen=false` (evita mismatch).
- `useEffect` lê localStorage após mount → eventual abertura.
- Pequeno flash aceitável (modal aparece poucos ms após dashboard).

## Estilo / responsividade

- Reusa pattern de `components/modals/NovoImovelModal.tsx`: backdrop `fixed inset-0 bg-black/40`, container `max-w-[1240px]` com cap `95vw` mobile, botão close X.
- Layout interno mantém grid 2 colunas em `lg:` (esquerda conteúdo, direita ilustração) — preserva visual atual da rota.
- Footer sticky igual ao atual.

## Edge cases

- localStorage indisponível (privacy mode): helpers retornam `"pending"`. Modal abre. Skip/complete tentam set, falham silenciosamente — modal reabrirá próximo login. Aceitável.
- Modal aberto durante navegação entre rotas: AppShell mantém estado, modal continua sobreposto (overlay independe de rota).
- Acesso direto `/boas-vindas` após delete: Next 404 padrão. Sem redirect (escopo decidido).
- Reabrir manual quando já `done`: funciona normalmente, fechar não tem efeito colateral.

## Não-objetivos

- Persistir dados preenchidos nos forms entre aberturas.
- Retomar do passo onde parou.
- Backend / sincronização cross-device.
- Página `/configuracoes` ou redirect da rota antiga.
- Mudanças visuais nos passos.

## Plano de teste manual

1. Limpar localStorage → login → modal abre automaticamente no dashboard.
2. Skip → recarregar `/dashboard` → modal não abre.
3. Avatar TopBar → "Configuração inicial" → modal abre.
4. Fechar via X → recarregar → modal não abre (skip = done).
5. Completar passo 5 ("Abrir painel") → modal fecha → permanece no dashboard.
6. Acessar `/boas-vindas` direto → 404.
7. Mobile (≤ 640px): modal respeita cap 95vw, scroll interno funciona, footer não corta.
8. ESC com modal aberto → fecha.
9. Click no backdrop → fecha.
