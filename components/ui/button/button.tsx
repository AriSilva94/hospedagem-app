import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost" | "pill";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent-hover rounded-full",
  outline:
    "border border-line-strong bg-bg-card text-ink hover:bg-panel rounded-full",
  ghost:
    "text-ink-2 hover:text-ink hover:bg-panel rounded-full",
  pill:
    "h-9 border border-line-strong bg-bg-card text-ink hover:bg-panel rounded-full",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, type = "button", ...rest },
    ref
  ) {
    const isPill = variant === "pill";
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          !isPill && sizeClasses[size],
          isPill && "px-4 text-[13px]",
          className
        )}
      />
    );
  }
);
