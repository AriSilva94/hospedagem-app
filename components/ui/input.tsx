import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputSize = "sm" | "md";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  error?: boolean;
  size?: InputSize;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-10 rounded-lg px-3 text-[13.5px]",
  md: "h-11 rounded-xl px-4 text-[14px]",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, size = "md", className, type = "text", ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={error || undefined}
      {...rest}
      className={cn(
        "w-full border bg-bg-card text-ink outline-none placeholder:text-ink-4 focus:ring-4",
        sizeClasses[size],
        error
          ? "border-err focus:border-err focus:ring-err-soft"
          : "border-line-strong focus:border-accent focus:ring-accent-soft",
        className
      )}
    />
  );
});
