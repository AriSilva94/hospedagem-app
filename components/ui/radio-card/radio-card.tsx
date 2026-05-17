import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type RadioCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
  title: string;
  description?: string;
};

export const RadioCard = forwardRef<HTMLButtonElement, RadioCardProps>(
  function RadioCard(
    { selected, title, description, className, type = "button", ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        {...rest}
        className={cn(
          "flex items-start gap-2 rounded-xl border p-3 text-left transition-colors",
          selected
            ? "border-accent bg-accent-soft"
            : "border-line-strong bg-bg-card hover:bg-panel",
          className
        )}
      >
        <span
          className={cn(
            "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border",
            selected ? "border-accent" : "border-line-strong"
          )}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-accent" />}
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-semibold text-ink">{title}</span>
          {description && (
            <span className="text-[12px] text-ink-3">{description}</span>
          )}
        </span>
      </button>
    );
  }
);
