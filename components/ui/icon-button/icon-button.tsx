import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type IconButtonSize = "sm" | "md";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: IconButtonSize;
  "aria-label": string;
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ size = "md", className, type = "button", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={cn(
          "grid place-items-center rounded-md text-ink-3 transition-colors hover:bg-panel hover:text-ink disabled:cursor-not-allowed disabled:opacity-60",
          sizeClasses[size],
          className
        )}
      />
    );
  }
);
