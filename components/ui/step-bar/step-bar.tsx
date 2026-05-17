import { cn } from "@/lib/cn";

type StepBarDensity = "compact" | "comfortable";

type StepBarProps = {
  total: number;
  current: number;
  density?: StepBarDensity;
  className?: string;
};

const densityClasses: Record<
  StepBarDensity,
  { container: string; bar: string }
> = {
  compact: {
    container: "flex gap-1",
    bar: "h-[3px]",
  },
  comfortable: {
    container: "flex gap-1.5",
    bar: "h-1",
  },
};

export function StepBar({
  total,
  current,
  density = "compact",
  className,
}: StepBarProps) {
  const { container, bar } = densityClasses[density];
  return (
    <div className={cn(container, className)}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        return (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors",
              bar,
              idx < current && "bg-ink",
              idx === current && "bg-accent",
              idx > current && "bg-line-soft"
            )}
          />
        );
      })}
    </div>
  );
}
