"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Painel", icon: Home },
  { href: "/imoveis", label: "Imóveis", icon: Building2 },
];

type SidebarProps = {
  mobileNavOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileNavOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, onClose]);

  useEffect(() => {
    if (mobileNavOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      const previous = previousActiveElement.current;
      if (previous && document.contains(previous)) {
        previous.focus();
      }
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
              <Icon size={18} strokeWidth={1.8} />
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
            ref={closeButtonRef}
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
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

