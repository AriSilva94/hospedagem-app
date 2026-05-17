import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ChipTone = "accent" | "ok";
type ChipSize = "sm" | "md";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  tone?: ChipTone;
  size?: ChipSize;
};

const selectedClasses: Record<ChipTone, string> = {
  accent: "border-accent bg-accent-soft text-accent-ink",
  ok: "border-ok bg-ok-soft text-ok-ink",
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "h-7 px-2.5 text-[11.5px]",
  md: "h-9 px-4 text-[13px]",
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    selected = false,
    tone = "accent",
    size = "md",
    className,
    type = "button",
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      {...rest}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium transition-colors",
        sizeClasses[size],
        selected
          ? selectedClasses[tone]
          : "border-line-strong bg-bg-card text-ink-2 hover:bg-panel",
        className
      )}
    />
  );
});
