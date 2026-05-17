import { cn } from "@/lib/cn";

type LabelSize = "sm" | "md";

type LabelProps = React.ComponentPropsWithoutRef<"span"> & {
  required?: boolean;
  size?: LabelSize;
};

const sizeClasses: Record<LabelSize, string> = {
  sm: "text-[10px] tracking-[0.12em]",
  md: "text-[11px] tracking-[0.12em]",
};

export function Label({
  required,
  size = "md",
  className,
  children,
  ...rest
}: LabelProps) {
  return (
    <span
      {...rest}
      className={cn(
        "whitespace-nowrap font-medium uppercase text-ink-3",
        sizeClasses[size],
        className
      )}
    >
      {children}
      {required && <span className="ml-0.5 text-accent">*</span>}
    </span>
  );
}
