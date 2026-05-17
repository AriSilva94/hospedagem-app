import { cn } from "@/lib/cn";

type StatValueTone = "ink" | "accent";
type StatValueSize = "md" | "lg";
type StatTrendTone = "neutral" | "positive";
type StatLayout = "label-top" | "value-top";

type StatProps = {
  value: string;
  label: string;
  hint?: string;
  trend?: string;
  valueTone?: StatValueTone;
  valueSize?: StatValueSize;
  trendTone?: StatTrendTone;
  layout?: StatLayout;
  className?: string;
};

const valueToneClasses: Record<StatValueTone, string> = {
  ink: "text-ink",
  accent: "text-accent",
};

const valueSizeClasses: Record<StatValueSize, string> = {
  md: "font-serif text-4xl tracking-tight",
  lg: "font-serif text-[26px] leading-none sm:text-[30px]",
};

export function Stat({
  value,
  label,
  hint,
  trend,
  valueTone = "ink",
  valueSize = "md",
  trendTone = "neutral",
  layout = "label-top",
  className,
}: StatProps) {
  const labelEl = (
    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
      {label}
    </span>
  );
  const valueEl = (
    <span className={cn(valueSizeClasses[valueSize], valueToneClasses[valueTone])}>
      {value}
    </span>
  );

  return (
    <div className={cn("flex flex-col", className)}>
      {layout === "label-top" ? (
        <>
          {labelEl}
          <span className="mt-3">{valueEl}</span>
        </>
      ) : (
        <>
          {valueEl}
          <span className="mt-2 text-[13px] text-ink-3">{label}</span>
        </>
      )}
      {hint && <span className="mt-1 text-[12.5px] text-ink-3">{hint}</span>}
      {trend && (
        <span
          className={cn(
            "mt-2 text-[12px] font-medium",
            trendTone === "positive" ? "text-ok-ink" : "text-ink-3"
          )}
        >
          {trendTone === "positive" && "▲ "}
          {trend}
        </span>
      )}
    </div>
  );
}
