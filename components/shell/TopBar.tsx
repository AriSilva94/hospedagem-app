"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Moon, Plus, Search } from "lucide-react";
import { cn } from "@/lib/cn";

type TopBarProps = {
  onOpenMenu: () => void;
  onOpenOnboarding: () => void;
};

export function TopBar({ onOpenMenu, onOpenOnboarding }: TopBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    setMenuOpen(false);
    router.push("/");
  }

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
        <Menu size={18} strokeWidth={2} />
      </button>

      <button className="flex min-w-0 items-center gap-2 rounded-full border border-line bg-bg-card py-1.5 pl-1.5 pr-3 text-left text-[13px] hover:bg-panel sm:gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[12.5px] font-semibold text-white">
          M
        </span>
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-[13px] font-semibold text-ink">Mar & Sal Properties</span>
          <span className="truncate text-[11px] text-ink-3">24 unidades · Florianópolis</span>
        </span>
        <span className="ml-1 shrink-0 text-ink-3"><ChevronDown size={12} strokeWidth={2} /></span>
      </button>

      <div className="relative mx-auto hidden w-full max-w-[480px] lg:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" size={14} strokeWidth={2} />
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
        <IconButton className="hidden sm:grid"><Moon size={16} strokeWidth={1.8} /></IconButton>
        <IconButton><Bell size={16} strokeWidth={1.8} /></IconButton>
        <button className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-3 text-[13px] font-medium text-white hover:bg-accent-hover md:px-4">
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden md:inline">Nova reserva</span>
        </button>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="user-menu"
            aria-label="Menu do usuário"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-ink text-[12px] font-semibold text-white hover:opacity-90"
          >
            AO
          </button>
          {menuOpen && (
            <div
              id="user-menu"
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
              <div role="separator" className="mx-3 h-px bg-line" />
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13.5px] text-ink hover:bg-panel"
              >
                <LogOut size={14} strokeWidth={2} aria-hidden />
                Sair
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

