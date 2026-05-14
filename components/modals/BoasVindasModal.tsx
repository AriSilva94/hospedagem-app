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
