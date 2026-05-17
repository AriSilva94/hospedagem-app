"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: ReactNode;
  searchValue?: string;
  disabled?: boolean;
};

type SelectSize = "sm" | "md";

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: SelectSize;
  name?: string;
  className?: string;
  searchable?: boolean;
  emptyMessage?: string;
  "aria-label"?: string;
};

const TRIGGER_SIZE: Record<SelectSize, string> = {
  sm: "h-10 rounded-lg pl-3 pr-9 text-[13.5px]",
  md: "h-11 rounded-xl pl-3 pr-10 text-[14px]",
};

const CHEVRON_POS: Record<SelectSize, string> = {
  sm: "right-3 h-4 w-4",
  md: "right-3.5 h-4 w-4",
};

const DROPDOWN_GAP = 6;
const DROPDOWN_MAX_HEIGHT = 240;

function optionSearchText(opt: SelectOption): string {
  if (opt.searchValue) return opt.searchValue;
  return typeof opt.label === "string" ? opt.label : "";
}

function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

type PanelStyle = CSSProperties;

function usePanelStyle(
  triggerRef: React.RefObject<HTMLButtonElement | null>,
  open: boolean
): PanelStyle | null {
  const [style, setStyle] = useState<PanelStyle | null>(null);

  const measure = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const spaceAbove = r.top;
    const flip =
      spaceBelow < DROPDOWN_MAX_HEIGHT + DROPDOWN_GAP &&
      spaceAbove > spaceBelow;
    const maxHeight = Math.min(
      DROPDOWN_MAX_HEIGHT,
      Math.max(120, flip ? spaceAbove - DROPDOWN_GAP : spaceBelow - DROPDOWN_GAP)
    );
    const next: PanelStyle = flip
      ? {
          position: "fixed",
          left: Math.round(r.left),
          width: Math.round(r.width),
          bottom: Math.round(window.innerHeight - r.top + DROPDOWN_GAP),
          maxHeight,
        }
      : {
          position: "fixed",
          left: Math.round(r.left),
          width: Math.round(r.width),
          top: Math.round(r.bottom + DROPDOWN_GAP),
          maxHeight,
        };
    setStyle((prev) => {
      if (!prev) return next;
      if (
        prev.left === next.left &&
        prev.width === next.width &&
        prev.top === next.top &&
        prev.bottom === next.bottom &&
        prev.maxHeight === next.maxHeight
      ) {
        return prev;
      }
      return next;
    });
  }, [triggerRef]);

  useLayoutEffect(() => {
    if (!open) return;
    measure();
  }, [open, measure]);

  useEffect(() => {
    if (!open) return;
    let raf: number | null = null;
    const schedule = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        measure();
      });
    };
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [open, measure]);

  return style;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder,
      disabled,
      error,
      size = "md",
      name,
      className,
      searchable = true,
      emptyMessage = "Sem resultados",
      "aria-label": ariaLabel,
    },
    ref
  ) {
    const [query, setQuery] = useState("");
    const triggerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement, []);

    const filtered = useMemo(() => {
      if (!searchable || query.trim() === "") return options;
      const q = query.trim().toLowerCase();
      return options.filter((o) =>
        optionSearchText(o).toLowerCase().includes(q)
      );
    }, [options, query, searchable]);

    const isControlled = value !== undefined;

    return (
      <Combobox
        immediate
        value={value ?? null}
        defaultValue={isControlled ? undefined : defaultValue ?? null}
        onChange={(v: string | null) => {
          if (v === null) return;
          onValueChange?.(v);
        }}
        onClose={() => setQuery("")}
        disabled={disabled}
      >
        {({ open, value: cbValue }) => {
          const current = (isControlled ? value : cbValue) ?? "";
          const currentOption = options.find((o) => o.value === current);
          const label = currentOption?.label ?? placeholder ?? "";
          const hasSelection = currentOption !== undefined;

          return (
            <SelectShell
              open={open}
              className={className}
              name={name}
              current={current}
              triggerRef={triggerRef}
              size={size}
              error={error}
              ariaLabel={ariaLabel}
              hasSelection={hasSelection}
              label={label}
              searchable={searchable}
              query={query}
              setQuery={setQuery}
              filtered={filtered}
              emptyMessage={emptyMessage}
            />
          );
        }}
      </Combobox>
    );
  }
);

type SelectShellProps = {
  open: boolean;
  className?: string;
  name?: string;
  current: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  size: SelectSize;
  error?: boolean;
  ariaLabel?: string;
  hasSelection: boolean;
  label: ReactNode;
  searchable: boolean;
  query: string;
  setQuery: (v: string) => void;
  filtered: SelectOption[];
  emptyMessage: string;
};

function SelectShell({
  open,
  className,
  name,
  current,
  triggerRef,
  size,
  error,
  ariaLabel,
  hasSelection,
  label,
  searchable,
  query,
  setQuery,
  filtered,
  emptyMessage,
}: SelectShellProps) {
  const panelStyle = usePanelStyle(triggerRef, open);
  const searchRef = useRef<HTMLInputElement>(null);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (open && searchable) {
      const t = window.setTimeout(() => searchRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, searchable]);

  const panel =
    mounted && open && panelStyle
      ? createPortal(
          <ComboboxOptions
            static
            style={panelStyle}
            className="z-1000 flex flex-col overflow-hidden rounded-xl border border-line-strong bg-bg-card p-1 shadow-lg focus:outline-none"
          >
            {searchable && (
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder="Buscar..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " ") e.stopPropagation();
                }}
                className="mx-1 mt-1 mb-0.5 h-9 rounded-lg border border-line bg-bg px-2.5 text-[13px] text-ink outline-none focus:border-accent"
              />
            )}

            <div className="overflow-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-[13px] text-ink-3">
                  {emptyMessage}
                </div>
              ) : (
                filtered.map((opt) => (
                  <ComboboxOption
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13.5px] text-ink",
                      "data-focus:bg-accent-soft",
                      "data-disabled:cursor-not-allowed data-disabled:opacity-50"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {opt.value === current && (
                      <Check
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                    )}
                  </ComboboxOption>
                ))
              )}
            </div>
          </ComboboxOptions>,
          document.body
        )
      : null;

  return (
    <div className={cn("relative", className)}>
      {name !== undefined && (
        <input type="hidden" name={name} value={current} />
      )}

      <ComboboxButton
        ref={triggerRef}
        aria-label={ariaLabel}
        aria-invalid={error || undefined}
        className={cn(
          "flex w-full items-center justify-between border bg-bg-card text-left text-ink outline-none transition-colors duration-150",
          "disabled:cursor-not-allowed disabled:opacity-60",
          TRIGGER_SIZE[size],
          error
            ? "border-err focus:border-err focus:ring-4 focus:ring-err-soft"
            : cn(
                "border-line-strong hover:border-ink-4",
                "focus:border-accent focus:ring-4 focus:ring-accent-soft",
                open && "border-accent! ring-4 ring-accent-soft"
              )
        )}
      >
        <span className={cn("truncate", !hasSelection && "text-ink-4")}>
          {label || " "}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 transition-transform duration-200 ease-in-out",
            CHEVRON_POS[size],
            open && "rotate-180"
          )}
        />
      </ComboboxButton>

      {panel}
    </div>
  );
}
