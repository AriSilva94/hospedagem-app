export function TopBar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-line bg-bg px-5">
      <button className="flex items-center gap-3 rounded-full border border-line bg-bg-card py-1.5 pl-1.5 pr-3 text-left text-[13px] hover:bg-panel">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-[12.5px] font-semibold text-white">
          M
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold text-ink">Mar & Sal Properties</span>
          <span className="text-[11px] text-ink-3">24 unidades · Florianópolis</span>
        </span>
        <span className="ml-1 text-ink-3"><ChevronDown /></span>
      </button>

      <div className="relative mx-auto w-full max-w-[480px]">
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

      <div className="flex items-center gap-2">
        <button className="rounded-md px-2 py-1 text-[12px] font-medium text-ink-2 hover:bg-panel">
          PT
        </button>
        <IconButton><MoonIcon /></IconButton>
        <IconButton><BellIcon /></IconButton>
        <button className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-white hover:bg-accent-hover">
          <PlusIcon /> Nova reserva
        </button>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-accent-ink text-[12px] font-semibold text-white">
          AO
        </div>
      </div>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="grid h-9 w-9 place-items-center rounded-md text-ink-2 hover:bg-panel hover:text-ink">
      {children}
    </button>
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
