"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Painel", icon: HomeIcon },
  { href: "/reservas", label: "Reservas", icon: ListIcon },
  { href: "/calendario", label: "Calendário", icon: CalendarIcon },
  { href: "/imoveis", label: "Imóveis", icon: BuildingIcon },
  { href: "/equipe", label: "Equipe", icon: UsersIcon },
  { href: "/relatorios", label: "Relatórios", icon: ChartIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-14 shrink-0 flex-col items-center gap-1 bg-ink py-4">
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
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="6" y1="6" x2="20" y2="6" /><line x1="6" y1="12" x2="20" y2="12" /><line x1="6" y1="18" x2="20" y2="18" />
      <circle cx="3.5" cy="6" r="1" fill="currentColor" /><circle cx="3.5" cy="12" r="1" fill="currentColor" /><circle cx="3.5" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5" width="17" height="15" rx="2" /><line x1="3.5" y1="10" x2="20.5" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" />
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
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="9" r="3.5" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><circle cx="17" cy="8" r="2.5" /><path d="M15 14c2.5 0 5 1.7 5 4" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="4" y1="20" x2="20" y2="20" /><rect x="6" y="11" width="3" height="7" /><rect x="11" y="7" width="3" height="11" /><rect x="16" y="14" width="3" height="4" />
    </svg>
  );
}
