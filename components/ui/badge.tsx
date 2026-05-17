import { cn } from "@/lib/cn";

type BadgeTone = "accent" | "ok" | "warn" | "err" | "slate";
type BadgeSize = "sm" | "md";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone: BadgeTone;
  size?: BadgeSize;
  uppercase?: boolean;
};

const toneClasses: Record<BadgeTone, string> = {
  accent: "bg-accent-soft text-accent-ink",
  ok: "bg-ok-soft text-ok-ink",
  warn: "bg-warn-soft text-warn-ink",
  err: "bg-err-soft text-err-ink",
  slate: "bg-slate-soft text-slate-ink",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-[10.5px]",
  md: "h-6 px-2.5 text-[11px]",
};

export function Badge({
  tone,
  size = "md",
  uppercase,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full font-medium",
        toneClasses[tone],
        sizeClasses[size],
        uppercase && "uppercase tracking-wider font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}
